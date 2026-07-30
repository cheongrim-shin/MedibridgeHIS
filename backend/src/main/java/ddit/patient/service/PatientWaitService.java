package ddit.patient.service;

import java.util.List;

import ddit.patient.vo.PatientWaitVO;

/*
 * PatientWaitService
 * 
 * 역할: 환자포털 대기현황 관련 비즈니스 로직 인터페이스
 */
public interface PatientWaitService {
	
	/*
	 * 대기현황 목록 조회
	 */
	public List<PatientWaitVO> selectWaitList();

}
