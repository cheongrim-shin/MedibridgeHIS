package ddit.pharmacist.controller;

import ddit.login.security.CustomUserDetails;
import ddit.pharmacist.service.MedicineService;
import ddit.pharmacist.vo.MedicineListVO;
import ddit.pharmacist.vo.MedicineVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pharmacist/medicines")
public class MedicineController
{
    @Autowired
    MedicineService medicineService;

    // 권한 체크 통과 여부 + 로그인한 사용자 정보 확인용 임시 엔드포인트
    // @AuthenticationPrincipal: 로그인한 계정 상세 데이터
    @GetMapping("/test")
    public Map<String, Object> test(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return Map.of(
                "message", "약사 권한으로 접근 성공",
                "memberId", userDetails.getUsername(),
                "authorities", userDetails.getAuthorities()
        );
    }

    // 약품 목록 조회
    @GetMapping
    public ResponseEntity<List<MedicineListVO>> readMedicineList()
    {
        return ResponseEntity.ok(medicineService.readMedicineList());
    }

    // 약품 조회
    @GetMapping("/{medicineCode}")
    public ResponseEntity<MedicineVO> readMedicine(
            @PathVariable String medicineCode)
    {
        return ResponseEntity.ok(medicineService.readMedicine(medicineCode));
    }

    // 약품 등록
    @PostMapping
    public ResponseEntity<MedicineVO> createMedicine(
            @RequestBody MedicineVO medicineVO)
    {
        MedicineVO created = medicineService.createMedicine(medicineVO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // 약품 수정
    @PutMapping("/{medicineCode}")
    public ResponseEntity<MedicineVO> updateMedicine(
            @PathVariable String medicineCode,
            @RequestBody MedicineVO medicineVO)
    {
        medicineService.updateMedicine(medicineVO);
        return ResponseEntity.ok(medicineVO);
    }

    // 약품 삭제
    @DeleteMapping("/{medicineCode}")
    public ResponseEntity<Void> deleteMedicine(
            @PathVariable String medicineCode)
    {
        medicineService.deleteMedicine(medicineCode);
        return ResponseEntity.noContent().build();
    }

    // 재고 부족 약품 목록 조회
    @GetMapping("/low-stock")
    public ResponseEntity<List<MedicineListVO>> lowStockMedicine()
    {
        return ResponseEntity.ok(medicineService.lowStockMedicine());
    }
}
