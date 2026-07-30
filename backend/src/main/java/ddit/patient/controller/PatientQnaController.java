package ddit.patient.controller;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import ddit.login.security.CustomUserDetails;
import ddit.patient.service.PatientQnaService;
import ddit.patient.vo.PatientQnaSearchVO;
import ddit.patient.vo.PatientQnaVO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/*
 * 환자포털 QNA Controller
 *
 * 역할:
 * - 환자 문의사항 목록 조회
 * - 환자 문의사항 검색/페이징
 * - 환자 문의사항 상세 조회
 * - 환자 문의사항 등록 화면 이동
 * - 환자 문의사항 등록 처리
 *
 * 현재 기준:
 * - Spring Security 로그인 사용자 기준으로 동작
 * - 문의 등록 시 로그인 사용자의 MEMBER_NUMBER를 INQUIRER로 저장
 * - 문의 목록은 로그인 사용자 본인 문의만 조회
 * - 문의 상세는 QANDA_NUMBER + INQUIRER 조건으로 본인 문의만 조회
 * - 문의분류는 COMMONCODE의 Q01~Q09를 조회하여 사용
 */
@Controller
@RequiredArgsConstructor
@RequestMapping("/patient/qna")
public class PatientQnaController {

	private final PatientQnaService patientQnaService;

	/*
	 * 로그인 사용자의 회원번호 추출
	 *
	 * memberNumber는 URL이나 hidden input에서 받지 않고
	 * Spring Security 로그인 정보에서만 가져온다.
	 */
	private String getLoginMemberNumber(
			CustomUserDetails loginUser) {

		if (loginUser == null
				|| loginUser.getMember() == null) {

			throw new IllegalArgumentException(
					"로그인 사용자 정보가 없습니다.");
		}

		String memberNumber =
				loginUser.getMember().getMemberNumber();

		if (memberNumber == null
				|| memberNumber.isBlank()) {

			throw new IllegalArgumentException(
					"로그인 사용자 정보가 없습니다.");
		}

		return memberNumber;
	}

	/*
	 * Q&A 문의분류 공용코드를 Model에 전달
	 *
	 * qnaCategoryList:
	 * - Q01 진료 예약 문의
	 * - Q02 진료/치료 관련 문의
	 * - ...
	 * - Q09 기타 문의
	 *
	 * 문의 등록, 목록, 상세 화면에서 공통으로 사용한다.
	 */
	private void addQnaCategoryList(Model model) {

		model.addAttribute(
				"qnaCategoryList",
				patientQnaService.selectQnaCategoryList()
		);
	}

	/*
	 * QNA 목록 화면
	 *
	 * 접속 주소:
	 * /patient/qna/list
	 *
	 * 검색 조건:
	 * - keyword: 제목 검색
	 * - categoryCode: 문의 유형
	 * - status: 답변 상태
	 * - currentPage: 현재 페이지
	 */
	@GetMapping("/list")
	public String qnaList(
			@ModelAttribute("searchVO")
			PatientQnaSearchVO searchVO,
			Model model,
			@AuthenticationPrincipal
			CustomUserDetails loginUser) {

		String memberNumber =
				getLoginMemberNumber(loginUser);

		/*
		 * 로그인 사용자 회원번호를
		 * 검색 조건에 서버에서 직접 설정한다.
		 */
		searchVO.setInquirer(memberNumber);

		List<PatientQnaVO> qnaList =
				patientQnaService
						.selectMyQnaSearchList(searchVO);

		/*
		 * 기존 JSP 호환용 Model 값이다.
		 *
		 * URL이나 hidden input으로 전달하지 않는다.
		 */
		model.addAttribute(
				"memberNumber",
				memberNumber);

		model.addAttribute(
				"qnaList",
				qnaList);

		model.addAttribute(
				"searchVO",
				searchVO);

		/*
		 * 목록 화면에서
		 * Q09 대신 기타 문의 등의 코드명을 출력한다.
		 */
		addQnaCategoryList(model);

		return "patient/qna/list";
	}

