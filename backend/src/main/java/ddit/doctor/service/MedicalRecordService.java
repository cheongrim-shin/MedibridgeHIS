package ddit.doctor.service;

import ddit.doctor.mapper.MedicalRecordMapper;
import ddit.doctor.vo.*;
import org.eclipse.tags.shaded.org.apache.bcel.generic.PUSH;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Service
public class MedicalRecordService {

    @Autowired
    MedicalRecordMapper mapper;

    public String createMedicalRecord(String memberNumber, String diagnosisName) {
        Long seq = mapper.selectNextMedicalRecordSeq();
        String medicalRecordNumber = String.format("MR%04d", seq);

        MedicalRecordVO vo = MedicalRecordVO.builder()
                .medicalRecordNumber(medicalRecordNumber)
                .memberNumber(memberNumber)
                .diagnosisName(diagnosisName)
                .build();

        mapper.insertMedicalRecord(vo);
        return medicalRecordNumber;
    }

    public int completeTreatment(SoapNoteUpdateRequestVO request) {
        String medicalRecordNumber = request.getMedicalRecordNumber();

        // 진료기록 미선택 상태면 자동으로 진료기록 생성 (진단명 - 이번방문의 평가/진단 내용)
        if (medicalRecordNumber == null || medicalRecordNumber.isBlank()) {
            String memberNumber = mapper.selectMemberNumberByMedicalNumber(request.getMedicalNumber());

            Long seq = mapper.selectNextMedicalRecordSeq();
            medicalRecordNumber = String.format("MR%04d", seq);

            String rawDiagnosis = request.getRegisterA();
            String diagnosisName = (rawDiagnosis != null && rawDiagnosis.length() > 100)
                    ? rawDiagnosis.substring(0, 100) + "..."
                    : rawDiagnosis;

            MedicalRecordVO newRecord = MedicalRecordVO.builder()
                    .medicalRecordNumber(medicalRecordNumber)
                    .memberNumber(memberNumber)
                    .diagnosisName(diagnosisName)
                    .recordStatus("진행중")
                    .build();

            mapper.insertMedicalRecord(newRecord);
        }
        int result =  mapper.updateSoapNoteAndComplete(
                request.getMedicalNumber(),
                medicalRecordNumber,
                request.getRegisterS(),
                request.getRegisterO(),
                request.getRegisterA(),
                request.getRegisterP()
        );

        if (request.isTreatmentEnd()) {
            mapper.updateMedicalRecordStatusToDone(medicalRecordNumber);
        }

        checkAndUpdateToPaymentPending(request.getMedicalNumber());
        return result;
    }

    public List<MedicalHistoryListVO> selectMedicalHistoryList(MedicalHistorySearchVO medicalHistorySearchVO) {
        return mapper.selectMedicalHistoryList(medicalHistorySearchVO);
    }

    public int callPatientForTreatment(String medicalNumber) {
        return mapper.callPatientForTreatment(medicalNumber);
    }

    public List<WaitingListVO> selectWaitingList(String doctorNumber) {
        return mapper.selectWaitingList(doctorNumber);
    }

    // 파라미터로 medicalNumber(접수번호)를 받아서 내부적으로 memberNumber로 변환
    public List<MedicalRecordOptionVO> selectMedicalRecordOptions(String medicalNumber) {
        String memberNumber = mapper.selectMemberNumberByMedicalNumber(medicalNumber);
        return mapper.selectMedicalRecordOptions(memberNumber);
    }

    public List<MedicalRecordDetailVO> selectMedicalRecordDetail(String medicalRecordNumber) {
        return mapper.selectMedicalRecordDetail(medicalRecordNumber);
    }

    public PatientInfoVO selectPatientInfo(String medicalNumber) {
        return mapper.selectPatientInfo(medicalNumber);
    }

    public List<MedicineSearchVO> selectMedicineList(String keyword, String category) {
        return mapper.selectMedicineList(keyword == null ? "" : keyword, category);
    }

    public List<PhysicalTherapyItemVO> selectPhysicalTherapyItemList(String keyword) {
        return mapper.selectPhysicalTherapyItemList(keyword == null ? "" : keyword);
    }

