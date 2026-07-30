package ddit.patient.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import ddit.patient.vo.PatientMyPageVO;
import ddit.patient.vo.PatientProfileVO;
import ddit.patient.vo.PatientRegisterVO;
import ddit.patient.vo.PatientReservationVO;

/*
 * PatientMyPageMapper
 * 
 * 역할:
 * 환자포털 마이페이지에서 회원정보, 예약, 진료이력, 의사진료 결과를 조회한다.
 * 
 * 현재 DB 기준:
 * PATIENT_NUMBER가 아니라 MEMBER_NUMBER 기준으로 조회한다.
 */
@Mapper
public interface PatientMyPageMapper {
	
	/*
	 * 진료이력 목록 조회
	 */
	public List<PatientMyPageVO> selectHistoryList(@Param("memberNumber") String memberNumber);
	
	/*
	 * 진료이력 상세 조회
	 */
	public PatientMyPageVO selectHistoryDetail(
			@Param("medicalNumber") String medicalNumber,
			@Param("memberNumber") String memberNumber);
	
	/*
	 * 회원정보 조회
	 */
	public PatientProfileVO selectPatientProfile(@Param("memberNumber") String memberNumber);
	
	/*
	 * 마이페이지 홈 - 다가오는 예약 1건 조회
	 */
	public PatientReservationVO selectUpcomingReservation(@Param("memberNumber") String memberNumber);
	
	/*
	 * 마이페이지 접수/수납 이력 목록 조회
	 */
	public List<PatientRegisterVO> selectRegisterList(@Param("memberNumber") String memberNumber);

}