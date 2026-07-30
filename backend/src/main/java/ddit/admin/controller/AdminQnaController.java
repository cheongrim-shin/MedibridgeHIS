package ddit.admin.controller;

import java.security.Principal;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;

import ddit.admin.dto.AdminQnaAnswerRequest;
import ddit.admin.service.AdminQnaService;
import ddit.admin.vo.AdminQnaVO;

@RestController
@RequestMapping("/api/admin/qnas")
public class AdminQnaController {

    private final AdminQnaService adminQnaService;

    public AdminQnaController(
            AdminQnaService adminQnaService) {

        this.adminQnaService = adminQnaService;
    }

    /*
     * Q&A 목록
     *
     * GET /api/admin/qnas
     * GET /api/admin/qnas?status=WAIT
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>>
            selectAdminQnaList(

            @RequestParam(required = false)
            String keyword,

            @RequestParam(required = false)
            String status,

            @RequestParam(defaultValue = "1")
            int currentPage,

            @RequestParam(defaultValue = "10")
            int size) {

        if (currentPage < 1) {
            currentPage = 1;
        }

        if (size < 1) {
            size = 10;
        }

        if (size > 100) {
            size = 100;
        }

        keyword = trim(keyword);
        status = trim(status);

        int totalCount =
                adminQnaService.selectAdminQnaCount(
                        keyword,
                        status
                );

        int totalPages =
                totalCount == 0
                        ? 0
                        : (int) Math.ceil(
                                (double) totalCount / size
                        );

        List<AdminQnaVO> items =
                adminQnaService.selectAdminQnaList(
                        keyword,
                        status,
                        currentPage,
                        size
                );

        Map<String, Object> response =
                new LinkedHashMap<>();

        response.put("items", items);
        response.put("totalCount", totalCount);
        response.put("currentPage", currentPage);
        response.put("size", size);
        response.put("totalPages", totalPages);

        return ResponseEntity.ok(response);
    }

    /*
     * Q&A 상세
     *
     * GET /api/admin/qnas/{qandaNumber}
     */
    @GetMapping("/{qandaNumber}")
    public ResponseEntity<AdminQnaVO>
            selectAdminQnaDetail(

            @PathVariable
            String qandaNumber) {

        AdminQnaVO qna =
                adminQnaService.selectAdminQnaDetail(
                        qandaNumber
                );

        if (qna == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(qna);
    }

    /*
     * 관리자 답변 등록 및 상태 변경
     *
     * PUT /api/admin/qnas/{qandaNumber}/answer
     */
    @PutMapping("/{qandaNumber}/answer")
    public ResponseEntity<Map<String, Object>>
            updateAdminQnaAnswer(

            @PathVariable
            String qandaNumber,

            @RequestBody
            AdminQnaAnswerRequest request,

            Principal principal) {

        if (principal == null
                || principal.getName() == null
                || principal.getName().isBlank()) {

            throw new IllegalStateException(
                    "로그인 사용자 정보를 확인할 수 없습니다."
            );
        }

        if (request == null) {
            throw new IllegalArgumentException(
                    "답변 요청 정보가 없습니다."
            );
        }

        AdminQnaVO existing =
                adminQnaService.selectAdminQnaDetail(
                        qandaNumber
                );

        if (existing == null) {
            return ResponseEntity.notFound().build();
        }

        AdminQnaVO qna = new AdminQnaVO();

        qna.setQandaNumber(qandaNumber);

        qna.setResponseDetails(
                trim(request.getResponseDetails())
        );

        /*
         * Controller에서는 로그인 아이디만 Service로 넘긴다.
         * 실제 이름 조회와 RESPONDENT 설정은 Service에서 처리한다.
         */
        int result =
                adminQnaService.updateAdminQnaAnswer(
                        qna,
                        principal.getName()
                );

        if (result != 1) {
            throw new IllegalStateException(
                    "문의 답변 등록에 실패했습니다."
            );
        }

        Map<String, Object> response =
                new LinkedHashMap<>();

        response.put(
                "message",
                "문의 답변이 등록되었습니다."
        );

        response.put(
                "qandaNumber",
                qandaNumber
        );

        response.put(
                "status",
                "COMPLETE"
        );

        return ResponseEntity.ok(response);
    }

    /*
     * 문의 삭제
     * DELETE /api/admin/qnas/{qandaNumber}
     */
    @DeleteMapping("/{qandaNumber}")
    public ResponseEntity<Map<String, Object>> deleteAdminQna(
            @PathVariable String qandaNumber) {

        AdminQnaVO existing = adminQnaService.selectAdminQnaDetail(qandaNumber);

        if (existing == null) {
            return ResponseEntity.notFound().build();
        }

        int result = adminQnaService.deleteAdminQna(qandaNumber);

        if (result != 1) {
            throw new IllegalStateException("문의 삭제에 실패했습니다.");
        }

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("message", "문의가 삭제되었습니다.");
        response.put("qandaNumber", qandaNumber);

        return ResponseEntity.ok(response);
    }

    private String trim(String value) {

        return value == null
                ? null
                : value.trim();
    }
}