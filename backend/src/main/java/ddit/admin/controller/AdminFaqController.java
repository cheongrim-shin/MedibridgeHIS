package ddit.admin.controller;

import java.security.Principal;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ddit.admin.dto.AdminFaqRequest;
import ddit.admin.service.AdminFaqService;
import ddit.admin.vo.AdminFaqVO;

@RestController
@RequestMapping("/api/admin/faqs")
public class AdminFaqController {

    private final AdminFaqService adminFaqService;

    public AdminFaqController(
            AdminFaqService adminFaqService) {

        this.adminFaqService = adminFaqService;
    }

    /*
     * FAQ 목록
     * GET /api/admin/faqs
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> selectAdminFaqList(
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "1") int currentPage,
            @RequestParam(defaultValue = "10") int size) {

        if (currentPage < 1) {
            currentPage = 1;
        }

        if (size < 1) {
            size = 10;
        }

        if (size > 100) {
            size = 100;
        }

        int totalCount =
                adminFaqService.selectAdminFaqCount(
                        keyword
                );

        int totalPages =
                totalCount == 0
                        ? 0
                        : (int) Math.ceil(
                                (double) totalCount / size
                        );

        List<AdminFaqVO> items =
                adminFaqService.selectAdminFaqList(
                        keyword,
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
     * FAQ 상세
     * GET /api/admin/faqs/{faqNumber}
     */
    @GetMapping("/{faqNumber}")
    public ResponseEntity<AdminFaqVO> selectAdminFaqDetail(
            @PathVariable Integer faqNumber) {

        AdminFaqVO faq =
                adminFaqService.selectAdminFaqDetail(
                        faqNumber
                );

        if (faq == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(faq);
    }

    /*
     * FAQ 등록
     * POST /api/admin/faqs
     */
    @PostMapping
    public ResponseEntity<Map<String, Object>> insertAdminFaq(
            @RequestBody AdminFaqRequest request,
            Principal principal) {

        AdminFaqVO faq =
                new AdminFaqVO();

        faq.setFaqTitle(
                trim(request.getFaqTitle())
        );

        faq.setFaqContent(
                trim(request.getFaqContent())
        );

        faq.setFaqAuthor(
                principal.getName()
        );

        int result =
                adminFaqService.insertAdminFaq(faq);

        if (result != 1) {
            throw new IllegalStateException(
                    "FAQ 등록에 실패했습니다."
            );
        }

        Map<String, Object> response =
                new LinkedHashMap<>();

        response.put(
                "message",
                "FAQ가 등록되었습니다."
        );

        response.put(
                "faqNumber",
                faq.getFaqNumber()
        );

        return ResponseEntity.ok(response);
    }

    /*
     * FAQ 수정
     * PUT /api/admin/faqs/{faqNumber}
     */
    @PutMapping("/{faqNumber}")
    public ResponseEntity<Map<String, Object>> updateAdminFaq(
            @PathVariable Integer faqNumber,
            @RequestBody AdminFaqRequest request) {

        AdminFaqVO existing =
                adminFaqService.selectAdminFaqDetail(
                        faqNumber
                );

        if (existing == null) {
            return ResponseEntity.notFound().build();
        }

        AdminFaqVO faq =
                new AdminFaqVO();

        faq.setFaqNumber(faqNumber);

        faq.setFaqTitle(
                trim(request.getFaqTitle())
        );

        faq.setFaqContent(
                trim(request.getFaqContent())
        );

        int result =
                adminFaqService.updateAdminFaq(faq);

        if (result != 1) {
            throw new IllegalStateException(
                    "FAQ 수정에 실패했습니다."
            );
        }

        Map<String, Object> response =
                new LinkedHashMap<>();

        response.put(
                "message",
                "FAQ가 수정되었습니다."
        );

        response.put(
                "faqNumber",
                faqNumber
        );

        return ResponseEntity.ok(response);
    }

    /*
     * FAQ 삭제
     * DELETE /api/admin/faqs/{faqNumber}
     */
    @DeleteMapping("/{faqNumber}")
    public ResponseEntity<Map<String, Object>> deleteAdminFaq(
            @PathVariable Integer faqNumber) {

        AdminFaqVO existing =
                adminFaqService.selectAdminFaqDetail(
                        faqNumber
                );

        if (existing == null) {
            return ResponseEntity.notFound().build();
        }

        int result =
                adminFaqService.deleteAdminFaq(
                        faqNumber
                );

        if (result != 1) {
            throw new IllegalStateException(
                    "FAQ 삭제에 실패했습니다."
            );
        }

        Map<String, Object> response =
                new LinkedHashMap<>();

        response.put(
                "message",
                "FAQ가 삭제되었습니다."
        );

        response.put(
                "faqNumber",
                faqNumber
        );

        return ResponseEntity.ok(response);
    }

    private String trim(String value) {

        return value == null
                ? null
                : value.trim();
    }
}