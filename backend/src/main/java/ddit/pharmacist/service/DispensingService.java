package ddit.pharmacist.service;

import ddit.pharmacist.vo.DispensingDetailVO;
import ddit.pharmacist.vo.DispensingOrderVO;

import java.util.List;

public interface DispensingService
{
    // 조제 대기 목록
    List<DispensingOrderVO> readDispensingOrderList();

    // 조제 대기 상세
    List<DispensingDetailVO> readDispensingOrderDetail(String medicalNumber);

    // 조제 완료 처리
    void completeDispensing(String medicalNumber);

    // 조제 이력 목록
    List<DispensingOrderVO> readDispensingHistoryList();

    // 조제 이력 상세
    List<DispensingDetailVO> readDispensingHistoryDetail(String medicalNumber);
}
