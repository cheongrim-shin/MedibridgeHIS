package ddit.outpatientNurse.mapper;

import ddit.outpatientNurse.vo.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface InjectionOrderMapper {
    public List<InjectionListVO> selectInjectionList();
    public List<InjectionDetailVO> selectInjectionDetail(String medicalNumber);

    int completeInjection(String medicalNumber);
    List<InjectionHistoryListVO>selectInjectionHistoryList(InjectionHistorySearchVO injectionHistorySearchVO);
    List<InjectionHistoryDetailVO> selectInjectionHistoryDetail(String medicalNumber);

    List<OtherPrescriptionVO> selectOtherPrescriptionList(String medicalNumber);
    List<PhysicalTherapyOrderVO> selectPhysicalTherapyList(String medicalNumber);

    int selectPendingOrderCount(String medicalNumber);

    void updateReceiptStatusToPaymentPending(String medicalNumber);
}
