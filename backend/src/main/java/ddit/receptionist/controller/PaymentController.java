package ddit.receptionist.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ddit.receptionist.service.PaymentService;
import ddit.receptionist.vo.PaymentCreateVO;
import ddit.receptionist.vo.PaymentDetailVO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/api/receptionist")
@RestController
public class PaymentController {
	
	@Autowired
	PaymentService paymentService;
	
	//수납(현금)
	@PostMapping("/payments")
	public ResponseEntity<?> createPayment(@RequestBody @Valid PaymentCreateVO reqVO){
		Long paymentNumber = this.paymentService.createPayment(reqVO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("paymentNumber", paymentNumber));
	}
	
	public record ReceiptPayComplete(
	    @Valid PaymentCreateVO payment, @NotBlank String paymentId) {}

	@PostMapping("/receipts/{medicalNumber}/payment/complete")
	public ResponseEntity<Map<String,Long>> complete(
			@PathVariable String medicalNumber,
	        @RequestBody @Valid PaymentCreateVO reqVO) {   // 또는 body에 paymentId 포함
	    Long no = paymentService.completeReceiptPayment(reqVO, reqVO.getPaymentId());
	    return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("paymentNumber", no));
	}
	
	@GetMapping("/payments/{medicalNumber}/history")
	public ResponseEntity<List<PaymentDetailVO>> paymentHistory(@PathVariable String medicalNumber) {
		List<PaymentDetailVO> list = this.paymentService.getPaymentHistoryList(medicalNumber);
	    return ResponseEntity.ok(list);
	}
	
	@GetMapping("/receipts/{medicalNumber}/charges")
	public ResponseEntity<List<PaymentDetailVO>> chargeList(@PathVariable String medicalNumber) {
		List<PaymentDetailVO> list = this.paymentService.getChargeList(medicalNumber);
	    return ResponseEntity.ok(list);
	}

}
