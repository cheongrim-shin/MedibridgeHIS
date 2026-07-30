package ddit.patient.service;

import java.util.List;

import ddit.patient.vo.PatientNoticeVO;

/*
 * 환자포털 공지사항 Service
 */
public interface PatientNoticeService {
	
	// 메인 최근공지용 목록 조회
	public List<PatientNoticeVO> selectNoticeList(String keyword);
	
	// 공지사항 목록 페이징 조회
	public List<PatientNoticeVO> selectNoticeList(
			String keyword,
			String category,
			int currentPage,
			int size);
	
	// 공지사항 전체 개수 조회
	public int selectNoticeCount(String keyword, String category);
	
	// 공지사항 조회수 증가
	public int increaseNoticeViews(Integer noticeNumber);
	
	// 공지사항 상세 조회
	public PatientNoticeVO selectNoticeDetail(Integer noticeNumber);

	// 이전 공지사항 조회
	public PatientNoticeVO selectPrevNotice(Integer noticeNumber);
	
	// 다음 공지사항 조회
	public PatientNoticeVO selectNextNotice(Integer noticeNumber);
}