package ddit.receptionist.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ddit.common.PortOneClient;
import ddit.receptionist.mapper.DocumentMapper;
import ddit.receptionist.mapper.PaymentMapper;
import ddit.receptionist.vo.DocumentRowVO;
import ddit.receptionist.vo.DocumentTypeVO;
import ddit.receptionist.vo.PaymentCreateVO;
import ddit.receptionist.vo.PaymentDetailVO;
import ddit.receptionist.vo.PortOnePayment;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class DocumentServiceImpl implements DocumentService{

	@Autowired
	DocumentMapper documentMapper;
	
	@Autowired
	PaymentMapper paymentMapper;
	
	@Autowired
	PortOneClient portOneClient;

	@Override
	public List<DocumentTypeVO> getDocumentTypes() {
		return this.documentMapper.selectDocumentTypes();
	}

	@Override
	public List<DocumentRowVO> getDocumentList(String keyword) {
		return this.documentMapper.selectDocumentList(keyword);
	}

	@Override
	@Transactional
	public void changeState(Long receiveNumber, String target) {
		
		String fromState;
		if("수납완료".equals(target)) {
			fromState = "접수";
		}else if("발급완료".equals(target)) {
			DocumentRowVO doc = this.documentMapper.selectDocumentOne(receiveNumber);
			if(doc == null) throw new IllegalArgumentException("존재하지 않는 서류입니다.");
			Integer fee = doc.getUnitPrice();
			boolean isFree = (fee == null || fee == 0);
			fromState = isFree ? "접수" : "수납완료";
		}else {
	        throw new IllegalArgumentException("허용되지 않는 상태 전환입니다: " + target);
	    }
		
		log.debug("changeState -> :receive={}, target={}", receiveNumber, target);
		int update = this.documentMapper.updateDocumentState(receiveNumber, target, fromState);
		if(update == 0) {
			 throw new IllegalStateException("현재 상태에서 '" + target + "'로 변경할 수 없습니다.");
		}
	}

	@Override
	@Transactional
	public void completeDocumentPayment(Long receiveNumber, String paymentId) {
		// 서류 정보
		DocumentRowVO doc = this.documentMapper.selectDocumentOne(receiveNumber);
		if(doc == null)
			throw new IllegalArgumentException("존재하지 않는 서류");
		if(!"접수".equals(doc.getReceiveState()))
			throw new IllegalStateException("이미 수납된 서류");
		int expected = doc.getUnitPrice();
		
		// 포트원 단건 조회
		PortOnePayment pay = portOneClient.getPayment(paymentId);
		if(!"PAID".equals(pay.getStatus()))
			throw new IllegalStateException("결제가 완료되지 않았습니다: " +pay.getStatus());
		if (pay.getAmountTotal() != expected)         // 위변조 방지: 금액 일치
		    throw new IllegalStateException("결제금액 불일치");
		
		// 매출적재
		PaymentCreateVO p = new PaymentCreateVO();
		p.setMedicalNumber(doc.getMedicalNumber());
		p.setPaymentType("간편결제");
		p.setTotalAmount((long) expected);
		this.paymentMapper.insertPayment(p);
		
		PaymentDetailVO line = new PaymentDetailVO();
	    line.setPaymentNumber(p.getPaymentNumber());
	    line.setMedicalNumber(doc.getMedicalNumber());
	    line.setPaymentDetailName(doc.getDocumentType() + " 발급");
	    line.setAmount(String.valueOf(expected));
	    line.setLineNo(1);
	    paymentMapper.insertPaymentHistory(line);
	    
	    //서류상태 변경
	    this.documentMapper.updateDocumentState(receiveNumber, "수납완료","접수");
	    log.debug("수납 처리완료 -> 접수번호: {}, 결제ID: {},", receiveNumber, paymentId);
	}

	@Override
	public void payDocumentByCash(Long receiveNumber) {
		// 1) 서류 확인 (기대금액·상태)
	    DocumentRowVO doc = this.documentMapper.selectDocumentOne(receiveNumber);
	    if (doc == null) throw new IllegalArgumentException("존재하지 않는 서류");
	    if (!"접수".equals(doc.getReceiveState())) throw new IllegalStateException("이미 수납된 서류");
	    int expected = doc.getUnitPrice();

	    // 2) 매출 적재 (포트원 검증 없음 — 현금은 창구에서 직접 수납)
	    PaymentCreateVO p = new PaymentCreateVO();
	    p.setMedicalNumber(doc.getMedicalNumber());
	    p.setPaymentType("현금");
	    p.setTotalAmount((long) expected);
	    this.paymentMapper.insertPayment(p);

	    PaymentDetailVO line = new PaymentDetailVO();
	    line.setPaymentNumber(p.getPaymentNumber());
	    line.setMedicalNumber(doc.getMedicalNumber());
	    line.setPaymentDetailName(doc.getDocumentType() + " 발급");
	    line.setAmount(String.valueOf(expected));
	    line.setLineNo(1);
	    this.paymentMapper.insertPaymentHistory(line);

	    // 3) 서류 상태 '수납완료'
	    this.documentMapper.updateDocumentState(receiveNumber, "수납완료", "접수");
	    log.info("서류 현금수납 receiveNumber={}, amount={}", receiveNumber, expected);
		
	}
}
