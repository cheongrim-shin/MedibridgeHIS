package ddit.receptionist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ddit.receptionist.service.DocumentService;
import ddit.receptionist.vo.DocumentRowVO;
import ddit.receptionist.vo.DocumentTypeVO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/receptionist")
public class DocumentController {

	@Autowired
	DocumentService documentService;
	
	@GetMapping("/types")
	public ResponseEntity<List<DocumentTypeVO>> types(){
		List<DocumentTypeVO> list = this.documentService.getDocumentTypes();
		return ResponseEntity.ok(list);
	}
	
	//목록검색
	@GetMapping("/documents")
	public ResponseEntity<List<DocumentRowVO>> list(@RequestParam(required = false) String keyword){
		List<DocumentRowVO> list = this.documentService.getDocumentList(keyword);
		return ResponseEntity.ok(list);
	}
	
	// 응답 전용 VO
	public record StateChangeRequest(@NotBlank(message = "상태값은 필수입니다.") String receiveState) {}
	//상태변경
	@PatchMapping("/documents/{receiveNumber}/state")
	public ResponseEntity<Void> changeState(@PathVariable Long receiveNumber, 
													@Valid @RequestBody StateChangeRequest body){
		this.documentService.changeState(receiveNumber, body.receiveState());
		return ResponseEntity.ok().build();
	}
	
	public record CompleteRequest(@NotBlank String paymentId) {}
	//포트원
	@PostMapping("/documents/{receiveNumber}/payment/complete")
	public ResponseEntity<Void> complete(@PathVariable Long receiveNumber, 
										 @Valid @RequestBody CompleteRequest body){
		this.documentService.completeDocumentPayment(receiveNumber, body.paymentId());
		return ResponseEntity.ok().build();
	}
	
	// 현금 수납 (결제창 없이)
	@PostMapping("/documents/{receiveNumber}/payment/cash")
	public ResponseEntity<Void> payByCash(@PathVariable Long receiveNumber) {
	    documentService.payDocumentByCash(receiveNumber);
	    return ResponseEntity.ok().build();
	}
	
}
