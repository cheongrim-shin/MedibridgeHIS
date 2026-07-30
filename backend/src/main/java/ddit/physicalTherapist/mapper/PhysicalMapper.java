package ddit.physicalTherapist.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import ddit.physicalTherapist.vo.BedVO;
import ddit.physicalTherapist.vo.QueueRecordVO;
import ddit.physicalTherapist.vo.TherapyDurationVO;
import ddit.physicalTherapist.vo.TherapyHistoryVO;
import ddit.physicalTherapist.vo.TherapyItemVO;
import ddit.physicalTherapist.vo.TherapyPatientDetailVO;
import ddit.physicalTherapist.vo.TherapyRecordBriefVO;
import ddit.physicalTherapist.vo.TherapyStartVO;

@Mapper
public interface PhysicalMapper {
	
	//=============물리치료 항목  =================
    //조회
	public List<TherapyItemVO> selectTherapyItems();
	//중복검사
	public String selectUsedByCode(String code);
	//등록
	public int insertTherapyItem(TherapyItemVO itemVO);
	//수정
	public int updateTherapyItem(TherapyItemVO itemVO);
	//삭제(소프트삭제)
	public int deleteTherapyItem(String code);
	// 삭제 내역(USED='N') 목록
	public List<TherapyItemVO> selectDeletedTherapyItems();
	//복원 (UPDATE USED='Y'). 반환 0 = 삭제 내역에 없음 
	public int restoreTherapyItem(String code);
	
	
	//============== 대기열 ===============
	
	// 침대 현황조회
	public List<BedVO> selectBeds();
	// 대기열 현황 조회
	public List<QueueRecordVO> selectQueueList();
	
	// 치료 시작 전 기록의 상태/치료구분 조회
	public TherapyRecordBriefVO selectRecordBrief(Long treatmentNumber);
	
	// 베드 점유. 반환 0 = 이미 사용중/치료구분 불일치/없음 
	public int occupyBed(@Param("bedCode") String bedCode, 
						 @Param("therapyType") String therapyType);
	//기록 시작. 반환 0 = 대기 상태가 아님
	public int startTreatment(TherapyStartVO req);
	
	public int completeTreatment(Long treatmentNumber);   // 0 = 치료중이 아님
	
	public int releaseBedByTreatment(Long treatmentNumber);
	
	public int selectPendingOrderCount(String medicalNumber);
	
	public int updateReceiptStatusToPaymentPending(String medicalNumber);
	
	public TherapyPatientDetailVO selectPatientDetail(
							@Param("medicalNumber") String medicalNumber, 
							@Param("treatmentNumber") Long treatmentNumber);
	
	public List<TherapyHistoryVO> selectPatientHistory(String medicalNumber);
	
	public List<TherapyDurationVO> selectAvgDurationByType();
	
	// 카운트 값이 0보다 크면 베드점유중
	public int selectActiveTreatmentCountByMedical(String medicalNumber);

}
