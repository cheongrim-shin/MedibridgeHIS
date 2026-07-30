package ddit.receptionist.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ddit.receptionist.service.AppointmentAiService;
import ddit.receptionist.vo.AiParseRequestVO;
import ddit.receptionist.vo.AiParseResultVO;
import ddit.receptionist.vo.AiTextRequestVO;
import ddit.receptionist.vo.AiTextResultVO;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/receptionist/ai")
public class AiController {
	
	@Autowired
	AppointmentAiService appointmentAiService;

	// 자연어 -예약 항목
	@PostMapping("/parse-appointment")
	public ResponseEntity<AiParseResultVO> parseAppointment(@RequestBody @Valid AiParseRequestVO req){
		AiParseResultVO result = this.appointmentAiService.parseAppointment(req.getText());
		return ResponseEntity.ok(result);
	}
	
	// 증상 메모 정리 
    @PostMapping("/refine-symptoms")
    public ResponseEntity<AiTextResultVO> refineSymptoms(@RequestBody @Valid AiTextRequestVO req) {
        AiTextResultVO out = new AiTextResultVO();
        out.setResult(this.appointmentAiService.refineSymptoms(req.getText()));
        return ResponseEntity.ok(out);
    }
}
