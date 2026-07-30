package ddit.outpatientNurse.service;

import ddit.outpatientNurse.mapper.InjectionOrderMapper;
import ddit.outpatientNurse.vo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InjectionOrderService {
    private final InjectionOrderMapper mapper;

    public List<InjectionListVO> selectInjectionList() {

        return mapper.selectInjectionList();
    }

    public List<InjectionDetailVO> selectInjectionDetail(String medicalNumber) {
        return mapper.selectInjectionDetail(medicalNumber);
    }

    public int completeInjection(String medicalNumber) {
        int result = mapper.completeInjection(medicalNumber);

        int pending = mapper.selectPendingOrderCount(medicalNumber);
        if (pending == 0) {
            mapper.updateReceiptStatusToPaymentPending(medicalNumber);
        }

        return result;
    }

    public List<InjectionHistoryListVO> selectInjectionHistoryList(InjectionHistorySearchVO  injectionHistorySearchVO) {
        return mapper.selectInjectionHistoryList(injectionHistorySearchVO);
    }

    public List<InjectionHistoryDetailVO> selectInjectionHistoryDetail(String medicalNumber) {
        return mapper.selectInjectionHistoryDetail(medicalNumber);
    }

    public List<OtherPrescriptionVO> selectOtherPrescriptionList(String medicalNumber) {
        return mapper.selectOtherPrescriptionList(medicalNumber);
    }

    public List<PhysicalTherapyOrderVO> selectPhysicalTherapyList(String medicalNumber) {
        return mapper.selectPhysicalTherapyList(medicalNumber);
    }
}
