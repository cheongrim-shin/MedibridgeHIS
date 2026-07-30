package ddit.patient.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/*
 * PatientDocumentController
 * 
 * 역할:환자포털 제증명/서류 발급 안내 화면 요청을 처리하는 Controller
 * 
 * 현재 단계:DB 연결 없이 JSP 화면 출력만 확인한다.
 */
@Controller
@RequestMapping("/patient/document")
public class PatientDocumentController {

	/*
	 * 진단서발급 안내 화면
	 * 
	 * 접속 주소:/patient/document/diagnosis
	 */
	@GetMapping("/diagnosis")
	public String diagnosisCertificate() {
		return "patient/document/diagnosis";
	}
	
	/*
	 * 진료비계산서 안내 화면
	 * 
	 * 접속 주소:/patient/document/medical-bill
	 */
	@GetMapping("/medical-bill")
	public String medicalBill() {
		return "patient/document/medical-bill";
	}
	
	/*
	 * 의무기록 및 영상검사 사본발급 안내 화면
	 * 
	 * 접속 주소:/patient/document/medical-records
	 */
	@GetMapping("/medical-records")
	public String medicalRecords() {
		return "patient/document/medical-records";
	}
}
