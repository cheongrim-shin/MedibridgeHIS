package ddit.pharmacist.service;

import ddit.common.mapper.CommonCodeMapper;
import ddit.common.vo.CommonCodeVO;
import ddit.pharmacist.mapper.MedicineMapper;
import ddit.pharmacist.vo.MedicineListVO;
import ddit.pharmacist.vo.MedicineVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MedicineServiceImpl implements MedicineService
{
    @Autowired
    MedicineMapper medicineMapper;

    @Autowired
    CommonCodeMapper commonCodeMapper;

    // 약품 목록 조회
    @Override
    public List<MedicineListVO> readMedicineList()
    {
        return medicineMapper.readMedicineList();
    }

    // 약품 조회
    @Override
    public MedicineVO readMedicine(String medicineCode)
    {
        MedicineVO medicineVO = medicineMapper.readMedicine(medicineCode);
        if (medicineVO == null)
            throw new IllegalArgumentException("존재하지 않는 약품 코드: " + medicineCode);
        return medicineVO;
    }

    // 약품 등록
    // 1) MEDICINE_CODE 채번 → 2) COMMONCODE(M그룹) 등록 → 3) MEDICINE 등록 (MEDICINE_NAME = 채번된 코드)
    @Override
    @Transactional
    public MedicineVO createMedicine(MedicineVO medicineVO)
    {
        String medicineCode = medicineMapper.nextMedicineCode();
        medicineVO.setMedicineCode(medicineCode);
        medicineVO.setMedicineName(medicineCode); // MEDICINE_NAME엔 코드값 저장 (COMMONCODE_NUMBER와 동일)

        CommonCodeVO commonCodeVO = new CommonCodeVO();
        commonCodeVO.setCommonCodeNumber(medicineCode);
        commonCodeVO.setCommonCode("M");
        commonCodeVO.setJointCodeGroupName("약품명");
        commonCodeVO.setCodeName1(medicineVO.getMedicineNameText());
        commonCodeVO.setUsed("Y");
        commonCodeMapper.insertCommonCode(commonCodeVO);

        medicineMapper.insertMedicine(medicineVO);

        return medicineVO; // 생성된 medicineCode를 프론트에 응답하기 위해 반환
    }

    // 약품 수정
    // MEDICINE_NAME(코드)은 불변, COMMONCODE.CODENAME_1(표시 텍스트)만 갱신
    @Override
    @Transactional
    public void updateMedicine(MedicineVO medicineVO)
    {
        readMedicine(medicineVO.getMedicineCode()); // 존재 확인

        commonCodeMapper.updateCodeName1(medicineVO.getMedicineCode(), "M", medicineVO.getMedicineNameText());
        medicineMapper.updateMedicine(medicineVO);
    }

    // 약품 삭제
    @Override
    @Transactional
    public void deleteMedicine(String medicineCode)
    {
        readMedicine(medicineCode);
        medicineMapper.deleteMedicine(medicineCode);
    }

    // 재고 부족 약품 목록 조회
    @Override
    public List<MedicineListVO> lowStockMedicine()
    {
        return medicineMapper.lowStockMedicineList();
    }
}