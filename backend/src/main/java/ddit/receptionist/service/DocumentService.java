package ddit.receptionist.service;

import java.util.List;

import ddit.receptionist.vo.DocumentRowVO;
import ddit.receptionist.vo.DocumentTypeVO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

public interface DocumentService {

	public List<DocumentTypeVO> getDocumentTypes();

	//목록 검색
	public List<DocumentRowVO> getDocumentList(String keyword);

	public void changeState(Long receiveNumber, String receiveState);

	public void completeDocumentPayment(Long receiveNumber, String paymentId);

	public void payDocumentByCash(Long receiveNumber);


}