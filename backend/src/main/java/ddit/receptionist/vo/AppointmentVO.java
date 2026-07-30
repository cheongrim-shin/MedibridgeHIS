package ddit.receptionist.vo;

import lombok.Data;

@Data
public class AppointmentVO {

	private String appointmentNumber;
    private String memberNumber;
    private String patientName;
    private String phone;
    private String birthDate;        // 'YYMMDD' 
    private String doctorNumber;
    private String doctorName;
    private String reserveDate;     
    private String reserveTime;  
    private String startAt;
    private String endAt;
    private String status;           // 예약신청/예약확정
    private String symptoms;
    private String color;
}
