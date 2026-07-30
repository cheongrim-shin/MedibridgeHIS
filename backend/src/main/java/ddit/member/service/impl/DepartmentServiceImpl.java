package ddit.member.service.impl;

import ddit.member.mapper.DepartmentMapper;
import ddit.member.service.DepartmentService;
import ddit.member.vo.DepartmentVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService
{
    private final DepartmentMapper departmentMapper;

    // 부서 정보
    @Override
    public List<DepartmentVO> getAllDepartments()
    {
        return departmentMapper.selectAllDepartments();
    }
}