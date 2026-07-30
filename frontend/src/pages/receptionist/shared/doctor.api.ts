import axios from 'axios';

/** 담당의 목록 — BE AppointmentDoctorVO 미러링 (접수·예약 공용) */
export interface DoctorRow {
    doctorNumber: string;
    doctorName: string;
    deptName: string | null;
}

/** GET /api/receptionist/doctors */
export const fetchDoctors = async (): Promise<DoctorRow[]> => {
    try {
        const res = await axios.get<DoctorRow[]>('/api/receptionist/doctors');
        return res.data;
    } catch (err) {
        const msg = axios.isAxiosError<{ message?: string }>(err)
            ? (err.response?.data?.message ?? '담당의 목록을 불러오지 못했습니다.')
            : '알 수 없는 오류가 발생했습니다.';
        throw new Error(msg, { cause: err });
    }
};