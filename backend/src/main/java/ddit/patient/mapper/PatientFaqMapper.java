package ddit.patient.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import ddit.patient.vo.PatientFaqVO;

/*
 * 환자포털 FAQ Mapper
 *
 * 역할:
 * FAQ 테이블에서 FAQ 목록, 상세, 검색, 페이징 데이터를 조회한다.
 */
@Mapper
public interface PatientFaqMapper {

	// FAQ 전체 목록 조회
	List<PatientFaqVO> selectFaqList();

	// FAQ 상세 조회
	PatientFaqVO selectFaqDetail(@Param("faqNumber") Integer faqNumber);

	// FAQ 검색 + 페이징 목록 조회
	List<PatientFaqVO> selectFaqListByPaging(
			@Param("keyword") String keyword,
			@Param("startRow") int startRow,
			@Param("endRow") int endRow);

	// FAQ 검색 결과 전체 개수 조회
	int selectFaqCount(@Param("keyword") String keyword);
}