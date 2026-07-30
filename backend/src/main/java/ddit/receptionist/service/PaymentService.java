package ddit.receptionist.service;

import java.util.List;

import ddit.receptionist.vo.PaymentCreateVO;
import ddit.receptionist.vo.PaymentDetailVO;
import jakarta.validation.Valid;

public interface PaymentService {

	public Long createPayment(PaymentCreateVO reqVO);   // 생성된 수납번호 반환
	
	public Long completeReceiptPayment(PaymentCreateVO reqVO, String paymentId);

	public List<PaymentDetailVO> getPaymentHistoryList(String medicalNumber);

	public List<PaymentDetailVO> getChargeList(String medicalNumber);

	

}
