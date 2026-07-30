package ddit.receptionist.service;

import java.util.List;

import ddit.receptionist.vo.AppointmentCreateVO;
import ddit.receptionist.vo.AppointmentDoctorVO;
import ddit.receptionist.vo.AppointmentSearchVO;
import ddit.receptionist.vo.AppointmentVO;

public interface AppointmentService {

	// 담당의 목록
	public List<AppointmentDoctorVO> getDoctors();
	
	//기간 예약 목록
	public List<AppointmentVO> getAppointments(AppointmentSearchVO searchVO);
	
	// 예약 상세
	public AppointmentVO getAppointment(String appointmentNumber);

	//예약 등록
	public String createAppointment(AppointmentCreateVO req);

	// 예약 변경
	public void changeAppointment(AppointmentCreateVO req);

	//예약취소
	public void cancel(String appointmentNumber);
	
	public String receiveAppointment(String appointmentNumber); 

}
