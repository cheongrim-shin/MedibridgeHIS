package ddit.patient.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ddit.patient.mapper.PatientQnaMapper;
import ddit.patient.vo.PatientQnaSearchVO;
import ddit.patient.vo.PatientQnaVO;
import lombok.RequiredArgsConstructor;

/*
 * 환자포털 QNA ServiceImpl
 *
 * 역할:
 * QNA 목록 조회, 상세 조회, 문의 등록을 처리한다.
 */
@Service
@RequiredArgsConstructor
public class PatientQnaServiceImpl implements PatientQnaService {

	private final PatientQnaMapper patientQnaMapper;

	/*
	 * Q&A 문의분류 공용코드 조회
	 *
	 * COMMONCODE 테이블의 Q 그룹에서
	 * 사용 중인 Q01~Q09 문의분류를 조회한다.
	 */
	@Override
	public List<Map<String, Object>> selectQnaCategoryList() {

		return patientQnaMapper.selectQnaCategoryList();
	}

	@Override
	public List<PatientQnaVO> selectQnaList() {

		// QNA 테이블에서 전체 문의 목록 조회
		return patientQnaMapper.selectQnaList();
	}

	@Override
	public List<PatientQnaVO> selectQnaListByInquirer(String inquirer) {

		/*
		 * 로그인 사용자 회원번호가 없으면
		 * 본인 문의 목록을 조회할 수 없으므로 예외 처리
		 */
		if (inquirer == null || inquirer.isBlank()) {
			throw new IllegalArgumentException("로그인 사용자 정보가 없습니다.");
		}

		// 로그인한 사용자가 작성한 문의만 조회
		return patientQnaMapper.selectQnaListByInquirer(inquirer);
	}

	@Override
	public PatientQnaVO selectQnaDetail(String qandaNumber) {

		if (qandaNumber == null || qandaNumber.isBlank()) {
			throw new IllegalArgumentException("문의번호가 없습니다.");
		}

		PatientQnaVO patientQnaVO =
				patientQnaMapper.selectQnaDetail(qandaNumber);

		if (patientQnaVO == null) {
			throw new IllegalArgumentException("존재하지 않는 문의입니다.");
		}

		return patientQnaVO;
	}

	@Override
	@Transactional
	public int insertQna(PatientQnaVO patientQnaVO) {

		if (patientQnaVO == null) {
			throw new IllegalArgumentException("문의 정보가 없습니다.");
		}

		if (patientQnaVO.getSubject() == null
				|| patientQnaVO.getSubject().isBlank()) {

			throw new IllegalArgumentException("제목을 입력해 주세요.");
		}

		if (patientQnaVO.getCategoryCode() == null
				|| patientQnaVO.getCategoryCode().isBlank()) {

			throw new IllegalArgumentException("문의 유형을 선택해 주세요.");
		}

		if (patientQnaVO.getInquiryDetails() == null
				|| patientQnaVO.getInquiryDetails().isBlank()) {

			throw new IllegalArgumentException("문의 내용을 입력해 주세요.");
		}

		if (patientQnaVO.getQandaNumber() == null
				|| patientQnaVO.getQandaNumber().isBlank()) {

			String nextQnaNumber =
					patientQnaMapper.selectNextQnaNumber();

			if (nextQnaNumber == null
					|| nextQnaNumber.isBlank()) {

				throw new IllegalStateException(
						"문의번호 생성에 실패했습니다.");
			}

			patientQnaVO.setQandaNumber(nextQnaNumber);
		}

		/*
		 * 중요:
		 * 예전에는 여기서 테스트용 M02-03을 넣었지만,
		 * 이제는 Controller에서 로그인 사용자 memberNumber를 넣는다.
		 *
		 * 따라서 inquirer가 비어 있으면 잘못된 흐름으로 보고 등록을 막는다.
		 */
		if (patientQnaVO.getInquirer() == null
				|| patientQnaVO.getInquirer().isBlank()) {

			throw new IllegalArgumentException("로그인 사용자 정보가 없습니다.");
		}

		if (patientQnaVO.getStatus() == null
				|| patientQnaVO.getStatus().isBlank()) {

			patientQnaVO.setStatus("WAIT");
		}

		int result =
				patientQnaMapper.insertQna(patientQnaVO);

		if (result != 1) {
			throw new IllegalStateException(
					"문의 등록에 실패했습니다.");
		}

		return result;
	}

	@Override
	public List<PatientQnaVO> selectMyQnaSearchList(
			PatientQnaSearchVO searchVO) {

		/*
		 * 검색 조건 객체 자체가 없으면
		 * 목록 조회를 진행할 수 없으므로 예외 처리
		 */
		if (searchVO == null) {
			throw new IllegalArgumentException("검색 조건이 없습니다.");
		}

		/*
		 * 로그인 사용자 회원번호는 필수
		 *
		 * QNA.INQUIRER = 로그인 사용자 MEMBER_NUMBER
		 * 조건으로 본인 문의만 조회해야 한다.
		 */
		if (searchVO.getInquirer() == null
				|| searchVO.getInquirer().isBlank()) {

			throw new IllegalArgumentException("로그인 사용자 정보가 없습니다.");
		}

		/*
		 * 검색 조건에 맞는 전체 건수 조회
		 *
		 * 이 값으로 전체 페이지 수를 계산한다.
		 */
		int totalCount =
				patientQnaMapper.selectMyQnaSearchCount(searchVO);

		searchVO.setTotalCount(totalCount);

		/*
		 * 사용자가 주소창에서 currentPage를 너무 크게 입력한 경우 방어
		 *
		 * 예:
		 * 실제 마지막 페이지가 2인데
		 * /patient/qna/list?currentPage=999 입력한 경우
		 */
		if (searchVO.getCurrentPage() > searchVO.getTotalPage()) {
			searchVO.setCurrentPage(searchVO.getTotalPage());
		}

		/*
		 * 로그인 사용자 본인 Q&A 검색/페이징 목록 조회
		 */
		return patientQnaMapper.selectMyQnaSearchList(searchVO);
	}

	@Override
	public int selectMyQnaSearchCount(
			PatientQnaSearchVO searchVO) {

		if (searchVO == null) {
			throw new IllegalArgumentException("검색 조건이 없습니다.");
		}

		if (searchVO.getInquirer() == null
				|| searchVO.getInquirer().isBlank()) {

			throw new IllegalArgumentException("로그인 사용자 정보가 없습니다.");
		}

		return patientQnaMapper.selectMyQnaSearchCount(searchVO);
	}

	@Override
	public PatientQnaVO selectQnaDetailByInquirer(
			String qandaNumber,
			String inquirer) {

		/*
		 * 문의번호 검증
		 */
		if (qandaNumber == null || qandaNumber.isBlank()) {
			throw new IllegalArgumentException("문의번호가 없습니다.");
		}

		/*
		 * 로그인 사용자 회원번호 검증
		 */
		if (inquirer == null || inquirer.isBlank()) {
			throw new IllegalArgumentException("로그인 사용자 정보가 없습니다.");
		}

		/*
		 * QANDA_NUMBER + INQUIRER 조건으로 조회
		 *
		 * 문의번호가 존재하더라도
		 * 로그인 사용자의 문의가 아니면 조회되지 않는다.
		 */
		PatientQnaVO qna =
				patientQnaMapper.selectQnaDetailByInquirer(
						qandaNumber,
						inquirer);

		if (qna == null) {
			throw new IllegalArgumentException("조회할 수 없는 문의입니다.");
		}

		return qna;
	}
}