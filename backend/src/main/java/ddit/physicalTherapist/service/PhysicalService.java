package ddit.physicalTherapist.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ddit.common.DeletedCodeExistsException;
import ddit.physicalTherapist.enums.BedStatus;
import ddit.physicalTherapist.enums.TherapyType;
import ddit.physicalTherapist.enums.TreatmentStatus;
import ddit.physicalTherapist.mapper.PhysicalMapper;
import ddit.physicalTherapist.vo.BedVO;
import ddit.physicalTherapist.vo.QueueRecordVO;
import ddit.physicalTherapist.vo.TherapyDurationVO;
import ddit.physicalTherapist.vo.TherapyHistoryVO;
import ddit.physicalTherapist.vo.TherapyItemVO;
import ddit.physicalTherapist.vo.TherapyPatientDetailVO;
import ddit.physicalTherapist.vo.TherapyRecordBriefVO;
import ddit.physicalTherapist.vo.TherapyStartVO;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Service
public class PhysicalService {
    
    private static final Set<String> ALLOWED_TYPES = Set.of("일반치료", "견인치료");
    private static final int DURATION_GENERAL = 30; //일반치료
    private static final int DURATION_TRACTION = 20;
    
    private int defaultDuration(String therapyCode) {
    	return "TRACTION".equals(therapyCode) ? DURATION_TRACTION : DURATION_GENERAL;
    }
    
    @Autowired
    PhysicalMapper physicalMapper;
    
    // 목록 조회 
    public List<TherapyItemVO> getTherapyItems() {
        return this.physicalMapper.selectTherapyItems();
    }
    
    /**
     * 치료항목 등록
     * 예외 3종이 각각 어디로 가는지: (전부 GlobalExceptionHandler가 받아 JSON 변환)
     *   IllegalArgumentException  → 400 (입력값 문제 — 사용자가 고쳐서 재시도)
     *   IllegalStateException     → 409 (활성 코드 중복 — 다른 코드를 써야 함)
     *   DeletedCodeExistsException→ 409 + errorCode → FE useTherapyItems가
     *                                'DELETED_CODE_EXISTS'를 보고 복원 안내 메시지 분기
     */
    @Transactional
    public TherapyItemVO registerTherapyItem(TherapyItemVO itemVO) {
  
    	if(!ALLOWED_TYPES.contains(itemVO.getType())) {
    		throw new IllegalArgumentException("치료 구분이 올바르지 않습니다: " + itemVO.getType());
    	}	
    	// 대문자 변환 
    	String code = itemVO.getCode().trim().toUpperCase();
    	itemVO.setCode(code);
    	
    	// 중복검사 한 번의 SELECT로 3분기
    	String used = this.physicalMapper.selectUsedByCode(code);
    	if("Y".equals(used)) {
    		throw new IllegalStateException("이미 사용중인 항목 코드입니다: " +code);
    	}
    	if("N".equals(used)) {
    		throw new DeletedCodeExistsException(code);
    	}
    	if("Y".equals(itemVO.getCoverageYn())) {
    		itemVO.setContribution((int) Math.round(itemVO.getPrice() * 0.3));
    	}else {
    		itemVO.setContribution(itemVO.getPrice());
    	}
    	
    	int rows = this.physicalMapper.insertTherapyItem(itemVO);
    	log.info("registerTherapyItem - INSERT {}건, code={}", rows, code);
		return itemVO;
    }
    
    //치료항목 수정
    @Transactional
    public int modifyTherapyItem(String code, TherapyItemVO itemVO) {

    	if(!ALLOWED_TYPES.contains(itemVO.getType())) {
    		throw new IllegalArgumentException("치료 구분이 올바르지 않습니다: " + itemVO.getType());
    	}
    	// ── URL의 code를 VO에 주입 (본문의 code는 무시 — REST 원칙: URL이 대상)
    	itemVO.setCode(code.trim().toUpperCase());
    	
    	//단가 계산
    	if("Y".equals(itemVO.getCoverageYn())) {
    		itemVO.setContribution((int) Math.round(itemVO.getPrice() * 0.3));
    	}else {
    		itemVO.setContribution(itemVO.getPrice());
    	}
    	
    	int result = this.physicalMapper.updateTherapyItem(itemVO);
    	if(result <= 0) {
    		throw new IllegalArgumentException("존재하지 않거나 삭제된 항목 코드입니다: " + itemVO.getCode());
    	}
    	log.info("modifyTherapyItem - UPDATE {}건, code={}", result, itemVO.getCode());
    	return result;
    }
    
