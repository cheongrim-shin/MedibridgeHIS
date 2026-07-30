// ddit/admin/controller/AdminEmployeeController.java
package ddit.admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ddit.admin.service.AdminEmployeeService;
import ddit.admin.vo.AdminEmployeeDetailVO;
import ddit.admin.vo.AdminEmployeeListVO;
import ddit.member.dto.MemberSignupRequestDTO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/admin/employees")
public class AdminEmployeeController {

    @Autowired
    AdminEmployeeService adminEmployeeService;

    // 직원 목록 조회 (이름/사번 검색)
    @GetMapping
    public ResponseEntity<List<AdminEmployeeListVO>> getEmployees(
            @RequestParam(value = "keyword", required = false) String keyword) {
        log.info("getEmployees -> keyword : {}", keyword);
        List<AdminEmployeeListVO> employees = this.adminEmployeeService.getEmployees(keyword);
        return ResponseEntity.ok(employees);
    }

    // 직원 상세 조회
    @GetMapping("/{memberNumber}")
    public ResponseEntity<AdminEmployeeDetailVO> getEmployeeDetail(@PathVariable String memberNumber) {
        AdminEmployeeDetailVO detail = this.adminEmployeeService.getEmployeeDetail(memberNumber);
        return ResponseEntity.ok(detail);
    }

    // 계정 생성(모달) - 신규직원등록 버튼 → 관리자 권한 계정 생성용으로 사용
    @PostMapping
    public ResponseEntity<Void> registerEmployee(@RequestBody MemberSignupRequestDTO request) {
        this.adminEmployeeService.registerEmployee(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    public record EmployeeStatusUpdate(String accountStatus) {}

    // 재직/퇴직 처리 (accountStatus: Y-재직 / N-퇴직)
    @PatchMapping("/{memberNumber}")
    public ResponseEntity<Void> updateStatus(
            @PathVariable String memberNumber,
            @RequestBody EmployeeStatusUpdate body) {
        this.adminEmployeeService.changeAccountStatus(memberNumber, body.accountStatus());
        return ResponseEntity.noContent().build();
    }

}