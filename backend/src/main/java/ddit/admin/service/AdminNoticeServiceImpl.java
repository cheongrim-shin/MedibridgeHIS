package ddit.admin.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ddit.admin.mapper.AdminNoticeMapper;
import ddit.admin.vo.AdminNoticeVO;

/*
 * 관리자 공지사항 Service 구현체
 */
@Service
public class AdminNoticeServiceImpl
		implements AdminNoticeService {

	private final AdminNoticeMapper adminNoticeMapper;

	public AdminNoticeServiceImpl(
			AdminNoticeMapper adminNoticeMapper) {

		this.adminNoticeMapper = adminNoticeMapper;
	}

	@Override
	public List<AdminNoticeVO> selectAdminNoticeList(
			String keyword,
			String category,
			int currentPage,
			int size) {

		if (currentPage < 1) {
			currentPage = 1;
		}

		if (size < 1) {
			size = 10;
		}

		if (size > 100) {
			size = 100;
		}

		int startRow =
				(currentPage - 1) * size + 1;

		int endRow =
				currentPage * size;

		return adminNoticeMapper.selectAdminNoticeList(
				keyword,
				category,
				startRow,
				endRow);
	}

	@Override
	public int selectAdminNoticeCount(
			String keyword,
			String category) {

		return adminNoticeMapper.selectAdminNoticeCount(
				keyword,
				category);
	}

	@Override
	public AdminNoticeVO selectAdminNoticeDetail(
			Integer noticeNumber) {

		if (noticeNumber == null) {
			return null;
		}

		return adminNoticeMapper.selectAdminNoticeDetail(
				noticeNumber);
	}

	@Override
	@Transactional
	public int insertAdminNotice(
			AdminNoticeVO adminNoticeVO) {

		validateNotice(adminNoticeVO);

		return adminNoticeMapper.insertAdminNotice(
				adminNoticeVO);
	}

	@Override
	@Transactional
	public int updateAdminNotice(
			AdminNoticeVO adminNoticeVO) {

		if (adminNoticeVO == null
				|| adminNoticeVO.getNoticeNumber() == null) {

			throw new IllegalArgumentException(
					"공지사항 번호가 없습니다.");
		}

		validateNotice(adminNoticeVO);

		return adminNoticeMapper.updateAdminNotice(
				adminNoticeVO);
	}

	@Override
	@Transactional
	public int deleteAdminNotice(
			Integer noticeNumber) {

		if (noticeNumber == null) {

			throw new IllegalArgumentException(
					"공지사항 번호가 없습니다.");
		}

		return adminNoticeMapper.deleteAdminNotice(
				noticeNumber);
	}

	private void validateNotice(
			AdminNoticeVO notice) {

		if (notice == null) {

			throw new IllegalArgumentException(
					"공지사항 정보가 없습니다.");
		}

		if (notice.getNoticeTitle() == null
				|| notice.getNoticeTitle().isBlank()) {

			throw new IllegalArgumentException(
					"공지사항 제목을 입력해 주세요.");
		}

		if (notice.getNoticeTitle().length() > 80) {

			throw new IllegalArgumentException(
					"공지사항 제목은 80자 이하로 입력해 주세요.");
		}

		if (notice.getNoticeContent() == null
				|| notice.getNoticeContent().isBlank()) {

			throw new IllegalArgumentException(
					"공지사항 내용을 입력해 주세요.");
		}

		if (notice.getNoticeCategory() == null
				|| notice.getNoticeCategory().isBlank()) {

			throw new IllegalArgumentException(
					"공지사항 카테고리를 입력해 주세요.");
		}

		if (notice.getNoticeCategory().length() > 50) {

			throw new IllegalArgumentException(
					"공지사항 카테고리는 50자 이하로 입력해 주세요.");
		}
	}
}