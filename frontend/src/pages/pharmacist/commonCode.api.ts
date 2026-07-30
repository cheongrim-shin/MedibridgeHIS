import axios from 'axios';
import type { CommonCodeVO, MedicineCodeGroup } from './commonCode.types';

const BASE = '/api/commoncode';

// 그룹별 공통코드 목록 조회 (드롭다운 옵션용)
export const getCommonCodeList = async (group: MedicineCodeGroup): Promise<CommonCodeVO[]> => {
    const res = await axios.get<CommonCodeVO[]>(BASE, { params: { group } });
    return res.data;
};