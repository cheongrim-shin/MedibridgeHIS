import axios from 'axios';
import type { DispensingOrderVO, DispensingDetailVO } from './dispensing.types';

const BASE = '/api/pharmacist/dispensing';

// 조제 대기 목록
export const getDispensingOrderList = async (): Promise<DispensingOrderVO[]> => {
    const res = await axios.get<DispensingOrderVO[]>(`${BASE}/orders`);
    return res.data;
};

// 조제 대기 상세
export const getDispensingOrderDetail = async (medicalNumber: string): Promise<DispensingDetailVO[]> => {
    const res = await axios.get<DispensingDetailVO[]>(`${BASE}/orders/${medicalNumber}`);
    return res.data;
};

// 조제 완료 처리 (진료번호 단위로 전체 완료)
export const completeDispensing = async (medicalNumber: string): Promise<void> => {
    await axios.put(`${BASE}/orders/${medicalNumber}/complete`);
};

// 조제 이력 목록
export const getDispensingHistoryList = async (): Promise<DispensingOrderVO[]> => {
    const res = await axios.get<DispensingOrderVO[]>(`${BASE}/history`);
    return res.data;
};

// 조제 이력 상세
export const getDispensingHistoryDetail = async (medicalNumber: string): Promise<DispensingDetailVO[]> => {
    const res = await axios.get<DispensingDetailVO[]>(`${BASE}/history/${medicalNumber}`);
    return res.data;
};