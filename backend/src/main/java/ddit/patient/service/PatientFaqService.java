package ddit.patient.service;

import java.util.List;

import ddit.patient.vo.PatientFaqVO;

/*
 * 환자포털 FAQ Service
 *
 * 역할:
 * Controller에서 필요한 FAQ 기능을 정의한다.
 */
public interface PatientFaqService {

	// FAQ 전체 목록 조회
	List<PatientFaqVO> selectFaqList();

	// FAQ 상세 조회
	PatientFaqVO selectFaqDetail(Integer faqNumber);

	// FAQ 검색 + 페이징 목록 조회
	List<PatientFaqVO> selectFaqList(String keyword, int startRow, int endRow);

	// FAQ 검색 결과 전체 개수 조회
	int selectFaqCount(String keyword);
}