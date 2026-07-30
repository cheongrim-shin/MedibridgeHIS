package ddit.receptionist.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ddit.common.AesCryptoUtil;
import ddit.receptionist.mapper.ReceiptMapper;
import ddit.receptionist.vo.OrderStatusVO;
import ddit.receptionist.vo.PatientVO;
import ddit.receptionist.vo.ReceiptCreateVO;
import ddit.receptionist.vo.ReceiptDetailVO;
import ddit.receptionist.vo.ReceiptHistoryVO;
import ddit.receptionist.vo.ReceiptRowVO;
import ddit.receptionist.vo.ReceiptSearchVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ReceiptServiceImpl implements ReceiptService{

	@Autowired
	ReceiptMapper receiptMapper;
	@Autowired
	AesCryptoUtil cryptoUtil;
	
	private static final Pattern DATE_FMT = Pattern.compile("^\\d{4}-\\d{2}-\\d{2}$");
	
	private void validateDate(String d, String name) {
	    if (d != null && !d.isEmpty() && !DATE_FMT.matcher(d).matches()) {
	        throw new IllegalArgumentException(name + " 형식이 올바르지 않습니다(YYYY-MM-DD): " + d);
	    }
	}
	
	// 조회
	@Override
	public List<ReceiptRowVO> getReceiptList(ReceiptSearchVO searchVO) {
		validateDate(searchVO.getFromDate(), "조회 시작일");
		validateDate(searchVO.getToDate(), "조회 종료일");
		List<ReceiptRowVO> list = this.receiptMapper.selectReceiptList(searchVO);
		return list;
	}
 
	
	@Override
	@Transactional
	public String createReceipt(ReceiptCreateVO reqVO) {
		
		//분기 검증 기존, 신규 환자 정보가 하나만 와야함.
		boolean hasExisting = reqVO.getMemberNumber() !=null && !reqVO.getMemberNumber().isBlank();
		boolean hasNew = reqVO.getNewPatient() != null;
		if(hasExisting == hasNew) {
			throw new IllegalArgumentException("기존 환자 선택 또는 신규 환자 정보 중 하나만 보내야 합니다.");
		}
		
		if(hasNew) {
			String rrn = reqVO.getNewPatient().getRrn().replace("-", "");
			// 중복확인: 앞7자리 후보 조회 → 복호화 비교
		    // (암호문은 매번 달라서 = 비교 불가 → 후보를 좁혀 자바에서 판정)
			List<String> candidates = receiptMapper.selectRrnsByPrefix(cryptoUtil.rrnPrefix(rrn));
			for(String stored : candidates) {
				if(matchesRrn(stored, rrn)) {
					throw new IllegalStateException("이미 등록된 주민등록번호입니다. 기존 환자로 검색해 주세요.");
				}
			}
			//저장 직전 암호화 — 이 줄 이후 평문 13자리는 어디에도 없음
		    reqVO.getNewPatient().setRrn(cryptoUtil.encryptRrn(rrn));
			
			this.receiptMapper.insertPatient(reqVO.getNewPatient());
			reqVO.setMemberNumber(reqVO.getNewPatient().getMemberNumber());
			log.info("createReceipt - 신규환자 생성 memberNumber={}", reqVO.getMemberNumber());
		}
		
		int open = receiptMapper.countOpenReceipt(reqVO.getMemberNumber(), reqVO.getDoctorNumber());
		if (open > 0) {
			throw new IllegalStateException("오늘 같은 담당의로 진행 중인 접수가 있습니다. 기존 접수를 확인해 주세요.");
		}
		
		this.receiptMapper.insertReceipt(reqVO);
		log.info("createReceipt -> 접수 완료 medicalNumber={}, memberNumber={}",
					reqVO.getMedicalNumber(), reqVO.getMemberNumber());
		return reqVO.getMedicalNumber();
	}
	
	//검색
	@Override
	public List<PatientVO> searchPatients(String keyword) {
		 List<PatientVO> list = receiptMapper.selectPatients(keyword);
	    //  로그 파일에 주민번호가 쌓이는 걸 방지 (건수만 기록)
	    log.debug("searchPatients - 결과 {}건", list.size());
	    return list;
		
	}
	
	//환자 상세
	@Override
	public ReceiptDetailVO getReceiptDetail(String medicalNumber) {
		// 입력검증
		if(medicalNumber ==null || medicalNumber.isBlank()) {
			throw new IllegalArgumentException("접수번호가 없습니다.");
		}
		
		//조회
		ReceiptDetailVO detail = this.receiptMapper.selectReceiptDetail(medicalNumber);	
		if(detail ==null) {
			throw new IllegalArgumentException("해당 접수를 찾을 수 없습니다.");
		}
		return detail;
	}
	
	@Override
	public List<ReceiptHistoryVO> getReceiptHistory(String memberNumber) {
	    if (memberNumber == null || memberNumber.isBlank()) {
	        throw new IllegalArgumentException("환자번호가 없습니다.");   // → 400
	    }
	    return receiptMapper.selectReceiptHistoryByMember(memberNumber);  // 없으면 빈 리스트
	}
	
	@Override
	public Map<String, Integer> getReceiptCounts(String fromDate, String toDate) {
	    Map<String, Integer> result = new HashMap<>();
	    for (Map<String, Object> row : receiptMapper.selectReceiptCounts(fromDate, toDate)) {
	        result.put(String.valueOf(row.get("STATUS")),
	                   ((Number) row.get("CNT")).intValue());
	    }
	    return result;  
	}
	
	/**
	 * 저장값과 평문 주민번호의 동일 여부.
	 * 과도기 대응: 마이그레이션 전의 기존 데이터는 아직 13자리 평문이므로
	 *   - 13자리 숫자면 → 평문끼리 비교
	 *   - 아니면       → 복호화해서 비교 (복호화 실패 = 다른 값으로 간주)
	 */
	private boolean matchesRrn(String stored, String plainRrn) {
	    if (stored == null) return false;
	    if (stored.matches("\\d{13}")) return stored.equals(plainRrn);   // 아직 평문인 옛 데이터
	    try {
	        return cryptoUtil.decryptRrn(stored).equals(plainRrn);
	    } catch (Exception e) {
	        return false;   // 못 읽는 값은 "동일인 아님" — 등록을 막지 않는 방향으로 안전하게
	    }
	}

	@Override
	public List<OrderStatusVO> getPatientOrders(String medicalNumber) {
		return this.receiptMapper.selectPatientOrders(medicalNumber);
	}
	
	
}
