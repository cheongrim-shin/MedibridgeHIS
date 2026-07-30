package ddit.patient.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/*
 * PatientDirectionsController
 * 
 * 역할: 환자포털 오시는길 화면 요청 처리하는 Controller
 * 
 * 현재 단계: DB 연결 없이 JSP 화면 출력만 확인한다.
 */
@Controller
@RequestMapping("/patient")
public class PatientDirectionsController {

	/*
	 * 오시는길 화면
	 * 
	 * 접속 주소:/patient/directions
	 */
	@GetMapping("/directions")
	public String directions() {
		return "patient/directions";
	}
}
