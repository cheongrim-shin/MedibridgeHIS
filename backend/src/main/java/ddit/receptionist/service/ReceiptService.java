package ddit.receptionist.service;

import java.util.List;
import java.util.Map;

import ddit.receptionist.vo.OrderStatusVO;
import ddit.receptionist.vo.PatientVO;
import ddit.receptionist.vo.ReceiptCreateVO;
import ddit.receptionist.vo.ReceiptDetailVO;
import ddit.receptionist.vo.ReceiptHistoryVO;
import ddit.receptionist.vo.ReceiptRowVO;
import ddit.receptionist.vo.ReceiptSearchVO;

public interface ReceiptService {

	public List<ReceiptRowVO> getReceiptList(ReceiptSearchVO searchVO);

	public List<PatientVO> searchPatients(String keyword);

	public String createReceipt(ReceiptCreateVO reqVO);

	public ReceiptDetailVO getReceiptDetail(String medicalNumber);
	
	public List<ReceiptHistoryVO> getReceiptHistory(String memberNumber);
	
	public Map<String, Integer> getReceiptCounts(String fromDate, String toDate);

	public List<OrderStatusVO> getPatientOrders(String medicalNumber);


}
