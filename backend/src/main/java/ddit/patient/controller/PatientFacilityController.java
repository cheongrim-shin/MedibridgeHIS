package ddit.patient.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/*
 * PatientFacilityController
 * 
 * 역할:환자포털 편의시설 안내 화면 요청을 처리하는 Controller
 * 
 * 현재 단계:DB 연결 없이 JSP 화면 출력만 확인한다.
 */
@Controller
@RequestMapping("/patient/facility")
public class PatientFacilityController {

	/*
	 * 원내 편의시설 화면
	 * 
	 * 접속 주소:/patient/facility/internal
	 */
	@GetMapping("/internal")
	public String internalFacility() {
		return "patient/facility/internal";
	}
	
	/*
	 * 외부 편의시설 화면
	 * 
	 * 접속 주소:/patient/facility/external
	 */
	@GetMapping("/external")
	public String externalFacility() {
		return "patient/facility/external";
	}
}
