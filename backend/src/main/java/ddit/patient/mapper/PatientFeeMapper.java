package ddit.patient.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import ddit.patient.vo.PatientFeeVO;

/*
 * PatientFeeMapper
 * 
 * 역할: 환자포탈 비급여 항목 조회 SQL을 호출하는 Mapper
 * 
 * 현재 단계: SELECT 조회만 한다.
 */
@Mapper
public interface PatientFeeMapper {
	
	/*
	 * 비급여 항목 목록 조회
	 * 
	 * category:
	 * all  전체
	 * imaging  영상검사
	 * rehabilitation  물리치료/재활치료
	 */
	public List<PatientFeeVO> selectNonCoveredFeeList(
			@Param("category")String category,
			@Param("keyword")String keyword);

}
