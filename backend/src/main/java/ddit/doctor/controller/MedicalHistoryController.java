package ddit.doctor.controller;

import ddit.doctor.service.AiSummaryService;
import ddit.doctor.service.DiagnosisApiService;
import ddit.doctor.service.MedicalRecordService;
import ddit.doctor.vo.*;
import jdk.jshell.Diag;
import lombok.RequiredArgsConstructor;
import org.eclipse.tags.shaded.org.apache.xpath.operations.Or;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/doctor")
public class MedicalHistoryController {

    private final MedicalRecordService medicalRecordService;

    private final AiSummaryService aiSummaryService;

    private final DiagnosisApiService diagnosisApiService;

    // 진료 이력 목록
    @GetMapping("/medical-history")
    public List<MedicalHistoryListVO> selectMedicalHistoryList(MedicalHistorySearchVO medicalHistorySearchVO) {
        return medicalRecordService.selectMedicalHistoryList(medicalHistorySearchVO);
    }

    // 진료 완료 처리 (SOAP 저장 + 진료기록 연결/생성 + 완료 처리)
    @PostMapping("/complete-treatment")
    public ResponseEntity<String> completeTreatment(@RequestBody SoapNoteUpdateRequestVO soapNoteUpdateRequestVO) {
        int result = medicalRecordService.completeTreatment(soapNoteUpdateRequestVO);

        if (result == 0) {
            return ResponseEntity.badRequest().body("해당 접수 정보를 찾을 수 없습니다.");
        }
        return ResponseEntity.ok("진료가 완료되었습니다.");
    }

    // 진료하기 - 환자호출 (호출중 -> 진료중)
    @PostMapping("/call-patient")
    public ResponseEntity<String> callPatientForTreatment(@RequestBody CallPatientRequestVO request) {
        int result = medicalRecordService.callPatientForTreatment(request.getMedicalNumber());

        if (result == 0) {
            return ResponseEntity.badRequest().body("호출 가능한 상태가 아닙니다.(대기실 호출 확인 필요)");
        }
        return ResponseEntity.ok("진료 호출 처리되었습니다.");
    }

    @GetMapping("/waiting-list")
    public List<WaitingListVO> selectWaitingList(@RequestParam(required = false) String doctorNumber) {
        return medicalRecordService.selectWaitingList(doctorNumber);
    }

    @GetMapping("/medical-record-options")
    public List<MedicalRecordOptionVO> selectMedicalRecordOptions(@RequestParam String medicalNumber) {
        return medicalRecordService.selectMedicalRecordOptions(medicalNumber);
    }

    @GetMapping("/medical-record-detail")
    public List<MedicalRecordDetailVO> selectMedicalRecordDetail(@RequestParam String medicalRecordNumber) {
        return medicalRecordService.selectMedicalRecordDetail(medicalRecordNumber);
    }

    @GetMapping("/patient-info")
    public PatientInfoVO selectPatientInfo(@RequestParam String medicalNumber) {
        return medicalRecordService.selectPatientInfo(medicalNumber);
    }

    @GetMapping("/medicine-search")
    public List<MedicineSearchVO> selectMedicineList(@RequestParam String keyword,
                                                     @RequestParam(required = false) String category) {
        return medicalRecordService.selectMedicineList(keyword, category);
    }

    @GetMapping("/physical-therapy-search")
    public List<PhysicalTherapyItemVO> selectPhysicalTherapyList(@RequestParam String keyword) {
        return medicalRecordService.selectPhysicalTherapyItemList(keyword);
    }

    @PostMapping("/save-orders")
    public ResponseEntity<String> saveOrders(@RequestBody OrderSaveRequestVO orderSaveRequestVO) {
        medicalRecordService.saveOrders(orderSaveRequestVO);
        return ResponseEntity.ok("오더가 저장되었습니다.");
    }

    @PostMapping("/create-medical-record")
    public ResponseEntity<String> createNewMedicalRecord(@RequestBody CreateMedicalRecordRequestVO createMedicalRecordRequestVO) {
        String newNumber = medicalRecordService.createNewMedicalRecord(createMedicalRecordRequestVO.getMedicalNumber(), createMedicalRecordRequestVO.getDiagnosisName());
        return ResponseEntity.ok(newNumber);
    }

    @PutMapping("/medical-record-detail")
    public ResponseEntity<String> updateMedicalRecordDetail(@RequestBody MedicalRecordDetailVO medicalRecordDetailVO) {
        int result = medicalRecordService.updateMedicalRecordDetail(medicalRecordDetailVO);
        if (result == 0) {
            return ResponseEntity.badRequest().body("수집할 진료기록을 찾을 수 없습니다.");
        }
        return ResponseEntity.ok("수정되었습니다.");
    }

