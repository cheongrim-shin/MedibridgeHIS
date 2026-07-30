package ddit.pharmacist.mapper;

import ddit.pharmacist.vo.DispensingDetailVO;
import ddit.pharmacist.vo.DispensingOrderVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DispensingMapper
{
    // 조제 대기 목록 (DISPENSE_STATUS = '대기')
    List<DispensingOrderVO> selectDispensingOrderList();

    // 조제 대기 상세 - 약품 목록 (MEDICAL_NUMBER 기준)
    List<DispensingDetailVO> selectDispensingOrderDetail(String medicalNumber);

    // 조제 완료 처리 (DISPENSE_STATUS '대기' → '완료')
    int updateDispenseComplete(String medicalNumber);

    // 조제 완료 시 재고 차감 (updateDispenseComplete보다 먼저 호출해야 함)
    int decrementMedicineStock(String medicalNumber);

    // 조제 이력 목록 (DISPENSE_STATUS = '완료')
    List<DispensingOrderVO> selectDispensingHistoryList();

    // 조제 이력 상세 - 약품 목록 (MEDICAL_NUMBER 기준)
    List<DispensingDetailVO> selectDispensingHistoryDetail(String medicalNumber);
}
