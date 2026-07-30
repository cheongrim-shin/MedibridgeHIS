package ddit.patient.service;

import java.util.List;

import org.springframework.stereotype.Service;

import ddit.patient.mapper.PatientWaitMapper;
import ddit.patient.vo.PatientWaitVO;

/*
 * PatientWaitServiceImpl
 * 
 * 역할: Controller와 Mapper 사이에서 대기현황 조회 로직을 처리한다.
 */
@Service
public class PatientWaitServiceImpl implements PatientWaitService {
	
	private final PatientWaitMapper patientWaitMapper;
	
	public PatientWaitServiceImpl(PatientWaitMapper patientWaitMapper) {
		this.patientWaitMapper= patientWaitMapper;
	}

	@Override
	public List<PatientWaitVO> selectWaitList() {
		return patientWaitMapper.selectWaitList();
	}

}
