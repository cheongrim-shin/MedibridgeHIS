package ddit.admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import ddit.admin.vo.AdminNoticeVO;

/*
 * 관리자 공지사항 Mapper
 */
@Mapper
public interface AdminNoticeMapper {

	// 목록 조회
	public List<AdminNoticeVO> selectAdminNoticeList(
			@Param("keyword") String keyword,
			@Param("category") String category,
			@Param("startRow") int startRow,
			@Param("endRow") int endRow);

	// 전체 건수
	public int selectAdminNoticeCount(
			@Param("keyword") String keyword,
			@Param("category") String category);

	// 상세 조회
	public AdminNoticeVO selectAdminNoticeDetail(
			@Param("noticeNumber") Integer noticeNumber);

	// 등록
	public int insertAdminNotice(
			AdminNoticeVO adminNoticeVO);

	// 수정
	public int updateAdminNotice(
			AdminNoticeVO adminNoticeVO);

	// 삭제
	public int deleteAdminNotice(
			@Param("noticeNumber") Integer noticeNumber);
}