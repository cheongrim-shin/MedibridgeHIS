package ddit.patient.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/*
 * PatientDoctorController
 * 
 * 역할:
 * 환자포털 의료진 소개 화면 요청을 처리하는 Controller
 * 
 * 현재 단계:
 * React 원본 UI의 DoctorsPage 화면을 JSP로 연결한다.
 * DB 연결 없이 JSP 화면 출력만 확인한다.
 */
@Controller
@RequestMapping("/patient/doctor")
public class PatientDoctorController {

	/*
	 * 의료진 소개 화면
	 * 
	 * 접속 주소:
	 * /patient/doctor/list
	 */
	@GetMapping("/list")
	public String doctorList() {
		return "patient/doctor/list";
	}
}