	/*
	 * QNA 등록 화면
	 *
	 * 접속 주소:
	 * /patient/qna/form
	 */
	@GetMapping("/form")
	public String qnaForm(
			Model model,
			@AuthenticationPrincipal
			CustomUserDetails loginUser) {

		String memberNumber =
				getLoginMemberNumber(loginUser);

		model.addAttribute(
				"memberNumber",
				memberNumber);

		/*
		 * JSP 입력 필드와 연결할 빈 QNA 객체
		 *
		 * 등록 실패 후 기존 입력값이 존재하면
		 * 새 객체로 덮어쓰지 않는다.
		 */
		if (!model.containsAttribute("qna")) {

			model.addAttribute(
					"qna",
					new PatientQnaVO());
		}

		/*
		 * 문의 등록 화면의 select에서 사용할
		 * Q01~Q09 공용코드 목록
		 */
		addQnaCategoryList(model);

		return "patient/qna/form";
	}

	/*
	 * QNA 등록 처리
	 *
	 * 요청 주소:
	 * /patient/qna/register
	 */
	@PostMapping("/register")
	public String qnaRegister(
			@Valid
			@ModelAttribute("qna")
			PatientQnaVO patientQnaVO,
			BindingResult bindingResult,
			Model model,
			RedirectAttributes redirectAttributes,
			@AuthenticationPrincipal
			CustomUserDetails loginUser) {

		String memberNumber =
				getLoginMemberNumber(loginUser);

		model.addAttribute(
				"memberNumber",
				memberNumber);

		/*
		 * 검증 실패로 form.jsp를 다시 반환해도
		 * 문의분류 select가 비지 않도록 전달한다.
		 */
		addQnaCategoryList(model);

		/*
		 * 문의 작성자는 브라우저에서 받지 않는다.
		 *
		 * 로그인 사용자의 MEMBER_NUMBER를
		 * 서버에서 직접 INQUIRER에 설정한다.
		 */
		patientQnaVO.setInquirer(memberNumber);

		/*
		 * PatientQnaVO 유효성 검사
		 */
		if (bindingResult.hasErrors()) {

			model.addAttribute(
					"errorMessage",
					"입력값을 확인해 주세요.");

			return "patient/qna/form";
		}

		try {

			patientQnaService.insertQna(
					patientQnaVO);

			redirectAttributes.addFlashAttribute(
					"successMessage",
					"문의가 등록되었습니다.");

			return "redirect:/patient/qna/list";

		} catch (IllegalArgumentException e) {

			model.addAttribute(
					"errorMessage",
					e.getMessage());

			model.addAttribute(
					"qna",
					patientQnaVO);

			return "patient/qna/form";

		} catch (IllegalStateException e) {

			model.addAttribute(
					"errorMessage",
					e.getMessage());

			model.addAttribute(
					"qna",
					patientQnaVO);

			return "patient/qna/form";
		}
	}

	/*
	 * QNA 상세 화면
	 *
	 * 접속 주소:
	 * /patient/qna/detail?qandaNumber=Q0008
	 *
	 * QANDA_NUMBER와 로그인 사용자 INQUIRER를
	 * 함께 조건으로 사용하여 본인 문의만 조회한다.
	 */
	@GetMapping("/detail")
	public String qnaDetail(
			@RequestParam("qandaNumber")
			String qandaNumber,
			Model model,
			RedirectAttributes redirectAttributes,
			@AuthenticationPrincipal
			CustomUserDetails loginUser) {

		String memberNumber =
				getLoginMemberNumber(loginUser);

		model.addAttribute(
				"memberNumber",
				memberNumber);

		/*
		 * 상세 화면에서도 문의분류 공용코드를 전달한다.
		 *
		 * 이를 통해:
		 * Q09 → 기타 문의
		 * Q07 → 시설/이용 안내
		 * 형태로 출력할 수 있다.
		 */
		addQnaCategoryList(model);

		try {

			/*
			 * 문의번호와 로그인 사용자 회원번호를
			 * 함께 조건으로 상세 조회한다.
			 *
			 * 다른 사용자의 문의번호를 입력하면
			 * 조회되지 않는다.
			 */
			PatientQnaVO qna =
					patientQnaService
							.selectQnaDetailByInquirer(
									qandaNumber,
									memberNumber);

			model.addAttribute(
					"qna",
					qna);

			return "patient/qna/detail";

		} catch (IllegalArgumentException e) {

			redirectAttributes.addFlashAttribute(
					"errorMessage",
					e.getMessage());

			return "redirect:/patient/qna/list";
		}
	}
}