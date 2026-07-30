package ddit.patient.service;

import java.util.Date;
import java.util.List;

import ddit.patient.vo.PatientDoctorOptionVO;
import ddit.patient.vo.PatientReservationVO;

/*
 * 환자포털 예약 Service
 *
 * 현재 DB 기준:
 * APPOINTMENT 테이블의 MEMBER_NUMBER를 기준으로
 * 로그인 사용자 본인의 예약만 처리한다.
 */
public interface PatientReservationService {

	// 예약 목록 조회
	List<PatientReservationVO> selectReservationList(
			String memberNumber);

	// 예약 상세 조회
	PatientReservationVO selectReservationDetail(
			String appointmentNumber,
			String memberNumber);

	// 예약 신청 화면 - 진료과 목록 조회
	List<PatientReservationVO> selectDepartmentList();

	// 예약 신청 화면 - 전체 의료진 목록 조회
	List<PatientReservationVO> selectDoctorList();

	/*
	 * 진료과별 의료진 목록 조회
	 *
	 * 예약 화면에서 진료과를 선택하면
	 * REST API가 이 메서드를 호출해 JSON으로 반환한다.
	 */
	List<PatientDoctorOptionVO> selectDoctorListByDepartment(
			String deptCode);

	// 예약 신청 등록
	int insertReservation(
			PatientReservationVO reservation);

	// 예약 일시 변경
	int updateReservationTime(
			String appointmentNumber,
			String memberNumber,
			Date reservedAt);

	// 예약 취소
	int cancelReservation(
			String appointmentNumber,
			String memberNumber);
}