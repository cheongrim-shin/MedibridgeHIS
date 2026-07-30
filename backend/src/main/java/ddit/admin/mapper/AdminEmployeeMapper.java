package ddit.admin.mapper;

import ddit.admin.vo.AdminEmployeeDetailVO;
import ddit.admin.vo.AdminEmployeeListVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AdminEmployeeMapper
{
    List<AdminEmployeeListVO> selectEmployeeList(String keyword);

    AdminEmployeeDetailVO selectEmployeeDetail(String memberNumber);

    int updateAccountStatus(String memberNumber, String accountStatus);
}
