package ddit.patient.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import ddit.patient.service.PatientFaqService;
import ddit.patient.vo.PatientFaqVO;
import lombok.RequiredArgsConstructor;

/*
 * 환자포털 FAQ Controller
 *
 * 역할:
 * - FAQ 목록 조회
 * - FAQ 검색
 * - FAQ 페이징 처리
 *
 * 현재 화면 방식:
 * - 별도 상세 페이지로 이동하지 않음
 * - 목록 화면에서 아코디언 방식으로 질문과 답변 표시
 *
 * FAQ는 환자 개인 데이터가 아니므로
 * memberNumber와 patientNumber를 사용하지 않는다.
 */
@Controller
@RequiredArgsConstructor
@RequestMapping("/patient/faq")
public class PatientFaqController {

	private final PatientFaqService patientFaqService;

	/*
	 * FAQ 목록 화면
	 *
	 * 기본 주소:
	 * /patient/faq/list
	 *
	 * 검색:
	 * /patient/faq/list?keyword=예약
	 *
	 * 페이징:
	 * /patient/faq/list?page=2
	 */
	@GetMapping("/list")
	public String faqList(
			@RequestParam(required = false) String keyword,
			@RequestParam(defaultValue = "1") int page,
			Model model) {

		/*
		 * 검색어 앞뒤 공백 제거
		 *
		 * 빈 문자열이면 검색 조건 없이
		 * 전체 FAQ를 조회하도록 null 처리한다.
		 */
		if (keyword != null) {
			keyword = keyword.trim();

			if (keyword.isEmpty()) {
				keyword = null;
			}
		}

		// 한 페이지에 표시할 FAQ 개수
		int size = 10;

		// 검색 조건에 맞는 전체 FAQ 개수 조회
		int totalCount =
				patientFaqService.selectFaqCount(keyword);

		// 전체 페이지 수 계산
		int totalPage =
				(int) Math.ceil((double) totalCount / size);

		/*
		 * 요청 페이지 값 보정
		 *
		 * FAQ가 없는 경우에도 페이지는 1로 유지한다.
		 * 마지막 페이지보다 큰 값이면 마지막 페이지로 보정한다.
		 * 1보다 작은 값이면 1페이지로 보정한다.
		 */
		if (totalPage == 0) {
			page = 1;
		} else {
			if (page > totalPage) {
				page = totalPage;
			}

			if (page < 1) {
				page = 1;
			}
		}

		// Oracle 페이징 시작 행 번호
		int startRow =
				(page - 1) * size + 1;

		// Oracle 페이징 끝 행 번호
		int endRow =
				page * size;

		// 검색 및 페이징이 적용된 FAQ 목록 조회
		List<PatientFaqVO> faqList =
				patientFaqService.selectFaqList(
						keyword,
						startRow,
						endRow
				);

		/*
		 * 페이지 블록 계산
		 *
		 * 예:
		 * 1 2 3 4 5
		 * 6 7 8 9 10
		 */
		int blockSize = 5;

		int startPage =
				((page - 1) / blockSize) * blockSize + 1;

		int endPage =
				startPage + blockSize - 1;

		if (endPage > totalPage) {
			endPage = totalPage;
		}

		// JSP 전달 데이터
		model.addAttribute("faqList", faqList);
		model.addAttribute("keyword", keyword);
		model.addAttribute("page", page);
		model.addAttribute("size", size);
		model.addAttribute("totalCount", totalCount);
		model.addAttribute("totalPage", totalPage);
		model.addAttribute("startPage", startPage);
		model.addAttribute("endPage", endPage);

		return "patient/faq/list";
	}
}