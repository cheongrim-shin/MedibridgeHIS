package ddit.outpatientNurse.controller;

import ddit.outpatientNurse.service.InjectionOrderService;
import ddit.outpatientNurse.vo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RequestMapping("/api")
@RequiredArgsConstructor
@RestController
public class InjectionOrderController {

    private final InjectionOrderService service;

    @GetMapping("/injection-orders")
    public List<InjectionListVO> selectInjectionList() {
        return service.selectInjectionList();
    }

    @GetMapping("/injection-orders/{medicalNumber}")
    public List<InjectionDetailVO> selectInjectionDetail(@PathVariable("medicalNumber") String medicalNumber) {
        return service.selectInjectionDetail(medicalNumber);
    }

    @PatchMapping("/injection-orders/{medicalNumber}/complete")
    public ResponseEntity<Void> completeInjection(@PathVariable("medicalNumber") String medicalNumber) {
        int result = service.completeInjection(medicalNumber);
        return result > 0 ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }

    @GetMapping("/injection-history")
    public List<InjectionHistoryListVO> selectInjectionHistoryList(InjectionHistorySearchVO injectionHistorySearchVO) {
        return service.selectInjectionHistoryList(injectionHistorySearchVO);
    }

    @GetMapping("/injection-history/{medicalNumber}")
    public List<InjectionHistoryDetailVO> selectInjectionHistoryDetail(@PathVariable("medicalNumber") String medicalNumber) {
        return service.selectInjectionHistoryDetail(medicalNumber);
    }

    @GetMapping("/injection-orders/{medicalNumber}/other-prescriptions")
    public List<OtherPrescriptionVO> selectOtherPrescriptionList(@PathVariable("medicalNumber") String medicalNumber) {
        return service.selectOtherPrescriptionList(medicalNumber);
    }

    @GetMapping("/injection-orders/{medicalNumber}/physical-therapy")
    public List<PhysicalTherapyOrderVO> selectPhysicalTherapyList(@PathVariable("medicalNumber") String medicalNumber) {
        return service.selectPhysicalTherapyList(medicalNumber);
    }
}
