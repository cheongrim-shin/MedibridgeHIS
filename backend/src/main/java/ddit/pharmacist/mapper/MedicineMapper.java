package ddit.pharmacist.mapper;

import ddit.pharmacist.vo.MedicineListVO;
import ddit.pharmacist.vo.MedicineVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MedicineMapper
{
    // 약품 목록 조회
    public List<MedicineListVO> readMedicineList();

    // 약품 조회
    public MedicineVO readMedicine(String medicineCode);

    // 약품 등록
    public int insertMedicine(MedicineVO medicineVO);

    // 약품 수정
    public int updateMedicine(MedicineVO medicineVO);

    // 약품 삭제
    public int deleteMedicine(String medicineCode);

    // 재고 부족 약품 목록 조회
    List<MedicineListVO> lowStockMedicineList();

    // MEDICINE_CODE(T + 3자리, SEQ_MEDICINE_CODE 시퀀스 기반)
    String nextMedicineCode();
}