    //항목 삭제 Y >>> N
    @Transactional
    public int removeTherapyItem(String code) {
    	
    	if(code == null || code.isBlank()) {
    		throw new IllegalArgumentException("항목 코드는 필수입니다."); //400
    	}
    	int result = this.physicalMapper.deleteTherapyItem(code.trim().toUpperCase());
    	if(result <=0) {
    		throw new IllegalArgumentException("존재하지 않거나 이미 삭제된 항목입니다: " + code);
    	}
    	log.info("removeTherapyItem - 삭제 완료 code={}", code);
    	return result;
    }
    
    // 삭제 내역 조회
    public List<TherapyItemVO> getDeletedTherapyItems() {
        return this.physicalMapper.selectDeletedTherapyItems();
    }
    
    //복원 
    @Transactional
    public int restoreTherapyItem(String code) {
    	
    	if(code == null || code.isBlank()) {
    		throw new IllegalArgumentException("항목 코드는 필수입니다.");        // → 400
    	}
    	
    	int result = this.physicalMapper.restoreTherapyItem(code.trim().toUpperCase());
    	if(result<=0) {
    		throw new IllegalArgumentException("복원할 삭제 내역이 없습니다: " + code);
    	}
    	log.info("restoreTherapyItem - 복원 완료 code={}", code);
    	return result;
    }
    
    ////////////////////////////// 물리치료 대기열 //////////////////////////////////////
    // 베드 목록 
    public List<BedVO> selectBeds(){
    	List<BedVO> beds = this.physicalMapper.selectBeds();
    	// DB 한글값  FE 코드 변환 (매핑은 Enum 한 곳에)
    	for(BedVO bed : beds) {
    		bed.setBedStatus(BedStatus.toCode(bed.getBedStatus()));
    		bed.setTherapyType(TherapyType.toCode(bed.getTherapyType()));
    	}
    	log.debug("getBeds - {}건 조회(코드 변환 완료)", beds.size());
    	return beds;
    }
    
    // 물리치료 대기열 조회. 매퍼가 담아온 DB 한글값을 Enum으로 코드 변환
    public List<QueueRecordVO> selectQueueList(){
    	List<QueueRecordVO> list = this.physicalMapper.selectQueueList();
    	
    	Map<String, Integer> avgByType = new HashMap<>();
    	for(TherapyDurationVO v : this.physicalMapper.selectAvgDurationByType()) {
    		if(v.getAvgMin() != null && v.getAvgMin() > 0) {
    			avgByType.put(TherapyType.toCode(v.getTherapyType()), v.getAvgMin());
    		}
    	}
    	
    	// (enum) db한글데이터를 영문으로 변환
    	for(QueueRecordVO row : list) {     //상향된 포문에서 get가져와서 set을 통해 다시 넣기
    		row.setTherapyCategory(TherapyType.toCode(row.getTherapyCategory()));  //'견인치료'→'TRACTION'
    		row.setStatus(TreatmentStatus.toCode(row.getStatus()));	//'치료대기'→'WAIT'
    		
    		if(row.getDurationMin() ==null) {
    			row.setDurationMin(avgByType.getOrDefault(row.getTherapyCategory(),
                        defaultDuration(row.getTherapyCategory())));
    		}
    		if(row.getReceiptType()==null) {
    			row.setReceiptType("WALK_IN");
    		}
    	}
    	log.debug("getQueueList -> {}건", list.size());
		return list;
    	
    }
    
