package ddit.patient.service;

import java.util.List;

import ddit.patient.vo.PatientFeeVO;

/*
 * PatientFeeService
 * 
 * 역할: 환자포털 비급여 항목 관련 비즈니스 로직 인터페이스
 */
public interface PatientFeeService {
	
	/*
	 * 비급여 항목 목록 조회
	 */
	public List<PatientFeeVO> selectNonCoveredFeeList(String category, String keyword);

}
