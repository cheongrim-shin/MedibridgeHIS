package ddit.patient.service;

import java.util.List;
import java.util.Map;

import ddit.patient.vo.PatientQnaSearchVO;
import ddit.patient.vo.PatientQnaVO;

/*
 * 환자포털 QNA Service
 *
 * 역할:
 * 환자 문의사항 목록, 상세, 등록 기능을 정의한다.
 */
public interface PatientQnaService {

	/*
	 * Q&A 문의분류 공용코드 조회
	 *
	 * COMMONCODE 테이블에서 Q01~Q09를 조회한다.
	 */
	List<Map<String, Object>> selectQnaCategoryList();

	// QNA 목록 조회
	List<PatientQnaVO> selectQnaList();

	// 로그인 사용자 본인 QNA 목록 조회
	List<PatientQnaVO> selectQnaListByInquirer(String inquirer);

	// QNA 상세 조회
	PatientQnaVO selectQnaDetail(String qandaNumber);

	// QNA 문의 등록
	int insertQna(PatientQnaVO patientQnaVO);

	// 로그인 사용자 본인 Q&A 검색/페이징 목록 조회
	List<PatientQnaVO> selectMyQnaSearchList(
			PatientQnaSearchVO searchVO);

	// 로그인 사용자 본인 Q&A 검색 결과 개수 조회
	int selectMyQnaSearchCount(
			PatientQnaSearchVO searchVO);

	// 로그인 사용자 본인 Q&A 상세 조회
	PatientQnaVO selectQnaDetailByInquirer(
			String qandaNumber,
			String inquirer);
}