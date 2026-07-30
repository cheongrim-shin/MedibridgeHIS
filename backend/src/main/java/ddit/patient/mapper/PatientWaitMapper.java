package ddit.patient.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import ddit.patient.vo.PatientWaitVO;

/*
 * PatientWaitMapper
 * 
 * 역할: 환자포털 대기현황 조회 SQL을 호출하는 Mapper
 * 
 * 현재 단계: SELECT 조회만 한다.
 */
@Mapper
public interface PatientWaitMapper {
	
	/*
	 * 대기현황 목록 조회
	 */
	public List<PatientWaitVO> selectWaitList();

}
