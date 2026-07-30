package ddit.receptionist.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ddit.common.PortOneClient;
import ddit.receptionist.mapper.PaymentMapper;
import ddit.receptionist.vo.PaymentCreateVO;
import ddit.receptionist.vo.PaymentDetailVO;
import ddit.receptionist.vo.PortOnePayment;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class PaymentServiceImpl implements PaymentService{
	
	@Autowired
	PaymentMapper paymentMapper;
	
	@Autowired
	PortOneClient portOneClient;

	//수납 (현금결제)
	@Override
	@Transactional
	public Long createPayment(PaymentCreateVO reqVO) {
		List<PaymentDetailVO> details = reqVO.getDetails();
		
		// 검증 항목 유무는 @NotEmpty가 잡지만, 금액 형식/합계는 여기서
        long total = 0L;
        for (PaymentDetailVO d : details) {  //디테일 리스트를 돌며 호출
            long amt;
            try {
                amt = Long.parseLong(d.getAmount().trim());   //문자열 금액 -> 넘버
            } catch (NumberFormatException e) {
                throw new IllegalArgumentException("금액은 숫자여야 합니다: " + d.getPaymentDetailName());
            }
            if (amt < 0) throw new IllegalArgumentException("금액은 0 이상이어야 합니다.");
            total += amt;
        }
        reqVO.setTotalAmount(total);   // 마스터 총액 = 서버 계산값       
        
        this.paymentMapper.insertPayment(reqVO);
        Long paymentNumber = reqVO.getPaymentNumber();
        
        //  for문 인덱스 i가 곧 라인번호
        for (int i = 0; i < details.size(); i++) {
            PaymentDetailVO d = details.get(i);
            d.setPaymentNumber(paymentNumber);
            d.setMedicalNumber(reqVO.getMedicalNumber());
            d.setLineNo(i + 1);                        // 1, 2, 3, ...
            this.paymentMapper.insertPaymentHistory(d);
        }
      
        int updated = this.paymentMapper.updateReceiptStatusPaid(reqVO.getMedicalNumber());
        if(updated ==0) {
        	throw new IllegalStateException(
                "수납 처리할 수 없는 상태입니다(이미 수납되었거나 진료가 끝나지 않음): " + reqVO.getMedicalNumber());
        }
        log.info("수납 마스터 PN={}, MN={} 총액={}", paymentNumber, reqVO.getMedicalNumber(), total);
        return paymentNumber;   // 컨트롤러가 응답으로 반환
	}
	
	//수납 포트원(카드)
	@Override
	@Transactional
	public Long completeReceiptPayment(PaymentCreateVO reqVO, String paymentId) {
	    // 서버가 합계 재계산 
	    long total = 0L;
	    for (PaymentDetailVO d : reqVO.getDetails()) {
	        long amt = Long.parseLong(d.getAmount().trim());
	        if (amt < 0) throw new IllegalArgumentException("금액은 0 이상이어야 합니다.");
	        total += amt;
	    }

	    // 포트원 검증 — status=PAID && 결제금액 == 합계
	    PortOnePayment pay = portOneClient.getPayment(paymentId);
	    if (!"PAID".equals(pay.getStatus()))
	        throw new IllegalStateException("결제가 완료되지 않았습니다: " + pay.getStatus());
	    if (pay.getAmountTotal() != total)
	        throw new IllegalStateException("결제금액 불일치");   // 위변조 차단

	    // 적재
	    reqVO.setTotalAmount(total);
	    this.paymentMapper.insertPayment(reqVO);
	    Long paymentNumber = reqVO.getPaymentNumber();
	    List<PaymentDetailVO> details = reqVO.getDetails();
	    for (int i = 0; i < details.size(); i++) {
	        PaymentDetailVO d = details.get(i);
	        d.setPaymentNumber(paymentNumber);
	        d.setMedicalNumber(reqVO.getMedicalNumber());
	        d.setLineNo(i + 1);
	        this.paymentMapper.insertPaymentHistory(d);
	    }
	    int updated = this.paymentMapper.updateReceiptStatusPaid(reqVO.getMedicalNumber());
	    if (updated == 0) throw new IllegalStateException("수납 처리할 수 없는 상태입니다.");
	    return paymentNumber;
	}
	
	public List<PaymentDetailVO> getChargeList(String medicalNumber) {
	    return this.paymentMapper.selectChargeList(medicalNumber);
	}
	
	public List<PaymentDetailVO> getPaymentHistoryList(String medicalNumber) {
	    return this.paymentMapper.selectPaymentHistoryList(medicalNumber);
	}

}
