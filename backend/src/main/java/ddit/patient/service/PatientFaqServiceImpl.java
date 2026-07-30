package ddit.patient.service;

import java.util.List;

import org.springframework.stereotype.Service;

import ddit.patient.mapper.PatientFaqMapper;
import ddit.patient.vo.PatientFaqVO;
import lombok.RequiredArgsConstructor;

/*
 * 환자포털 FAQ ServiceImpl
 *
 * 역할:
 * Controller와 Mapper 사이에서 FAQ 조회 흐름을 처리한다.
 */
@Service
@RequiredArgsConstructor
public class PatientFaqServiceImpl implements PatientFaqService {

	private final PatientFaqMapper patientFaqMapper;

	@Override
	public List<PatientFaqVO> selectFaqList() {

		// FAQ 전체 목록 조회
		return patientFaqMapper.selectFaqList();
	}

	@Override
	public PatientFaqVO selectFaqDetail(Integer faqNumber) {

		// FAQ 상세 조회
		return patientFaqMapper.selectFaqDetail(faqNumber);
	}

	@Override
	public List<PatientFaqVO> selectFaqList(String keyword, int startRow, int endRow) {

		// 검색 조건과 페이징 범위를 Mapper로 전달
		return patientFaqMapper.selectFaqListByPaging(keyword, startRow, endRow);
	}

	@Override
	public int selectFaqCount(String keyword) {

		// 검색 조건에 맞는 전체 FAQ 개수 조회
		return patientFaqMapper.selectFaqCount(keyword);
	}
}