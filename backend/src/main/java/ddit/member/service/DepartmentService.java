package ddit.member.service;

import ddit.member.vo.DepartmentVO;

import java.util.List;

public interface DepartmentService
{
    // 부서 정보
    List<DepartmentVO> getAllDepartments();
}