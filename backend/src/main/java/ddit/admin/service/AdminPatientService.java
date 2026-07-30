package ddit.admin.service;

import java.util.List;

import ddit.admin.vo.AdminPatientDetailVO;
import ddit.admin.vo.AdminPatientListVO;

public interface AdminPatientService {

	// 회원(환자) 목록
	public List<AdminPatientListVO> getPatients(String keyword);

	public AdminPatientDetailVO getPatientDetail(String memberNumber);

	public void changeAccountStatus(String memberNumber, String accountStatus);
}
