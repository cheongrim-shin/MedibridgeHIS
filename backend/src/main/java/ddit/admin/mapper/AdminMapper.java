package ddit.admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import ddit.admin.vo.AdminPatientDetailVO;
import ddit.admin.vo.AdminPatientListVO;

@Mapper
public interface AdminMapper {

	public List<AdminPatientListVO> selectPatientList(String keyword);

	public AdminPatientDetailVO selectPatientDetail(String memberNumber);

	public int updateAccountStatus(String memberNumber, String accountStatus);
	
	
}
