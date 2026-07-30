package ddit.patient.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import ddit.patient.service.PatientWaitService;
import ddit.patient.vo.PatientWaitVO;

/*
 * PatientWaitController
 * 
 * 역할: 환자포털 대기현황 화면 요청을 처리하는 Controller
 */
@Controller
@RequestMapping("/patient/wait")
public class PatientWaitController {
	
	private final PatientWaitService patientWaitService;
	
	public PatientWaitController(PatientWaitService patientWaitService) {
		this.patientWaitService= patientWaitService;
	}
	
	/*
	 * 대기현황 목록 화면
	 * 
	 * 접속 주소:/patient/wait/list
	 */
	@GetMapping("/list")
	public String waitList(Model model) {
		
		List<PatientWaitVO> waitList= patientWaitService.selectWaitList();
		
		int totalCount= waitList.size();
		int waitingCount=0;
		int holdCount=0;
		
		for(PatientWaitVO wait: waitList) {
			if("대기".equals(wait.getStandbyState())) {
				waitingCount++;
			}
			
			if("보류".equals(wait.getStandbyState())) {
				holdCount++;
			}
		}
		
		model.addAttribute("waitList", waitList);
		model.addAttribute("totalCount", totalCount);
		model.addAttribute("waitingCount", waitingCount);
		model.addAttribute("holdCount", holdCount);
		
		return "patient/wait/list";
	}

}