    @PutMapping("/diagnosis-name")
    public ResponseEntity<String> updateDiagnosisName(@RequestBody DiagnosisNameUpdateRequestVO diagnosisNameUpdateRequestVO) {
        int result = medicalRecordService.updateDiagnosisName(diagnosisNameUpdateRequestVO.getMedicalRecordNumber(), diagnosisNameUpdateRequestVO.getDiagnosisName());
        if (result == 0) {
            return ResponseEntity.badRequest().body("해당 진료기록을 찾을 수 없습니다.");
        }
        return ResponseEntity.ok("진단명이 수정되었습니다.");
    }

    @GetMapping("/prescription-history")
    public List<PrescriptionHistoryVO> selectPrescriptionHistory(@RequestParam String medicalRecordNumber) {
        return medicalRecordService.selectPrescriptionHistory(medicalRecordNumber);
    }

    @PostMapping("/document-request")
    public ResponseEntity<String> saveDocumentRequest(@RequestBody DocumentRequestVO documentRequestVO) {
        int result = medicalRecordService.insertDocumentRequest(documentRequestVO);

        if (result == 0) {
            return ResponseEntity.badRequest().body("서류 발급 신청에 실패했습니다.");
        }
        return ResponseEntity.ok("서류 발급이 접수되었습니다.");
    }

    @PostMapping("/ai-summary")
    public ResponseEntity<AiSummaryResponseVO> summarize(@RequestBody AiSummaryRequestVO aiSummaryRequestVO) {
        String summary = aiSummaryService.summarize(aiSummaryRequestVO.getRecords());
        return ResponseEntity.ok(new AiSummaryResponseVO(summary));
    }

    @GetMapping("/diagnosis-search")
     public List<DiagnosisCodeVO> searchDiagnosis(@RequestParam String keyword) {
        return diagnosisApiService.searchByName(keyword);
    }

    // 요청 body를 받기 위한 간단한 DTO (기존에 비슷한 게 없으면 새로 만들어야 함)
// PrescriptionEditVO.java로 별도 파일 만들어도 되고, 여기 안에 내부 클래스로 둬도 됨

    @PutMapping("/prescription/{medicalNumber}/{medicineCode}")
    public ResponseEntity<Void> updateDoctorPrescription(
            @PathVariable String medicalNumber,
            @PathVariable String medicineCode,
            @RequestBody PrescriptionEditVO body) {
        boolean success = medicalRecordService.updateDoctorPrescription(
                medicalNumber, medicineCode, body.getQty(), body.getFrequency(), body.getDays());
        return success ? ResponseEntity.ok().build() : ResponseEntity.status(409).build();
        // 409 Conflict: "이미 조제완료 상태라서 수정 못 했어요"라는 의미로 씀
    }

    @DeleteMapping("/prescription/{medicalNumber}/{medicineCode}")
    public ResponseEntity<Void> deleteDoctorPrescription(
            @PathVariable String medicalNumber, @PathVariable String medicineCode) {
        boolean success = medicalRecordService.deleteDoctorPrescription(medicalNumber, medicineCode);
        return success ? ResponseEntity.ok().build() : ResponseEntity.status(409).build();
    }

    @PutMapping("/injection/{medicalNumber}/{medicineCode}")
    public ResponseEntity<Void> updateOutpatientInjection(
            @PathVariable String medicalNumber,
            @PathVariable String medicineCode,
            @RequestBody PrescriptionEditVO body) {
        boolean success = medicalRecordService.updateOutpatientInjection(
                medicalNumber, medicineCode, body.getQty(), body.getFrequency());
        return success ? ResponseEntity.ok().build() : ResponseEntity.status(409).build();
    }

    @DeleteMapping("/injection/{medicalNumber}/{medicineCode}")
    public ResponseEntity<Void> deleteOutpatientInjection(
            @PathVariable String medicalNumber, @PathVariable String medicineCode) {
        boolean success = medicalRecordService.deleteOutpatientInjection(medicalNumber, medicineCode);
        return success ? ResponseEntity.ok().build() : ResponseEntity.status(409).build();
    }

    @DeleteMapping("/physical-therapy-order/{treatmentNumber}")
    public ResponseEntity<Void> deletePhysicalTherapyOrder(@PathVariable Long treatmentNumber) {
        boolean success = medicalRecordService.deletePhysicalTherapyOrder(treatmentNumber);
        return success ? ResponseEntity.ok().build() : ResponseEntity.status(409).build();
    }


}