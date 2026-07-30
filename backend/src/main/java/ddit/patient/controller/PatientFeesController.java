package ddit.patient.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import ddit.patient.service.PatientFeeService;

/*
 * PatientFeesController
 * 
 * 역할: 환자포털 진료비/비급여 안내 화면 요청을 처리하는 Controller
 * 
 */
@Controller
@RequestMapping("/patient/fees")
public class PatientFeesController {
	
	private final PatientFeeService patientFeeService;

	public PatientFeesController(PatientFeeService patientFeeService) {
		this.patientFeeService= patientFeeService;
	}
	
	/*
	 * 비급여 진료비용 안내 화면
	 * 
	 * 접속 주소: /patient/fees/non-covered
	 */
	@GetMapping("/non-covered")
	public String nonCoveredFee(
			@RequestParam(defaultValue= "all")String category,
			@RequestParam(required= false)String keyword,
			Model model) {
		
		model.addAttribute("activeCategory", category);
		model.addAttribute("keyword", keyword);
		model.addAttribute("feeList", patientFeeService.selectNonCoveredFeeList(category, keyword));
		
		return "patient/fees/non-covered";
	}
}