    @Transactional
    public void saveOrders(OrderSaveRequestVO orderSaveRequestVO) {
        if (orderSaveRequestVO.getMedicines() != null) {
            for (var item : orderSaveRequestVO.getMedicines()) {
                mapper.insertDoctorPrescription(orderSaveRequestVO.getMedicalNumber(), item.getMedicineCode(),
                        item.getDosage(), item.getFrequency(), item.getDays());
            }
        }
        if (orderSaveRequestVO.getInjections() != null) {
            for (var item : orderSaveRequestVO.getInjections()) {
                mapper.insertOutpatientInjection(orderSaveRequestVO.getMedicalNumber(), item.getMedicineCode(),
                        item.getDosage(), item.getUnit(), item.getFrequency());
            }
        }
        if (orderSaveRequestVO.getTherapies() != null) {
            for (var item : orderSaveRequestVO.getTherapies()) {
                mapper.insertPhysicalTherapyOrder(orderSaveRequestVO.getMedicalNumber(), item.getCodeName1(), item.getCodeName2());
            }
        }

    }

    public String createNewMedicalRecord(String medicalNumber, String diagnosisName) {
        String memberNumber = mapper.selectMemberNumberByMedicalNumber(medicalNumber);

        Long seq = mapper.selectNextMedicalRecordSeq();
        String medicalRecordNumber = String.format("MR%04d", seq);

        MedicalRecordVO newRecord = MedicalRecordVO.builder()
                .medicalRecordNumber(medicalRecordNumber)
                .memberNumber(memberNumber)
                .diagnosisName(diagnosisName)
                .recordStatus("진행중")
                .build();

        mapper.insertMedicalRecord(newRecord);
        return medicalRecordNumber;
    }

    public int updateMedicalRecordDetail(MedicalRecordDetailVO medicalRecordDetailVO) {
        int result = mapper.updateMedicalRecordDetail(medicalRecordDetailVO);

        String medicalRecordNumber = mapper.selectMedicalRecordNumberByMedicalNumber(medicalRecordDetailVO.getMedicalNumber());
        if (medicalRecordNumber != null) {
            String currentDiagnosisName = mapper.selectDiagnosisNameByRecordNumber(medicalRecordNumber);

            // 진단명이 비어있던 기록일때만 방금 수정한 A값으로 자동 채움
            if (currentDiagnosisName == null || currentDiagnosisName.isBlank()) {
                String rawDiagnosis = medicalRecordDetailVO.getRegisterA();
                String diagnosisName = (rawDiagnosis != null && rawDiagnosis.length() > 100)
                        ? rawDiagnosis.substring(0, 100) + "..."
                        : rawDiagnosis;
                mapper.updateDiagnosisName(medicalRecordNumber, diagnosisName);
            }
        }
        return result;
    }

    public int updateDiagnosisName(String medicalRecordNumber, String diagnosisName) {
        return mapper.updateDiagnosisName(medicalRecordNumber, diagnosisName);
    }

    public List<PrescriptionHistoryVO> selectPrescriptionHistory(String medicalRecordNumber) {
        return mapper.selectPrescriptionHistory(medicalRecordNumber);
    }

    public int insertDocumentRequest(DocumentRequestVO documentRequestVO) {
        return mapper.insertDocumentRequest(documentRequestVO);
    }

    public int selectPendingOrderCount(String medicalNumber) {
        return mapper.selectPendingOrderCount(medicalNumber);
    }

    // 남은 오더 없으면 수납대기로 전환, 있으면 그대로 둠
    public void checkAndUpdateToPaymentPending(String medicalNumber) {
        int pending = mapper.selectPendingOrderCount(medicalNumber);
        if (pending == 0) {
            mapper.updateReceiptStatusToPaymentPending(medicalNumber);
        }
    }

    public boolean updateDoctorPrescription(String medicalNumber, String medicineCode, String qty, String frequency, String days) {
        return mapper.updateDoctorPrescription(medicalNumber, medicineCode, qty, frequency, days) > 0;
    }

    public boolean deleteDoctorPrescription(String medicalNumber, String medicineCode) {
        return mapper.deleteDoctorPrescription(medicalNumber, medicineCode) > 0;
    }

    public boolean updateOutpatientInjection(String medicalNumber, String medicineCode, String qty, String frequency) {
        return mapper.updateOutpatientInjection(medicalNumber, medicineCode, qty, frequency) > 0;
    }

    public boolean deleteOutpatientInjection(String medicalNumber, String medicineCode) {
        return mapper.deleteOutpatientInjection(medicalNumber, medicineCode) > 0;
    }

    public boolean deletePhysicalTherapyOrder(Long treatmentNumber) {
        return mapper.deletePhysicalTherapyOrder(treatmentNumber) > 0;
    }
}