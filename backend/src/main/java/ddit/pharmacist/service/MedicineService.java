package ddit.pharmacist.service;

import ddit.pharmacist.vo.MedicineListVO;
import ddit.pharmacist.vo.MedicineVO;

import java.util.List;

public interface MedicineService
{
    // 약품 목록 조회
    public List<MedicineListVO> readMedicineList();

    // 약품 조회
    public MedicineVO readMedicine(String medicineCode);

    // 약품 등록
    public MedicineVO createMedicine(MedicineVO medicineVO);

    // 약품 수정
    public void updateMedicine(MedicineVO medicineVO);

    // 약품 삭제
    public void deleteMedicine(String medicineCode);

    // 재고 부족 약품 목록 조회
    public List<MedicineListVO> lowStockMedicine();
}
