package ddit.patient.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import ddit.patient.service.PatientNoticeService;
import ddit.patient.vo.PatientNoticeVO;

/*
 * 환자포털 공지사항 Controller
 */
@Controller
@RequestMapping("/patient/notice")
public class PatientNoticeController {
	
	private final PatientNoticeService patientNoticeService;
	
	public PatientNoticeController(PatientNoticeService patientNoticeService) {
		this.patientNoticeService = patientNoticeService;
	}
	
	/*
	 * 공지사항 목록
	 * 
	 * 접속 주소:
	 * /patient/notice/list
	 */
	@GetMapping("/list")
	public String noticeList(
			@RequestParam(required = false) String keyword,
			@RequestParam(required = false) String category,
			@RequestParam(defaultValue = "1") int currentPage,
			Model model) {
		
		int size = 10;
		
		if (currentPage < 1) {
			currentPage = 1;
		}
		
		int totalCount = patientNoticeService.selectNoticeCount(keyword, category);
		int totalPages = (int) Math.ceil((double) totalCount / size);
		
		if (totalPages > 0 && currentPage > totalPages) {
			currentPage = totalPages;
		}
		
		model.addAttribute("noticeList",
				patientNoticeService.selectNoticeList(keyword, category, currentPage, size));
		
		model.addAttribute("keyword", keyword);
		model.addAttribute("category", category);
		model.addAttribute("currentPage", currentPage);
		model.addAttribute("totalPages", totalPages);
		model.addAttribute("totalCount", totalCount);
		
		return "patient/notice/list";
	}
	 
	/*
	 * 공지사항 상세
	 * 
	 * 표준 주소:
	 * /patient/notice/detail?noticeNumber=1
	 * 
	 * 기존 주소도 임시 지원:
	 * /patient/notice/detail?noticeNo=1
	 */
	@GetMapping("/detail")
	public String noticeDetail(
			@RequestParam(required = false) Integer noticeNumber,
			@RequestParam(required = false) Integer noticeNo,
			Model model) {
		
		// 기존 noticeNo 주소도 임시 지원
		if (noticeNumber == null) {
			noticeNumber = noticeNo;
		}
		
		// 공지번호가 없으면 빈 상세 화면으로 보낸다
		if (noticeNumber == null) {
			model.addAttribute("notice", null);
			return "patient/notice/detail";
		}
		
		// 상세 화면 접근 시 조회수를 먼저 증가시킨다
		patientNoticeService.increaseNoticeViews(noticeNumber);
		
		// 증가된 조회수를 포함하여 상세 정보를 다시 조회한다
		PatientNoticeVO notice = patientNoticeService.selectNoticeDetail(noticeNumber);
		
		model.addAttribute("notice", notice);
		model.addAttribute("noticeNumber", noticeNumber);
		model.addAttribute("noticeNo", noticeNumber);
		
		if (notice != null) {
			model.addAttribute("prevNotice", patientNoticeService.selectPrevNotice(noticeNumber));
			model.addAttribute("nextNotice", patientNoticeService.selectNextNotice(noticeNumber));
		}
		
		return "patient/notice/detail";
	}
}