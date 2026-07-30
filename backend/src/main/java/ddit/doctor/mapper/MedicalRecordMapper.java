package ddit.doctor.mapper;

import ddit.doctor.vo.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MedicalRecordMapper {
    Long selectNextMedicalRecordSeq();
    int insertMedicalRecord(MedicalRecordVO medicalRecordVO);

    List<MedicalHistoryListVO> selectMedicalHistoryList(MedicalHistorySearchVO searchVO);

    String selectMemberNumberByMedicalNumber(String medicalNumber);

    int updateSoapNoteAndComplete (
            @Param("medicalNumber") String medicalNumber,
            @Param("medicalRecordNumber") String medicalRecordNumber,
            @Param("registerS") String registerS,
            @Param("registerO") String registerO,
            @Param("registerA") String registerA,
            @Param("registerP") String registerP
    );

    int callPatientForTreatment(String medicalNumber);

    List<WaitingListVO> selectWaitingList(@Param("doctorNumber") String doctorNumber);
    List<MedicalRecordOptionVO> selectMedicalRecordOptions(@Param("memberNumber") String memberNumber);
    List<MedicalRecordDetailVO> selectMedicalRecordDetail(@Param("medicalRecordNumber") String medicalRecordNumber);

    PatientInfoVO selectPatientInfo(String medicalNumber);

    List<MedicineSearchVO> selectMedicineList(@Param("keyword") String keyword, @Param("category") String category);

    List<PhysicalTherapyItemVO> selectPhysicalTherapyItemList(String keyword);

    int insertDoctorPrescription(String medicalNumber, String medicineCode, String dosage, String frequency, String days);

    int insertPhysicalTherapyOrder(String medicalNumber, String treatmentItemName, String therapyType);

    int updateMedicalRecordDetail(MedicalRecordDetailVO medicalRecordDetailVO);

    String selectMedicalRecordNumberByMedicalNumber(String medicalNumber);

    String selectDiagnosisNameByRecordNumber(String medicalRecordNumber);

    int updateDiagnosisName(String medicalRecordNumber, String diagnosisName);

    void insertOutpatientInjection(String medicalNumber, String medicineCode, String dosage, String unit, String frequency);

    List<PrescriptionHistoryVO> selectPrescriptionHistory(String medicalRecordNumber);

    int insertDocumentRequest(DocumentRequestVO documentRequestVO);

    int selectPendingOrderCount(String medicalNumber);

    void updateReceiptStatusToPaymentPending(String medicalNumber);

    int updateMedicalRecordStatusToDone(String medicalRecordNumber);

    int updateDoctorPrescription(@Param("medicalNumber") String medicalNumber,
                                 @Param("medicineCode") String medicineCode,
                                 @Param("qty") String qty,
                                 @Param("frequency") String frequency,
                                 @Param("days") String days);

    int deleteDoctorPrescription(@Param("medicalNumber") String medicalNumber,
                                 @Param("medicineCode") String medicineCode);

    int updateOutpatientInjection(@Param("medicalNumber") String medicalNumber,
                                  @Param("medicineCode") String medicineCode,
                                  @Param("qty") String qty,
                                  @Param("frequency") String frequency);

    int deleteOutpatientInjection(@Param("medicalNumber") String medicalNumber,
                                  @Param("medicineCode") String medicineCode);

    int deletePhysicalTherapyOrder(@Param("treatmentNumber") Long treatmentNumber);
}
