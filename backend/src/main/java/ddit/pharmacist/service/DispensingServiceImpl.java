package ddit.pharmacist.service;

import ddit.pharmacist.mapper.DispensingMapper;
import ddit.pharmacist.vo.DispensingDetailVO;
import ddit.pharmacist.vo.DispensingOrderVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DispensingServiceImpl implements DispensingService
{
    @Autowired
    DispensingMapper dispensingMapper;

    // 생성자
    public DispensingServiceImpl(DispensingMapper dispensingMapper)
    {
        this.dispensingMapper = dispensingMapper;
    }

    // 조제 대기 목록 (PRESCRIPTION_STATUS = '대기')
    @Override
    public List<DispensingOrderVO> readDispensingOrderList()
    {
        return dispensingMapper.selectDispensingOrderList();
    }

    // 조제 대기 상세 - MEDICAL_NUMBER 기준 약품 목록
    @Override
    public List<DispensingDetailVO> readDispensingOrderDetail(String medicalNumber)
    {
        List<DispensingDetailVO> detail = dispensingMapper.selectDispensingOrderDetail(medicalNumber);

        // 대기 상태인 처방이 없으면 잘못된 진료번호로 간주
        if (detail == null || detail.isEmpty())
            throw new IllegalArgumentException("해당 진료번호의 조제 대기 처방이 없습니다: " + medicalNumber);

        return detail;
    }

    // 조제 완료 처리 - 해당 진료번호의 모든 약품을 한번에 '완료'로 전환
    @Override
    @Transactional
    public void completeDispensing(String medicalNumber)
    {
        // 존재 여부 확인 (이미 완료됐거나 없는 진료번호 제외)
        List<DispensingDetailVO> detail = dispensingMapper.selectDispensingOrderDetail(medicalNumber);

        if (detail == null || detail.isEmpty())
            throw new IllegalArgumentException("해당 진료번호의 조제 대기 처방이 없습니다: " + medicalNumber);

        // 재고가 처방수량보다 부족하면 처방완료 막음(일부만 차감되는 것 방지)
        List<String> insufficient = detail.stream()
                .filter(d -> d.getCurrentQuantity() < d.getTotalQty())
                .map(d -> String.format("%s(재고 %d개, 필요 %d개)", d.getMedicineName(), d.getCurrentQuantity(), d.getTotalQty()))
                .collect(Collectors.toList());

        if (!insufficient.isEmpty())
            throw new IllegalStateException("재고가 부족하여 조제 완료할 수 없습니다: " + String.join(", ", insufficient));


        // 완료 처리 전에 재고부터 차감 (PRESCRIPTION_STATUS가 'N'인 상태에서 조회해야 하므로 순서 중요)
        dispensingMapper.decrementMedicineStock(medicalNumber);

        // WHERE 절에 PRESCRIPTION_STATUS = '대기' 조건 있어서 중복 완료 처리는 자동 차단됨
        int result = dispensingMapper.updateDispenseComplete(medicalNumber);

        if (result == 0)
            throw new IllegalArgumentException("조제 완료 처리에 실패했습니다: " + medicalNumber);
    }

    // 조제 이력 목록 (PRESCRIPTION_STATUS = '완료')
    @Override
    public List<DispensingOrderVO> readDispensingHistoryList()
    {
        return dispensingMapper.selectDispensingHistoryList();
    }

    // 조제 이력 상세 - MEDICAL_NUMBER 기준 약품 목록
    @Override
    public List<DispensingDetailVO> readDispensingHistoryDetail(String medicalNumber)
    {
        List<DispensingDetailVO> detail = dispensingMapper.selectDispensingHistoryDetail(medicalNumber);

        if (detail == null || detail.isEmpty())
            throw new IllegalArgumentException("해당 진료번호의 조제 이력이 없습니다: " + medicalNumber);

        return detail;
    }
}
