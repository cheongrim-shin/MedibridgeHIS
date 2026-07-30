package ddit.patient.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/*
 * PatientGuideController
 * 
 * 역할: 환자포털 이용안내 화면 요청을 처리하는 Controller
 * 
 * 현재 단계: DB 연결 없이 JSP 화면 출력만 확인한다.
 */
@Controller
@RequestMapping("/patient/guide")
public class PatientGuideController {

	/*
	 * 예약안내 화면
	 * 
	 * 접속 주소:/patient/guide/reservation
	 */
	@GetMapping("/reservation")
	public String reservationGuide() {
		return "patient/guide/reservation";
	}
	
	/*
	 * 외래진료 안내 화면
	 * 
	 * 접속 주소:/patient/guide/outpatient
	 */
	@GetMapping("/outpatient")
	public String outpatientGuide() {
		return "patient/guide/outpatient";
	}
	
	/*
	 * 입원절차 안내 화면
	 * 
	 * 접속 주소:/patient/guide/admission
	 */
	@GetMapping("/admission")
	public String admissionGuide() {
		return "patient/guide/admission";
	}
	
	/*
	 * 퇴원절차 안내 화면
	 * 
	 * 접속 주소:/patient/guide/discharge
	 */
	@GetMapping("/discharge")
	public String dischargeGuide() {
		return "patient/guide/discharge";
	}
	
	/*
	 * 입원생활안내 화면
	 * 
	 * 접속 주소:/patient/guide/inpatient-life
	 */
	@GetMapping("/inpatient-life")
	public String inpatientLifeGuide() {
		return "patient/guide/inpatient-life";
	}
	
	/*
	 * 문병안내 화면
	 * 
	 * 접속 주소:/patient/guide/visitation
	 */
	@GetMapping("/visitation")
	public String visitationGuide() {
		return "patient/guide/visitation";
	}
}
