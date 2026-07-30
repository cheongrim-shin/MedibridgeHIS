package ddit.patient.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import ddit.patient.vo.PatientDoctorOptionVO;
import ddit.patient.vo.PatientReservationVO;

/*
 * 환자포털 예약 Mapper
 *
 * 실제 DB 구조:
 * - 예약: APPOINTMENT
 * - 의료진: EMPLOYEE
 * - 회원 이름: MEMBER
 * - 진료과: DEPARTMENT
 * - 권한: AUTHORITY
 */
@Mapper
public interface PatientReservationMapper {

	/*
	 * 로그인 회원의 예약 목록 조회
	 */
	List<PatientReservationVO> selectReservationList(
			@Param("memberNumber")
			String memberNumber);

	/*
	 * 로그인 회원의 예약 상세 조회
	 */
	PatientReservationVO selectReservationDetail(
			@Param("appointmentNumber")
			String appointmentNumber,

			@Param("memberNumber")
			String memberNumber);

	/*
	 * 의사가 실제 배치된 진료과 목록 조회
	 */
	List<PatientReservationVO> selectDepartmentList();

	/*
	 * 예약 가능한 전체 의사 목록 조회
	 *
	 * 기존 코드 호환을 위해 유지한다.
	 */
	List<PatientReservationVO> selectDoctorList();

	/*
	 * 선택한 진료과의 예약 가능한 의사 목록 조회
	 *
	 * REST API의 JSON 응답 데이터로 사용한다.
	 */
	List<PatientDoctorOptionVO> selectDoctorListByDepartment(
			@Param("deptCode")
			String deptCode);

	/*
	 * 선택한 진료과와 의료진의 유효성 검사
	 */
	int countValidDoctor(
			PatientReservationVO reservation);

	/*
	 * 예약 신청
	 */
	int insertReservation(
			PatientReservationVO reservation);

	/*
	 * 동일 의료진의 예약 시간 중복 검사
	 */
	int countDuplicateReservationTime(
			PatientReservationVO reservation);

	/*
	 * 예약 일시 변경
	 */
	int updateReservationTime(
			PatientReservationVO reservation);

	/*
	 * 예약 취소
	 */
	int cancelReservation(
			@Param("appointmentNumber")
			String appointmentNumber,

			@Param("memberNumber")
			String memberNumber);
}