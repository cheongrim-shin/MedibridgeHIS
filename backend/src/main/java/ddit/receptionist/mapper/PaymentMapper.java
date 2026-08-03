package ddit.receptionist.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import ddit.receptionist.vo.PaymentCreateVO;
import ddit.receptionist.vo.PaymentDetailVO;

@Mapper
public interface PaymentMapper {

	public int insertPayment(PaymentCreateVO vo);          // 실행 후 디테일vo.paymentNumber 채워짐
	
	public int insertPaymentHistory(PaymentDetailVO detail);
	
	public List<PaymentDetailVO> selectPaymentHistoryList(String medicalNumber);
	
	public int updateReceiptStatusPaid(String medicalNumber);

	/** 수납 가능 상태('수납대기')인지 사전 확인 — 카드 승인 전에 부른다 */
	public int countPayable(String medicalNumber);
	
	public List<PaymentDetailVO> selectChargeList(String medicalNumber);
	
}
