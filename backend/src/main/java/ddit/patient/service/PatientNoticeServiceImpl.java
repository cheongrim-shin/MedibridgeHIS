package ddit.patient.service;

import java.util.List;

import org.springframework.stereotype.Service;

import ddit.patient.mapper.PatientNoticeMapper;
import ddit.patient.vo.PatientNoticeVO;

/*
 * 환자포털 공지사항 Service 구현체
 */
@Service
public class PatientNoticeServiceImpl implements PatientNoticeService {
	
	private final PatientNoticeMapper patientNoticeMapper;

	public PatientNoticeServiceImpl(PatientNoticeMapper patientNoticeMapper) {
		this.patientNoticeMapper = patientNoticeMapper;
	}
	
	/*
	 * 메인 최근공지용
	 * 검색어 기준으로 최근 5개만 조회한다.
	 */
	@Override
	public List<PatientNoticeVO> selectNoticeList(String keyword) {
		return patientNoticeMapper.selectNoticeList(keyword, null, 1, 5);
	}
	
	/*
	 * 공지사항 목록 페이징 조회
	 */
	@Override
	public List<PatientNoticeVO> selectNoticeList(String keyword, String category, int currentPage, int size) {
		
		if (currentPage < 1) {
			currentPage = 1;
		}
		
		if (size < 1) {
			size = 10;
		}
		
		int startRow = (currentPage - 1) * size + 1;
		int endRow = currentPage * size;
		
		return patientNoticeMapper.selectNoticeList(keyword, category, startRow, endRow);
	}

	/*
	 * 공지사항 전체 개수 조회
	 */
	@Override
	public int selectNoticeCount(String keyword, String category) {
		return patientNoticeMapper.selectNoticeCount(keyword, category);
	}

	/*
	 * 공지사항 상세 조회
	 */
	@Override
	public PatientNoticeVO selectNoticeDetail(Integer noticeNumber) {
		return patientNoticeMapper.selectNoticeDetail(noticeNumber);
	}
	
	/*
	 * 이전 공지사항 조회
	 */
	@Override
	public PatientNoticeVO selectPrevNotice(Integer noticeNumber) {
		return patientNoticeMapper.selectPrevNotice(noticeNumber);
	}
	
	/*
	 * 다음 공지사항 조회
	 */
	@Override
	public PatientNoticeVO selectNextNotice(Integer noticeNumber) {
		return patientNoticeMapper.selectNextNotice(noticeNumber);
	}

	/*
	 * 공지사항 조회수 증가
	 */
	@Override
	public int increaseNoticeViews(Integer noticeNumber) {
		
		if(noticeNumber == null) {
			return 0;
		}
		
		return patientNoticeMapper.updateNoticeViews(noticeNumber);
	}
}