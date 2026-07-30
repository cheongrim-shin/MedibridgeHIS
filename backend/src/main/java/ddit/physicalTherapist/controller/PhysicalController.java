package ddit.physicalTherapist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ddit.physicalTherapist.service.PhysicalService;
import ddit.physicalTherapist.vo.BedVO;
import ddit.physicalTherapist.vo.QueueRecordVO;
import ddit.physicalTherapist.vo.TherapyItemVO;
import ddit.physicalTherapist.vo.TherapyPatientDetailVO;
import ddit.physicalTherapist.vo.TherapyStartVO;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/physical")
public class PhysicalController {
	
	@Autowired
	PhysicalService physicalService;

	@GetMapping("/therapyItems")
	public List<TherapyItemVO> therapyItemList() {
		List<TherapyItemVO> list = this.physicalService.getTherapyItems();
		log.info("therapyItemList-list : {}", list);
		return list;
	}
	
	//항목 등록
	@PostMapping("/therapyItems")
	public ResponseEntity<TherapyItemVO> registerTherapyItem(@Valid @RequestBody TherapyItemVO itemVO) {
		log.info("registerTherapyItem - item : {}", itemVO);
		TherapyItemVO result = this.physicalService.registerTherapyItem(itemVO);
		return ResponseEntity.status(HttpStatus.CREATED).body(result);
	}
	
	//항목 수정
	@PutMapping("/therapyItem/{code}")
	public ResponseEntity<TherapyItemVO> modifyTherapyItem(
			@PathVariable String code,
			@Valid
			@RequestBody TherapyItemVO itemVO){
		log.info("modifyTherapyItem - code : {}, item : {}", code, itemVO);

	    this.physicalService.modifyTherapyItem(code, itemVO);
		return ResponseEntity.ok(itemVO);				
	}
	
	// 항목 삭제 Y ->N(논리삭제)
	@DeleteMapping("/therapyItem/{code}")
	public ResponseEntity<Void> removeTherapyItem(@PathVariable String code){
		 log.info("removeTherapyItem - code : {}", code);
	     this.physicalService.removeTherapyItem(code);
	     return ResponseEntity.noContent().build();
	}
	
	// 삭제 내역 조회
	@GetMapping("/therapyItems/deleted")
    public List<TherapyItemVO> deletedTherapyItemList() {
        List<TherapyItemVO> list = this.physicalService.getDeletedTherapyItems();
        log.info("deletedTherapyItemList - {}건", list.size());
        return list;
    }
	
	//치료항목 복원
	@PutMapping("/therapyItem/{code}/restore")
    public ResponseEntity<String> restoreTherapyItem(@PathVariable String code) {
        log.info("restoreTherapyItem - code : {}", code);
        this.physicalService.restoreTherapyItem(code);
        return ResponseEntity.ok("치료 항목이 성공적으로 복원되었습니다.");
    }
	
	//================= 대기열 ==================================
	// 베드 조회
	@GetMapping("/beds")
	public List<BedVO> bedList(){
		List<BedVO> beds = this.physicalService.selectBeds();
		log.info("bedList - beds : {}건", beds.size());
		return beds;
	}
	
	//대기열 조회
	@GetMapping("/queueList")
	public List<QueueRecordVO> queueList(){
		List<QueueRecordVO> list = this.physicalService.selectQueueList();
		log.info("queueList - list : {}건", list.size());
		return list;
	}
	
	// 치료 시작 
	@PostMapping("/therapy/start")
	public ResponseEntity<Void> startTherapy(@Valid @RequestBody TherapyStartVO req){
		log.info("Therapy - req: {}", req);
		this.physicalService.startTherapy(req);
		return ResponseEntity.ok().build();   // 본문 없이 200
	}
	
	// 베드 
	@PostMapping("/therapy/complete")
	public ResponseEntity<Void> completeTherapy(@Valid @RequestBody TherapyStartVO req) {
	    log.info("completeTherapy - req: {}", req);
	    this.physicalService.completeTherapy(req);
	    return ResponseEntity.ok().build();
	}
	
	@GetMapping("/therapy/patient/{medicalNumber}")
	public ResponseEntity<TherapyPatientDetailVO> patientDetail(
	        @PathVariable String medicalNumber,
	        @RequestParam(required = false) Long treatmentNumber) {
	    log.info("patientDetail - medicalNumber={}, treatmentNumber={}", medicalNumber, treatmentNumber);
	    TherapyPatientDetailVO detail = this.physicalService.getPatientDetail(medicalNumber, treatmentNumber);
	    return ResponseEntity.ok(detail);
	}
	
}
