package ddit.patient.service;

import java.util.List;

import org.springframework.stereotype.Service;

import ddit.patient.mapper.PatientMyPageMapper;
import ddit.patient.vo.PatientMyPageVO;
import ddit.patient.vo.PatientProfileVO;
import ddit.patient.vo.PatientRegisterVO;
import ddit.patient.vo.PatientReservationVO;

/*
 * 환자포털 마이페이지 Service 구현체
 * 
 * 현재 DB 기준:
 * PATIENT_NUMBER가 아니라 MEMBER_NUMBER 기준으로 조회한다.
 */
@Service
public class PatientMyPageServiceImpl implements PatientMyPageService {
	
	private final PatientMyPageMapper patientMyPageMapper;

	public PatientMyPageServiceImpl(PatientMyPageMapper patientMyPageMapper) {
		this.patientMyPageMapper = patientMyPageMapper;
	}
	
	/*
	 * 진료이력 목록 조회
	 */
	@Override
	public List<PatientMyPageVO> selectHistoryList(String memberNumber) {
		return patientMyPageMapper.selectHistoryList(memberNumber);
	}

	/*
	 * 진료이력 상세 조회
	 */
	@Override
	public PatientMyPageVO selectHistoryDetail(String medicalNumber, String memberNumber) {
		return patientMyPageMapper.selectHistoryDetail(medicalNumber, memberNumber);
	}

	/*
	 * 회원정보 조회
	 */
	@Override
	public PatientProfileVO selectPatientProfile(String memberNumber) {
		return patientMyPageMapper.selectPatientProfile(memberNumber);
	}

	/*
	 * 마이페이지 홈 - 다가오는 예약 1건 조회
	 */
	@Override
	public PatientReservationVO selectUpcomingReservation(String memberNumber) {
		return patientMyPageMapper.selectUpcomingReservation(memberNumber);
	}

	/*
	 * 마이페이지 접수/수납 이력 목록 조회
	 */
	@Override
	public List<PatientRegisterVO> selectRegisterList(String memberNumber) {
		return patientMyPageMapper.selectRegisterList(memberNumber);
	}
}