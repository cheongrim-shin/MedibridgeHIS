package ddit.patient.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import ddit.patient.vo.PatientNoticeVO;

/*
 * 환자포털 공지사항 Mapper
 */
@Mapper
public interface PatientNoticeMapper {

	// 공지사항 목록 조회
	public List<PatientNoticeVO> selectNoticeList(
			@Param("keyword") String keyword,
			@Param("category") String category,
			@Param("startRow") int startRow,
			@Param("endRow") int endRow);
	
	// 공지사항 전체 개수 조회
	public int selectNoticeCount(
			@Param("keyword") String keyword,
			@Param("category") String category);
	
	// 공지사항 조회수 증가
	public int updateNoticeViews(
			@Param("noticeNumber") Integer noticeNumber);
	
	// 공지사항 상세 조회
	public PatientNoticeVO selectNoticeDetail(
			@Param("noticeNumber") Integer noticeNumber);
	
	// 이전 공지사항 조회
	public PatientNoticeVO selectPrevNotice(
			@Param("noticeNumber") Integer noticeNumber);
	
	// 다음 공지사항 조회
	public PatientNoticeVO selectNextNotice(
			@Param("noticeNumber") Integer noticeNumber);
}