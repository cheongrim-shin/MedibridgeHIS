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

import ddit.admin.dto.AdminNoticeRequest;
import ddit.admin.service.AdminNoticeService;
import ddit.admin.vo.AdminNoticeVO;

/*
 * 관리자 공지사항 REST API
 */
@RestController
@RequestMapping("/api/admin/notices")
public class AdminNoticeController {

    private final AdminNoticeService adminNoticeService;

    public AdminNoticeController(
            AdminNoticeService adminNoticeService) {

        this.adminNoticeService = adminNoticeService;
    }

    /*
     * 목록 조회
     * GET /api/admin/notices
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> selectAdminNoticeList(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String category,
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
                adminNoticeService.selectAdminNoticeCount(
                        keyword,
                        category
                );

        int totalPages =
                totalCount == 0
                        ? 0
                        : (int) Math.ceil(
                                (double) totalCount / size
                        );

        List<AdminNoticeVO> items =
                adminNoticeService.selectAdminNoticeList(
                        keyword,
                        category,
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
     * 상세 조회
     * GET /api/admin/notices/{noticeNumber}
     */
    @GetMapping("/{noticeNumber}")
    public ResponseEntity<AdminNoticeVO> selectAdminNoticeDetail(
            @PathVariable Integer noticeNumber) {

        AdminNoticeVO notice =
                adminNoticeService.selectAdminNoticeDetail(
                        noticeNumber
                );

        if (notice == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(notice);
    }

    /*
     * 등록
     * POST /api/admin/notices
     */
    @PostMapping
    public ResponseEntity<Map<String, Object>> insertAdminNotice(
            @RequestBody AdminNoticeRequest request,
            Principal principal) {

        AdminNoticeVO notice =
                new AdminNoticeVO();

        notice.setNoticeTitle(
                trim(request.getNoticeTitle())
        );

        notice.setNoticeContent(
                trim(request.getNoticeContent())
        );

        notice.setNoticeCategory(
                trim(request.getNoticeCategory())
        );

        /*
         * JWT 필터가 principal에 관리자 아이디 문자열을 저장하므로
         * Principal.getName()으로 아이디를 가져온다.
         */
        notice.setNoticeAuthor(
                principal.getName()
        );

        int result =
                adminNoticeService.insertAdminNotice(
                        notice
                );

        if (result != 1) {
            throw new IllegalStateException(
                    "공지사항 등록에 실패했습니다."
            );
        }

        Map<String, Object> response =
                new LinkedHashMap<>();

        response.put(
                "message",
                "공지사항이 등록되었습니다."
        );

        response.put(
                "noticeNumber",
                notice.getNoticeNumber()
        );

        return ResponseEntity.ok(response);
    }

    /*
     * 수정
     * PUT /api/admin/notices/{noticeNumber}
     */
    @PutMapping("/{noticeNumber}")
    public ResponseEntity<Map<String, Object>> updateAdminNotice(
            @PathVariable Integer noticeNumber,
            @RequestBody AdminNoticeRequest request) {

        AdminNoticeVO existing =
                adminNoticeService.selectAdminNoticeDetail(
                        noticeNumber
                );

        if (existing == null) {
            return ResponseEntity.notFound().build();
        }

        AdminNoticeVO notice =
                new AdminNoticeVO();

        notice.setNoticeNumber(noticeNumber);

        notice.setNoticeTitle(
                trim(request.getNoticeTitle())
        );

        notice.setNoticeContent(
                trim(request.getNoticeContent())
        );

        notice.setNoticeCategory(
                trim(request.getNoticeCategory())
        );

        int result =
                adminNoticeService.updateAdminNotice(
                        notice
                );

        if (result != 1) {
            throw new IllegalStateException(
                    "공지사항 수정에 실패했습니다."
            );
        }

        Map<String, Object> response =
                new LinkedHashMap<>();

        response.put(
                "message",
                "공지사항이 수정되었습니다."
        );

        response.put(
                "noticeNumber",
                noticeNumber
        );

        return ResponseEntity.ok(response);
    }

    /*
     * 삭제
     * DELETE /api/admin/notices/{noticeNumber}
     */
    @DeleteMapping("/{noticeNumber}")
    public ResponseEntity<Map<String, Object>> deleteAdminNotice(
            @PathVariable Integer noticeNumber) {

        AdminNoticeVO existing =
                adminNoticeService.selectAdminNoticeDetail(
                        noticeNumber
                );

        if (existing == null) {
            return ResponseEntity.notFound().build();
        }

        int result =
                adminNoticeService.deleteAdminNotice(
                        noticeNumber
                );

        if (result != 1) {
            throw new IllegalStateException(
                    "공지사항 삭제에 실패했습니다."
            );
        }

        Map<String, Object> response =
                new LinkedHashMap<>();

        response.put(
                "message",
                "공지사항이 삭제되었습니다."
        );

        response.put(
                "noticeNumber",
                noticeNumber
        );

        return ResponseEntity.ok(response);
    }

    private String trim(String value) {

        return value == null
                ? null
                : value.trim();
    }
}