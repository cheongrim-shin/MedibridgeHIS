package ddit.receptionist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ddit.receptionist.service.AppointmentService;
import ddit.receptionist.vo.AppointmentCreateVO;
import ddit.receptionist.vo.AppointmentDoctorVO;
import ddit.receptionist.vo.AppointmentSearchVO;
import ddit.receptionist.vo.AppointmentVO;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/receptionist")
public class AppointmentController {
	
	@Autowired
	AppointmentService appointmentService;
	
	//담당의 목록
	@GetMapping("/doctors")
	public ResponseEntity<List<AppointmentDoctorVO>> doctors(){
		List<AppointmentDoctorVO> list = this.appointmentService.getDoctors();
		return ResponseEntity.ok(list);
	}
	
	//기간 예약 목록
	@GetMapping("/appointments")
	public ResponseEntity<List<AppointmentVO>> getList(@Valid @ModelAttribute AppointmentSearchVO searchVO){
		List<AppointmentVO> list = this.appointmentService.getAppointments(searchVO);
		return ResponseEntity.ok(list);
	}
	
	//예약 상세
	@GetMapping("/appointments/{no}")
	public ResponseEntity<AppointmentVO> getOne(@PathVariable("no") String no) {
		return ResponseEntity.ok(this.appointmentService.getAppointment(no));
	}
	
	// 응답 전용
	public record CreateAppointmentResponse (String appointmentNumber) {}
	// 예약 등록
	@PostMapping("/appointments")
	public ResponseEntity<CreateAppointmentResponse > create(@Valid @RequestBody AppointmentCreateVO req){
		String no = this.appointmentService.createAppointment(req);
		return ResponseEntity.status(HttpStatus.CREATED).body(new CreateAppointmentResponse (no));
	}
	
	// 예약 수정
	@PutMapping("/appointments/{no}")
	public ResponseEntity<Void> change(@PathVariable("no") String no,
									   @Valid @RequestBody AppointmentCreateVO req){
		req.setAppointmentNumber(no);
		this.appointmentService.changeAppointment(req);
		return ResponseEntity.ok().build();
	}
	
	//예약 취소
	@PatchMapping("/appointments/{no}/cancel")
	public ResponseEntity<Void> cancel(@PathVariable("no") String no){
		this.appointmentService.cancel(no);
		return ResponseEntity.ok().build();
	}
	
	// 응답(요청) 전용
	public record ReceiveResponse(String medicalNumber) {}
	//예약 -> 접수 전환
	@PatchMapping("/appointments/{no}/receive")
	public ResponseEntity<ReceiveResponse> receive(@PathVariable("no") String no){
		String medicalNumber = this.appointmentService.receiveAppointment(no);
		return ResponseEntity.status(HttpStatus.CREATED).body(new ReceiveResponse(medicalNumber));
	}
	
}
