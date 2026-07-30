package ddit.admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ddit.admin.service.AdminPatientService;
import ddit.admin.vo.AdminPatientDetailVO;
import ddit.admin.vo.AdminPatientListVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/admin")
public class AdminPatientController {

	@Autowired
	AdminPatientService adminPatientService;
	
	//회원 목록 조회
	@GetMapping("/patients")
	public ResponseEntity<List<AdminPatientListVO>> getPatients(
			@RequestParam(value = "keyword", required = false) String keyword){
		log.info("getPatients-> keyword : {}", keyword);
		List<AdminPatientListVO> patients = this.adminPatientService.getPatients(keyword);
		return ResponseEntity.ok(patients);
	}
	
	//상세 조회
	@GetMapping("/patients/{memberNumber}")
	public ResponseEntity<AdminPatientDetailVO> getPatientDetail(@PathVariable String memberNumber){
		AdminPatientDetailVO detail = this.adminPatientService.getPatientDetail(memberNumber);
		return ResponseEntity.ok(detail);
	}
	
	public record PatientStatusUpdate(String accountStatus) {}
	//사용여부 수정 Y- N
	@PatchMapping("/patients/{memberNumber}")
	public ResponseEntity<Void> updateStatus(
			@PathVariable String memberNumber,
			@RequestBody PatientStatusUpdate body){
		this.adminPatientService.changeAccountStatus(memberNumber, body.accountStatus);
		return ResponseEntity.noContent().build();
	}
	
	
}
