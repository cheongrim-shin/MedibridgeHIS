package ddit.patient.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import ddit.patient.vo.PatientQnaSearchVO;
import ddit.patient.vo.PatientQnaVO;

/*
 * 환자포털 QNA Mapper
 *
 * 역할:
 * QNA 테이블의 목록, 상세, 등록 SQL을 실행한다.
 */
@Mapper
public interface PatientQnaMapper {

	/*
	 * Q&A 문의분류 공용코드 조회
	 *
	 * COMMONCODE 테이블에서
	 * COMMONCODE = 'Q', USED = 'Y'인 Q01~Q09를 조회한다.
	 */
	List<Map<String, Object>> selectQnaCategoryList();

	// QNA 목록 조회
	List<PatientQnaVO> selectQnaList();

	// QNA 상세 조회
	PatientQnaVO selectQnaDetail(
			@Param("qandaNumber") String qandaNumber);

	// QNA 문의 등록
	int insertQna(PatientQnaVO patientQnaVO);

	// QNA 다음 문의번호 조회
	String selectNextQnaNumber();

	// 로그인 사용자 본인 QNA 목록 조회
	List<PatientQnaVO> selectQnaListByInquirer(
			@Param("inquirer") String inquirer);

	/*
	 * 로그인 사용자 본인 Q&A 검색/페이징 목록 조회
	 *
	 * 조건:
	 * - INQUIRER = 로그인 사용자 memberNumber
	 * - SUBJECT 검색
	 * - CATEGORY_CODE 검색
	 * - STATUS 검색
	 * - 페이징
	 */
	List<PatientQnaVO> selectMyQnaSearchList(
			PatientQnaSearchVO searchVO);

	/*
	 * 로그인 사용자 본인 Q&A 검색 결과 개수 조회
	 *
	 * 페이징 전체 개수 계산용
	 */
	int selectMyQnaSearchCount(
			PatientQnaSearchVO searchVO);

	/*
	 * 로그인 사용자 본인 Q&A 상세 조회
	 *
	 * 기존 selectQnaDetail은 qandaNumber만 조건으로 조회한다.
	 * 이 메서드는 QANDA_NUMBER + INQUIRER 둘 다 조건으로 걸어서
	 * 다른 사람 문의가 아예 조회되지 않게 한다.
	 */
	PatientQnaVO selectQnaDetailByInquirer(
			@Param("qandaNumber") String qandaNumber,
			@Param("inquirer") String inquirer);
}