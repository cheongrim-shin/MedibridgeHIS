package ddit.patient.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ddit.patient.service.PatientReservationService;
import ddit.patient.vo.PatientDoctorOptionVO;

/*
 * 환자포털 예약 REST API Controller
 *
 * 역할:
 * - 진료과 선택 시 해당 진료과의 의료진 목록을 JSON으로 반환
 *
 * 요청 예:
 * GET /patient/reservation/api/doctors?deptCode=D03
 */
@RestController
@RequestMapping("/patient/reservation/api")
public class PatientReservationApiController {

	private final PatientReservationService patientReservationService;

	public PatientReservationApiController(
			PatientReservationService patientReservationService) {

		this.patientReservationService = patientReservationService;
	}

	/*
	 * 진료과별 의료진 목록
	 *
	 * 정상:
	 * HTTP 200 + JSON 배열
	 *
	 * 진료과 코드 누락:
	 * HTTP 400 + 빈 JSON 배열
	 */
	@GetMapping("/doctors")
	public ResponseEntity<List<PatientDoctorOptionVO>>
			selectDoctorListByDepartment(
					@RequestParam(required = false)
					String deptCode) {

		if (deptCode == null || deptCode.isBlank()) {

			return ResponseEntity
					.badRequest()
					.body(List.of());
		}

		List<PatientDoctorOptionVO> doctorList =
				patientReservationService
						.selectDoctorListByDepartment(
								deptCode.trim()
						);

		return ResponseEntity.ok(doctorList);
	}
}