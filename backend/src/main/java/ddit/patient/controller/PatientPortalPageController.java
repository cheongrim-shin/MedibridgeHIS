package ddit.patient.controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import ddit.patient.service.PatientNoticeService;

/*
 * PatientPortalPageController
 * 
 * 역할:
 * 환자포털 JSP 기본 화면을 연결하는 Controller
 * 
 * 담당 화면:
 * -메인 화면
 * -로그인 화면
 */
@Controller
@RequestMapping("/patient")
public class PatientPortalPageController {
	
	private final PatientNoticeService patientNoticeService;
	
	/*
	 * 생성자 주입
	 * 
	 * 메인 화면의 최근 공지사항을 출력하기 위해 PatientNoticeService를 사용한다.
	 */
	public PatientPortalPageController(PatientNoticeService patientNoticeService) {
		this.patientNoticeService= patientNoticeService;
	}
	
	/*
	 * 환자포털 메인 화면
	 * 
	 * 접속 주소:/patient/main
	 */
	@GetMapping({"/main", "", "/"})
	public String home(Model model) {

		//공지사항 Service에서 최근 공지사항 목록을 받아 메인 화면으로 전달한다.
		model.addAttribute("recentNoticeList", patientNoticeService.selectNoticeList(null));

		return "patient/home";
	}
	  
	/*
	 * 로그인 화면
	 * 
	 * 접속 주소:/patient/login
	 */
	@GetMapping("/login")
	public String loginForm() {
		return "patient/login/form";
	}
	
}