    //치료 시작: 베드 점유 + 기록 시작을 한 트랜잭션
    @Transactional
    public void startTherapy(TherapyStartVO req) {
    	// 기록 존재, 대기 상태 확인 ============
    	TherapyRecordBriefVO rec = this.physicalMapper.selectRecordBrief(req.getTreatmentNumber());
    	if (rec ==null) {
    		throw new IllegalArgumentException("존재하지 않는 치료기록: " + req.getTreatmentNumber());
    	}

    	// 소요시간 방어 — 기본값은 치료구분에 맞춰야 한다(일반 30분 / 견인 20분).
    	// rec.getTherapyType()은 DB 한글값이므로 코드로 바꿔서 넘긴다.
    	int duration = (req.getDurationMin() ==null || req.getDurationMin() <=0)
    			? defaultDuration(TherapyType.toCode(rec.getTherapyType()))
    			: req.getDurationMin();
    	req.setDurationMin(duration);
    	if(!TreatmentStatus.WAIT.dbLabel().equals(rec.getTreatmentStatus())) {
    		throw new IllegalStateException("대기 상태가 아니라 시작할 수 없음(현재: " + rec.getTreatmentStatus());
    	}
    	
    	//동일 환자의 동시 치료 검증
    	int activeCount = this.physicalMapper.selectActiveTreatmentCountByMedical(rec.getMedicalNumber());
        if (activeCount > 0) {
            throw new IllegalStateException("해당 환자는 이미 다른 치료를 진행 중입니다. 기존 치료 완료 후 배정해주세요.");
        }
    	
    	//베드 점유...
    	int bedRows = this.physicalMapper.occupyBed(req.getBedCode(), rec.getTherapyType());
    	if(bedRows == 0) {
    		throw new IllegalStateException("이미 사용중이거나 치료구분이 맞지 않는 베드: " +req.getBedCode());
    	}
    	
    	// 기록 시작
    	int recRows = this.physicalMapper.startTreatment(req);
    	if(recRows == 0) {
    		throw new IllegalStateException("치료 시작 처리에 실패(대기 상태가 아님).");
    	}
    	log.info("startTherapy - 완료 bed={}, treatment={}, {}분",
                req.getBedCode(), req.getTreatmentNumber(), duration);
    }
     
    @Transactional
    public void completeTherapy(TherapyStartVO req) {
    
    	TherapyRecordBriefVO rec = this.physicalMapper.selectRecordBrief(req.getTreatmentNumber());
        if (rec == null) {
            throw new IllegalArgumentException("존재하지 않는 치료기록: " + req.getTreatmentNumber());
        }
    	
        int recRows = this.physicalMapper.completeTreatment(req.getTreatmentNumber());
        if (recRows == 0)
            throw new IllegalStateException("치료중 상태가 아니라 완료할 수 없음: " + req.getTreatmentNumber());

        int bedRows = this.physicalMapper.releaseBedByTreatment(req.getTreatmentNumber());
        if(bedRows == 0) {
        	// 완료는 됐는데 풀린 베드가 없다? 데이터 정합이 깨진 신호  warn으로 경고
            log.warn("completeTherapy - 해제된 베드 없음! treatment={} (기록의 BED_CODE 확인 필요)", req.getTreatmentNumber());
        }
        
        int pending = this.physicalMapper.selectPendingOrderCount(rec.getMedicalNumber());
        if (pending == 0) {
            int moved = this.physicalMapper.updateReceiptStatusToPaymentPending(rec.getMedicalNumber());
            if (moved == 0) {
                // 오더는 다 끝났는데 접수가 '진료완료'가 아니라 전환이 안 된 상태.
                // 이 환자는 수납 화면에 뜨지 않으므로 info로 흘리면 아무도 모른다.
                log.warn("completeTherapy - 오더는 모두 완료됐으나 수납대기 전환 0행."
                        + " RECEIPT_STATUS가 '진료완료'가 아닙니다. medicalNumber={}", rec.getMedicalNumber());
            } else {
                log.info("completeTherapy - 전체 오더 완료, 수납대기 전환 {}행", moved);
            }
        } else {
            log.info("completeTherapy - 미완료 오더 {}건 남음, 전환 보류", pending);
        }
        log.info("completeTherapy - 완료 treatment={}, bedRows={}", req.getTreatmentNumber(), bedRows);
    }
    
    // 환자상세
    @Transactional
    public TherapyPatientDetailVO getPatientDetail(String medicalNumber, Long treatmentNumber) {
	   if(medicalNumber ==null || medicalNumber.isBlank()) {
		   throw new IllegalArgumentException("접수번호는 필수입니다.");
	   }
	   TherapyPatientDetailVO detail = this.physicalMapper.selectPatientDetail(medicalNumber, treatmentNumber);
	   if(detail == null) {
		   throw new IllegalArgumentException("해당 접수번호의 환자 정보를 찾을 수 없습니다: " +medicalNumber);
	   }
	   // 이력 조회 
	   List<TherapyHistoryVO> history = this.physicalMapper.selectPatientHistory(medicalNumber);
	   for(TherapyHistoryVO h : history) {
		   h.setTherapyType(TherapyType.toCode(h.getTherapyType()));//견인 등
		   h.setTreatmentStatus(TreatmentStatus.toCode(h.getTreatmentStatus()));
	   }
	   detail.setHistory(history);
	   log.debug("getPatientDetail - medicalNumber={}, received={}, seq={}, history={}건",
               medicalNumber, detail.getReceivedCount(), detail.getCourseSeq(), history.size());
      return detail;
    }
    
}
