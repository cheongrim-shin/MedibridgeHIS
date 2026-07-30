package ddit.member.controller;

import ddit.member.service.DepartmentService;
import ddit.member.vo.DepartmentVO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
@RequiredArgsConstructor
public class DepartmentController
{
    private final DepartmentService departmentService;

    @GetMapping
    public ResponseEntity<List<DepartmentVO>> getAllDepartments()
    {
        return ResponseEntity.ok(departmentService.getAllDepartments());
    }
}