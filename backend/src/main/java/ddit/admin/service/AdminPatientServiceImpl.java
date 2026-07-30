package ddit.admin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ddit.admin.mapper.AdminMapper;
import ddit.admin.vo.AdminPatientDetailVO;
import ddit.admin.vo.AdminPatientListVO;

@Service
public class AdminPatientServiceImpl implements AdminPatientService{

	@Autowired
	AdminMapper adminMapper;

	@Override
	public List<AdminPatientListVO> getPatients(String keyword) {
		String normalized = (keyword == null || keyword.isBlank()) ? null : keyword.trim();
		List<AdminPatientListVO> list = this.adminMapper.selectPatientList(keyword);
		return list;
	}

	@Override
	public AdminPatientDetailVO getPatientDetail(String memberNumber) {
		AdminPatientDetailVO detail = this.adminMapper.selectPatientDetail(memberNumber);
		if(detail == null) {
			throw new IllegalArgumentException("존재하지 않는 환자입니다.");
		}
		return detail;
	}

	@Override
	public void changeAccountStatus(String memberNumber, String accountStatus) {
		if(!"Y".equals(accountStatus) && !"N".equals(accountStatus)) {
			throw new IllegalArgumentException("사용여부 값이 올바르지 않습니다. ");
		}
		int updated = this.adminMapper.updateAccountStatus(memberNumber, accountStatus);
		if(updated == 0) {
			throw new IllegalArgumentException("존재하지 않는 환자입니다.");
		}
	}
	
}
