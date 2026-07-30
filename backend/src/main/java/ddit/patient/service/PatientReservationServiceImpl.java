package ddit.patient.service;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ddit.patient.mapper.PatientReservationMapper;
import ddit.patient.vo.PatientDoctorOptionVO;
import ddit.patient.vo.PatientReservationVO;

@Service
public class PatientReservationServiceImpl
		implements PatientReservationService {

	private static final String CONFIRMED_STATUS =
			"예약확정";

	private final PatientReservationMapper patientReservationMapper;

	public PatientReservationServiceImpl(
			PatientReservationMapper patientReservationMapper) {

		this.patientReservationMapper =
				patientReservationMapper;
	}

	private void validateMemberNumber(
			String memberNumber) {

		if (memberNumber == null
				|| memberNumber.isBlank()) {

			throw new IllegalArgumentException(
					"로그인 사용자 정보가 없습니다."
			);
		}
	}

	private void validateAppointmentNumber(
			String appointmentNumber) {

		if (appointmentNumber == null
				|| appointmentNumber.isBlank()) {

			throw new IllegalArgumentException(
					"예약번호가 없습니다."
			);
		}
	}

	private void validateDepartmentCode(
			String deptCode) {

		if (deptCode == null
				|| deptCode.isBlank()) {

			throw new IllegalArgumentException(
					"진료과를 선택해 주세요."
			);
		}
	}

	private void validateConfirmedStatus(
			String status,
			String action) {

		if (!CONFIRMED_STATUS.equals(status)) {

			throw new IllegalStateException(
					"예약확정 상태에서만 예약을 "
					+ action
					+ "할 수 있습니다."
			);
		}
	}

	@Override
	public List<PatientReservationVO> selectReservationList(
			String memberNumber) {

		validateMemberNumber(memberNumber);

		return patientReservationMapper
				.selectReservationList(memberNumber);
	}

	@Override
	public PatientReservationVO selectReservationDetail(
			String appointmentNumber,
			String memberNumber) {

		validateAppointmentNumber(
				appointmentNumber);

		validateMemberNumber(memberNumber);

		return patientReservationMapper
				.selectReservationDetail(
						appointmentNumber,
						memberNumber
				);
	}

	@Override
	public List<PatientReservationVO> selectDepartmentList() {

		return patientReservationMapper
				.selectDepartmentList();
	}

	@Override
	public List<PatientReservationVO> selectDoctorList() {

		return patientReservationMapper
				.selectDoctorList();
	}

	@Override
	public List<PatientDoctorOptionVO>
			selectDoctorListByDepartment(
					String deptCode) {

		validateDepartmentCode(deptCode);

		return patientReservationMapper
				.selectDoctorListByDepartment(
						deptCode.trim()
				);
	}

	@Override
	@Transactional
	public int insertReservation(
			PatientReservationVO reservation) {

		if (reservation == null) {

			throw new IllegalArgumentException(
					"예약 정보가 없습니다."
			);
		}

		validateMemberNumber(
				reservation.getMemberNumber());

		validateDepartmentCode(
				reservation.getDeptCode());

		if (reservation.getEmployeeCode() == null
				|| reservation
						.getEmployeeCode()
						.isBlank()) {

			throw new IllegalArgumentException(
					"의료진을 선택해 주세요."
			);
		}

		int validDoctorCount =
				patientReservationMapper
						.countValidDoctor(
								reservation
						);

		if (validDoctorCount != 1) {

			throw new IllegalArgumentException(
					"선택한 진료과의 의료진 정보가 올바르지 않습니다."
			);
		}

		if (reservation.getReservedAt() == null) {

			throw new IllegalArgumentException(
					"예약 날짜와 시간을 선택해 주세요."
			);
		}

		if (reservation
				.getReservedAt()
				.before(new Date())) {

			throw new IllegalArgumentException(
					"지난 날짜와 시간으로 예약할 수 없습니다."
			);
		}

		int duplicateCount =
				patientReservationMapper
						.countDuplicateReservationTime(
								reservation
						);

		if (duplicateCount > 0) {

			throw new IllegalStateException(
					"이미 예약된 시간입니다."
			);
		}

		int result =
				patientReservationMapper
						.insertReservation(
								reservation
						);

		if (result != 1) {

			throw new IllegalStateException(
					"예약 확정에 실패했습니다."
			);
		}

		return result;
	}

	@Override
	@Transactional
	public int updateReservationTime(
			String appointmentNumber,
			String memberNumber,
			Date reservedAt) {

		validateAppointmentNumber(
				appointmentNumber);

		validateMemberNumber(memberNumber);

		if (reservedAt == null) {

			throw new IllegalArgumentException(
					"변경할 예약 날짜와 시간을 선택해 주세요."
			);
		}

		if (reservedAt.before(new Date())) {

			throw new IllegalArgumentException(
					"지난 날짜와 시간으로 변경할 수 없습니다."
			);
		}

		PatientReservationVO origin =
				patientReservationMapper
						.selectReservationDetail(
								appointmentNumber,
								memberNumber
						);

		if (origin == null) {

			throw new IllegalArgumentException(
					"변경할 예약 정보를 찾을 수 없습니다."
			);
		}

		validateConfirmedStatus(
				origin.getReservationsStatus(),
				"변경"
		);

		PatientReservationVO changeReservation =
				new PatientReservationVO();

		changeReservation.setAppointmentNumber(
				appointmentNumber);

		changeReservation.setMemberNumber(
				memberNumber);

		changeReservation.setEmployeeCode(
				origin.getEmployeeCode());

		changeReservation.setReservedAt(
				reservedAt);

		int duplicateCount =
				patientReservationMapper
						.countDuplicateReservationTime(
								changeReservation
						);

		if (duplicateCount > 0) {

			throw new IllegalStateException(
					"이미 예약된 시간입니다."
			);
		}

		int result =
				patientReservationMapper
						.updateReservationTime(
								changeReservation
						);

		if (result != 1) {

			throw new IllegalStateException(
					"현재 상태에서는 예약을 변경할 수 없습니다."
			);
		}

		return result;
	}

	@Override
	@Transactional
	public int cancelReservation(
			String appointmentNumber,
			String memberNumber) {

		validateAppointmentNumber(
				appointmentNumber);

		validateMemberNumber(memberNumber);

		PatientReservationVO reservation =
				patientReservationMapper
						.selectReservationDetail(
								appointmentNumber,
								memberNumber
						);

		if (reservation == null) {
			return 0;
		}

		validateConfirmedStatus(
				reservation.getReservationsStatus(),
				"취소"
		);

		int result =
				patientReservationMapper
						.cancelReservation(
								appointmentNumber,
								memberNumber
						);

		if (result != 1) {

			throw new IllegalStateException(
					"예약 취소 처리에 실패했습니다."
			);
		}

		return result;
	}
}