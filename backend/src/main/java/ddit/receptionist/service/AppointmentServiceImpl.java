package ddit.receptionist.service;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ddit.receptionist.mapper.AppointmentMapper;
import ddit.receptionist.mapper.ReceiptMapper;
import ddit.receptionist.vo.AppointmentCreateVO;
import ddit.receptionist.vo.AppointmentDoctorVO;
import ddit.receptionist.vo.AppointmentSearchVO;
import ddit.receptionist.vo.AppointmentVO;
import ddit.receptionist.vo.ReceiptCreateVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class AppointmentServiceImpl implements AppointmentService{
	
	@Autowired
	AppointmentMapper appointmentMapper;
	@Autowired
	ReceiptMapper receiptMapper;
	@Autowired
	ReceiptService receiptService;

	private static final DateTimeFormatter RESERVE_AT_FMT =
			DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
	
	// ── 진료 시간 정책 (업무 규칙)
	// 이 값들이 FE의 AM_SLOTS / PM_SLOTS 와 반드시 일치해야 한다.
	private static final LocalTime AM_OPEN  = LocalTime.of(9, 0);
	private static final LocalTime AM_CLOSE = LocalTime.of(12, 0);
	private static final LocalTime PM_OPEN  = LocalTime.of(14, 0);
	private static final LocalTime PM_CLOSE = LocalTime.of(18, 0);
	/** 슬롯 단위(분) — 09:00, 09:30 … 처럼 30분 격자에만 예약 가능 */
	private static final int SLOT_UNIT_MINUTES = 30;
	
	// 진료실 번호(상수)
	private static final Map<String, String> DOCTOR_ROOM = Map.of(
			"M01-01", "1",   // 김원장
		    "M01-09", "2",   // 임의사
		    "M01-11", "3"    
			);
	
	@Override
	public List<AppointmentDoctorVO> getDoctors() {
		return this.appointmentMapper.selectDoctors();
	}

	@Override
	public List<AppointmentVO> getAppointments(AppointmentSearchVO searchVO) {
		if (searchVO.getFromDate().compareTo(searchVO.getToDate()) > 0) {
			throw new IllegalArgumentException("조회 시작일이 종료일보다 늦을 수 없습니다.");
		}
		return this.appointmentMapper.selectAppointments(searchVO);
	}
	
	@Override
	public AppointmentVO getAppointment(String appointmentNumber) {
		AppointmentVO vo = this.appointmentMapper.selectAppointmentOne(appointmentNumber);
		if (vo == null) {
			throw new IllegalArgumentException("존재하지 않는 예약입니다: " + appointmentNumber);
		}
		return vo;
	}

	// 예약 등록
	@Override
	@Transactional
	public String createAppointment(AppointmentCreateVO req) {
		// [1] 예약 일시가 실제로 존재하고, 진료 정책에 맞는 시각인지 검증
		LocalDateTime reserveAt = parseAndValidateReserveAt(req.getReserveAt());

		// [2] 과거 시각 예약 차단 — 등록에만 적용한다
		//     (변경은 이미 지난 예약의 증상 수정 등이 있을 수 있어 별도 판단)
		if (reserveAt.isBefore(LocalDateTime.now())) {
			throw new IllegalArgumentException("지난 시각에는 예약할 수 없습니다.");
		}

		// [3] 슬롯 중복 확인 — 신규이므로 제외할 예약번호가 없다(null)
		int occupied = this.appointmentMapper.countSlot(
				req.getMemberNumber(), req.getDoctorNumber(), req.getReserveAt(), null);
		if (occupied > 0) {
			throw new IllegalStateException("이미 이 의사에게 예약이 있습니다. 기존 예약을 수정하거나 취소해 주세요.");
		}
		try {
			this.appointmentMapper.insertAppointment(req);
		} catch (DuplicateKeyException e) {
			throw new IllegalStateException("방금 다른 직원이 같은 시간을 예약했습니다. 새로고침 후 다시 시도해 주세요.");
		}
		return req.getAppointmentNumber();
	}

	@Override
	@Transactional
	public void changeAppointment(AppointmentCreateVO req) {
		if (req.getAppointmentNumber() == null || req.getAppointmentNumber().isBlank()) {
			throw new IllegalArgumentException("변경할 예약번호가 없습니다.");
		}
		parseAndValidateReserveAt(req.getReserveAt());
		int occupied = this.appointmentMapper.countSlot(
				req.getMemberNumber(), req.getDoctorNumber(), req.getReserveAt(), req.getAppointmentNumber());
		if(occupied > 0) {
			throw new IllegalStateException("이미 예약된 시간입니다.");
		}
		int rows;
		try {
			rows = this.appointmentMapper.updateAppointment(req);
		} catch (DuplicateKeyException e) {
			throw new IllegalStateException("방금 다른 직원이 같은 시간을 예약했습니다. 새로고침 후 다시 시도해 주세요.");
		}
		if (rows == 0) {
			throw new IllegalStateException("변경할 수 없는 예약입니다(존재하지 않거나 취소됨).");
		}
		
	}

	@Override
	@Transactional
	public void cancel(String appointmentNumber) {
		if (appointmentNumber == null || appointmentNumber.isBlank()) {
			throw new IllegalArgumentException("예약번호가 없습니다.");
		}
		if (this.appointmentMapper.cancelAppointment(appointmentNumber) == 0) {
			throw new IllegalStateException("이미 취소되었거나 존재하지 않는 예약입니다.");
		}
	}
	
	//내부 검증 헬퍼
	private LocalDateTime parseAndValidateReserveAt(String reserveAtStr) {

		// [1] 실제 존재하는 일시인가
		LocalDateTime dt;
		try {
			dt = LocalDateTime.parse(reserveAtStr, RESERVE_AT_FMT);
		} catch (DateTimeParseException e) {
			throw new IllegalArgumentException("존재하지 않는 날짜/시각입니다: " + reserveAtStr);
		}

		// [2] 일요일 휴진
		if (dt.getDayOfWeek() == DayOfWeek.SUNDAY) {
			throw new IllegalArgumentException("일요일은 휴진입니다.");
		}

		LocalTime time = dt.toLocalTime();

		// [3] 30분 격자 검증
		//     FE 버튼으로는 09:17 을 만들 수 없지만, API를 직접 호출하면 가능하다.
		//     "화면에서 막았으니 됐다"는 서버 검증을 생략할 이유가 되지 않는다.
		if (time.getMinute() % SLOT_UNIT_MINUTES != 0 || time.getSecond() != 0) {
			throw new IllegalArgumentException(
					SLOT_UNIT_MINUTES + "분 단위로만 예약할 수 있습니다.");
		}

		// [4] 진료 시간대 검증 — 오전 구간 또는 오후 구간에 속해야 한다
		boolean inAm = !time.isBefore(AM_OPEN) && time.isBefore(AM_CLOSE);
		boolean inPm = !time.isBefore(PM_OPEN) && time.isBefore(PM_CLOSE);
		if (!inAm && !inPm) {
			throw new IllegalArgumentException(
					String.format("진료 시간이 아닙니다. (오전 %s~%s / 오후 %s~%s)",
							AM_OPEN, AM_CLOSE, PM_OPEN, PM_CLOSE));
		}

		return dt;
	}

	@Override
	@Transactional
	public String receiveAppointment(String appointmentNumber) {
		AppointmentVO appt = this.appointmentMapper.selectAppointmentOne(appointmentNumber);
		if(appt == null) {
			throw new IllegalArgumentException("존재하지 않는 예약입니다: " + appointmentNumber);
		}
		//예약 상태 전환 먼저
		int moved = this.appointmentMapper.updateAppointmentReceived(appointmentNumber);
		if(moved == 0) {
			throw new IllegalStateException("이미 접수되었거나 확정 상태가 아닌 예약입니다.");
		}
		// 기존환자접수
		ReceiptCreateVO receipt = new ReceiptCreateVO();
		receipt.setMemberNumber(appt.getMemberNumber());
		receipt.setDoctorNumber(appt.getDoctorNumber());
		receipt.setSpaceNumber(DOCTOR_ROOM.get(appt.getDoctorNumber()));
		receipt.setSymptoms(appt.getSymptoms());
		String medicalNumber = this.receiptService.createReceipt(receipt);
		
		return medicalNumber;
	}
	
	// 매일 자정(00:00:)에 실행되어 하루 지난 예약을 자동 취소
	@Scheduled(cron ="0 0 0 * * *")
	@Transactional
	public void autoCancelPastAppointments() {
		int canceledCount = this.appointmentMapper.updateAutoCancelPastAppointments();
		log.info("기간 경과 자동 취소 스케줄러 실행. 취소된 예약 건: {}", canceledCount);
	}
}
