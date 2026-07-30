package ddit.receptionist.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import ddit.receptionist.vo.OrderStatusVO;
import ddit.receptionist.vo.PatientVO;
import ddit.receptionist.vo.ReceiptCreateVO;
import ddit.receptionist.vo.ReceiptDetailVO;
import ddit.receptionist.vo.ReceiptHistoryVO;
import ddit.receptionist.vo.ReceiptRowVO;
import ddit.receptionist.vo.ReceiptSearchVO;

@Mapper
public interface ReceiptMapper {

	public List<ReceiptRowVO> selectReceiptList(ReceiptSearchVO searchVO);

	public List<String> selectRrnsByPrefix(String prefix);

	public void insertPatient(PatientVO newPatient);

	public void insertReceipt(ReceiptCreateVO reqVO);

	public List<PatientVO> selectPatients(String keyword);
	
	public ReceiptDetailVO selectReceiptDetail(String medicalNumber);
	
	public List<ReceiptHistoryVO> selectReceiptHistoryByMember(String memberNumber);
	
	public List<Map<String, Object>> selectReceiptCounts(String fromDate, String toDate);

	public List<OrderStatusVO> selectPatientOrders(String medicalNumber);
	
	public int countOpenReceipt(@Param("memberNumber") String memberNumber, 
								@Param("doctorNumber") String doctorNumber);
	
}
