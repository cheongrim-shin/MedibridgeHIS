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
        long total = calcTotal(details);
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
	    long total = calcTotal(reqVO.getDetails());

	    // 수납 가능 상태인지 먼저 확인한다.
	    // 이 확인을 뒤로 미루면 "카드는 승인됐는데 DB는 롤백"되는 구간이 넓어진다.
	    if (this.paymentMapper.countPayable(reqVO.getMedicalNumber()) == 0) {
	        throw new IllegalStateException(
	            "수납 처리할 수 없는 상태입니다(이미 수납되었거나 진료가 끝나지 않음): " + reqVO.getMedicalNumber());
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
	    if (updated == 0) {
	        // 사전 확인을 통과했는데도 여기 걸렸다 = 그 사이 다른 창구가 먼저 수납했다.
	        // 카드 승인은 외부에 이미 남아 있고 DB만 롤백되므로 수동 환불 대상이다.
	        // 나중에 찾을 수 있도록 paymentId 를 error 로그에 반드시 남긴다.
	        log.error("[수동환불필요] 카드 승인 후 수납 전환 실패. paymentId={}, medicalNumber={}, 총액={}",
	                paymentId, reqVO.getMedicalNumber(), total);
	        throw new IllegalStateException(
	            "수납 처리 중 충돌이 발생했습니다. 결제 취소가 필요하니 관리자에게 문의해 주세요.");
	    }
	    log.info("카드수납 완료 PN={}, MN={}, paymentId={}, 총액={}",
	            paymentNumber, reqVO.getMedicalNumber(), paymentId, total);
	    return paymentNumber;
	}

	/** 상세 금액 문자열 → 총액. 등록·카드수납 두 곳에서 같은 규칙을 써야 하므로 한 곳에 둔다. */
	private long calcTotal(List<PaymentDetailVO> details) {
	    long total = 0L;
	    for (PaymentDetailVO d : details) {
	        long amt;
	        try {
	            amt = Long.parseLong(d.getAmount().trim());   // 문자열 금액 → 숫자
	        } catch (NumberFormatException e) {
	            throw new IllegalArgumentException("금액은 숫자여야 합니다: " + d.getPaymentDetailName());
	        }
	        if (amt < 0) throw new IllegalArgumentException("금액은 0 이상이어야 합니다.");
	        total += amt;
	    }
	    return total;
	}

	public List<PaymentDetailVO> getChargeList(String medicalNumber) {
	    return this.paymentMapper.selectChargeList(medicalNumber);
	}
	
	public List<PaymentDetailVO> getPaymentHistoryList(String medicalNumber) {
	    return this.paymentMapper.selectPaymentHistoryList(medicalNumber);
	}

}
