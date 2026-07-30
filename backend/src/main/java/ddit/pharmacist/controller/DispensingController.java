package ddit.pharmacist.controller;

import ddit.pharmacist.service.DispensingService;
import ddit.pharmacist.vo.DispensingDetailVO;
import ddit.pharmacist.vo.DispensingOrderVO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pharmacist/dispensing")
public class DispensingController
{
    private final DispensingService dispensingService;

    // 생성자
    public DispensingController(DispensingService dispensingService)
    {
        this.dispensingService = dispensingService;
    }

    // 조제 대기 목록
    @GetMapping("/orders")
    public ResponseEntity<List<DispensingOrderVO>> readDispensingOrderList()
    {
        return ResponseEntity.ok(dispensingService.readDispensingOrderList());
    }

    // 조제 대기 상세
    @GetMapping("/orders/{medicalNumber}")
    public ResponseEntity<List<DispensingDetailVO>> readDispensingOrderDetail(
            @PathVariable String medicalNumber)
    {
        return ResponseEntity.ok(dispensingService.readDispensingOrderDetail(medicalNumber));
    }

    // 조제 완료 처리
    @PutMapping("/orders/{medicalNumber}/complete")
    public ResponseEntity<Void> completeDispensing(
            @PathVariable String medicalNumber)
    {
        dispensingService.completeDispensing(medicalNumber);
        return ResponseEntity.ok().build();
    }

    // 조제 이력 목록
    @GetMapping("/history")
    public ResponseEntity<List<DispensingOrderVO>> readDispensingHistoryList()
    {
        return ResponseEntity.ok(dispensingService.readDispensingHistoryList());
    }

    // 조제 이력 상세
    @GetMapping("/history/{medicalNumber}")
    public ResponseEntity<List<DispensingDetailVO>> readDispensingHistoryDetail(
            @PathVariable String medicalNumber)
    {
        return ResponseEntity.ok(dispensingService.readDispensingHistoryDetail(medicalNumber));
    }
}