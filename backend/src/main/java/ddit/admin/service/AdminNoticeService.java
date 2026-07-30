package ddit.admin.service;

import java.util.List;

import ddit.admin.vo.AdminNoticeVO;

/*
 * 관리자 공지사항 Service
 */
public interface AdminNoticeService {

	public List<AdminNoticeVO> selectAdminNoticeList(
			String keyword,
			String category,
			int currentPage,
			int size);

	public int selectAdminNoticeCount(
			String keyword,
			String category);

	public AdminNoticeVO selectAdminNoticeDetail(
			Integer noticeNumber);

	public int insertAdminNotice(
			AdminNoticeVO adminNoticeVO);

	public int updateAdminNotice(
			AdminNoticeVO adminNoticeVO);

	public int deleteAdminNotice(
			Integer noticeNumber);
}