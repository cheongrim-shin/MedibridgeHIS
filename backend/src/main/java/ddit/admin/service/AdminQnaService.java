package ddit.admin.service;

import java.util.List;

import ddit.admin.vo.AdminQnaVO;

public interface AdminQnaService {

    List<AdminQnaVO> selectAdminQnaList(
            String keyword,
            String status,
            int currentPage,
            int size
    );

    int selectAdminQnaCount(
            String keyword,
            String status
    );

    AdminQnaVO selectAdminQnaDetail(
            String qandaNumber
    );

    /*
     * memberId:
     * JWT Principal에서 꺼낸 로그인 아이디
     *
     * Service에서 MEMBER_NAME을 조회한 뒤
     * QNA.RESPONDENT에 이름으로 저장한다.
     */
    int updateAdminQnaAnswer(
            AdminQnaVO qna,
            String memberId
    );

    // 삭제
    int deleteAdminQna(String qandaNumber);
}