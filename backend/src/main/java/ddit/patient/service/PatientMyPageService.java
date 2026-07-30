package ddit.patient.service;

import java.util.List;

import ddit.patient.vo.PatientMyPageVO;
import ddit.patient.vo.PatientProfileVO;
import ddit.patient.vo.PatientRegisterVO;
import ddit.patient.vo.PatientReservationVO;

/*
 * 환자포털 마이페이지 Service
 * 
 * 현재 DB 기준:
 * PATIENT_NUMBER가 아니라 MEMBER_NUMBER 기준으로 조회한다.
 */
public interface PatientMyPageService {
	
	// 진료이력 목록 조회
	public List<PatientMyPageVO> selectHistoryList(String memberNumber);

	// 진료이력 상세 조회
	public PatientMyPageVO selectHistoryDetail(String medicalNumber, String memberNumber);
	
	// 회원정보 조회
	public PatientProfileVO selectPatientProfile(String memberNumber);
	
	// 마이페이지 홈 - 다가오는 예약 1건 조회
	public PatientReservationVO selectUpcomingReservation(String memberNumber);
	
	// 마이페이지 접수/수납 이력 목록 조회
	public List<PatientRegisterVO> selectRegisterList(String memberNumber);
}