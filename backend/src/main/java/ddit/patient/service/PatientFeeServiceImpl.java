package ddit.patient.service;

import java.util.List;

import org.springframework.stereotype.Service;

import ddit.patient.mapper.PatientFeeMapper;
import ddit.patient.vo.PatientFeeVO;

/*
 * PatientFeeServiceImpl
 * 
 * 역할: Controller와 Mapper 사이에서 비급여 항목 조회 로직을 처리한다.
 */
@Service
public class PatientFeeServiceImpl implements PatientFeeService {
	
	private final PatientFeeMapper patientFeeMapper;
	
	public PatientFeeServiceImpl(PatientFeeMapper patientFeeMapper) {
		this.patientFeeMapper= patientFeeMapper;
	}

	@Override
	public List<PatientFeeVO> selectNonCoveredFeeList(String category, String keyword) {
		return patientFeeMapper.selectNonCoveredFeeList(category, keyword);
	}

}
