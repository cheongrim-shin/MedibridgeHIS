package ddit.member.mapper;

import ddit.member.vo.DepartmentVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DepartmentMapper
{
    // 부서 정보
    List<DepartmentVO> selectAllDepartments();
}