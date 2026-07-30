package ddit.receptionist.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import ddit.receptionist.vo.AppointmentCreateVO;
import ddit.receptionist.vo.AppointmentDoctorVO;
import ddit.receptionist.vo.AppointmentSearchVO;
import ddit.receptionist.vo.AppointmentVO;

@Mapper
public interface AppointmentMapper {

	//[예약] 담당의 목록
	public List<AppointmentDoctorVO> selectDoctors();
	
	//[예약] 기간 예약 목록
	public List<AppointmentVO> selectAppointments(AppointmentSearchVO searchVO);
	
	// 예약 상세
	public AppointmentVO selectAppointmentOne(String appointmentNumber);
	
	//슬롯 점유 확인
	int countSlot(@Param("memberNumber") String memberNumber,
		            @Param("doctorNumber") String doctorNumber,
		            @Param("reserveAt")    String reserveAt,      
		            @Param("excludeNo")    String excludeNo);
	
	// 예약 등록
	public int insertAppointment(AppointmentCreateVO createVO);
	
	// 예약 수정
	public int updateAppointment(AppointmentCreateVO createVO); 
	
	//예약 취소
	public int cancelAppointment(String appointmentNumber);
	
	//예약 - 접수 (확정 상태일 때만 접수완료)
	public int updateAppointmentReceived(String appointmentNumber);
	
	// 하루 지난 예약 자동 취소
	public int updateAutoCancelPastAppointments();
}
