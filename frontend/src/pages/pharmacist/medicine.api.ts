import axios from 'axios';
import type { MedicineVO, MedicineListVO, MedicineCreateRequest } from './medicine.types';

const BASE = '/api/pharmacist/medicines';

export const COVERAGE_TO_LABEL: Record<string, string> = { Y: '급여', N: '비급여' };

export const getMedicines = async (): Promise<MedicineListVO[]> => {
    const res = await axios.get<MedicineListVO[]>(BASE);
    return res.data;
};

export const getMedicine = async (medicineCode: string): Promise<MedicineVO> => {
    const res = await axios.get<MedicineVO>(`${BASE}/${medicineCode}`);
    return res.data;
};

// 등록 - 서버가 채번한 medicineCode 포함해서 응답 (201 Created)
export const createMedicine = async (body: MedicineCreateRequest): Promise<MedicineVO> => {
    const res = await axios.post<MedicineVO>(BASE, body);
    return res.data;
};

export const updateMedicine = async (medicineCode: string, body: MedicineVO): Promise<void> => {
    await axios.put(`${BASE}/${medicineCode}`, body);
};

export const deleteMedicine = async (medicineCode: string): Promise<void> => {
    await axios.delete(`${BASE}/${medicineCode}`);
};

export const getLowStockMedicines = async (): Promise<MedicineListVO[]> => {
    const res = await axios.get<MedicineListVO[]>(`${BASE}/low-stock`);
    return res.data;
};