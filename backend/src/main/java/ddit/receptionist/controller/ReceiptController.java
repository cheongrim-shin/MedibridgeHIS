package ddit.receptionist.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ddit.receptionist.service.ReceiptService;
import ddit.receptionist.vo.OrderStatusVO;
import ddit.receptionist.vo.PatientVO;
import ddit.receptionist.vo.ReceiptCreateVO;
import ddit.receptionist.vo.ReceiptDetailVO;
import ddit.receptionist.vo.ReceiptHistoryVO;
import ddit.receptionist.vo.ReceiptRowVO;
import ddit.receptionist.vo.ReceiptSearchVO;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/receptionist")
public class ReceiptController {

	@Autowired
	ReceiptService receiptService;
	
	@GetMapping("/receipts")
	public ResponseEntity<List<ReceiptRowVO>> receiptList(@ModelAttribute ReceiptSearchVO searchVO){
		log.debug("receiptList -> search : {}", searchVO);
		List<ReceiptRowVO> list = this.receiptService.getReceiptList(searchVO);
		return ResponseEntity.ok(list);
	}
	
	// 환자 검색
	@GetMapping("/patients")
	public ResponseEntity<List<PatientVO>> searchPatients(@RequestParam(required = false) String keyword){
		if(keyword ==null || keyword.trim().length() < 2) {
			return ResponseEntity.ok(List.of());
		}
		List<PatientVO> keywordList = this.receiptService.searchPatients(keyword.trim());
		return ResponseEntity.ok(keywordList);
	}
	
	// 응답 전용 VO — record라 한 줄. 필요한 것(생성된 접수번호)만 내보냄
	public record CreateReceiptResponse(String medicalNumber) {}
	// 접수 등록
	@PostMapping("/receipts")
	public ResponseEntity<CreateReceiptResponse> createReceipt(@Valid @RequestBody ReceiptCreateVO reqVO){
		log.info("createReceipt - memberNumber: {}, 신규환자 여부: {}",
	            reqVO.getMemberNumber(), reqVO.getNewPatient() != null);
		String medicalNumber = this.receiptService.createReceipt(reqVO);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(new CreateReceiptResponse(medicalNumber));
	}
	
	//상세 정보
	@GetMapping("/receipts/{medicalNumber}")
	public ResponseEntity<ReceiptDetailVO> getReceiptDetail(@PathVariable String medicalNumber){
		ReceiptDetailVO detail = this.receiptService.getReceiptDetail(medicalNumber);
		return ResponseEntity.ok(detail);
	}
	
	//진료이력 조회
	@GetMapping("/patients/{memberNumber}/receipts")
	public ResponseEntity<List<ReceiptHistoryVO>> getReceiptHistory(@PathVariable String memberNumber) {
		List<ReceiptHistoryVO> list = this.receiptService.getReceiptHistory(memberNumber);
	    return ResponseEntity.ok(list);
	}
	
	@GetMapping("/receipts/counts")
	public ResponseEntity<Map<String, Integer>> receiptCounts(
	        @RequestParam(required = false) String fromDate,
	        @RequestParam(required = false) String toDate) {
	    return ResponseEntity.ok(receiptService.getReceiptCounts(fromDate, toDate));
	}
	
	//각부서별 치료상태 확인
	@GetMapping("/receipts/{medicalNumber}/orders")
	public ResponseEntity<List<OrderStatusVO>> patientOrders(@PathVariable String medicalNumber){
		List<OrderStatusVO> cnt = this.receiptService.getPatientOrders(medicalNumber);
		return ResponseEntity.ok(cnt);
	}
	
}
