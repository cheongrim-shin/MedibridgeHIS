package ddit.admin.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ddit.admin.mapper.AdminQnaMapper;
import ddit.admin.vo.AdminQnaVO;
import ddit.member.mapper.MemberMapper;
import ddit.member.vo.MemberVO;

@Service
public class AdminQnaServiceImpl implements AdminQnaService {

    private final AdminQnaMapper adminQnaMapper;
    private final MemberMapper memberMapper;

    public AdminQnaServiceImpl(
            AdminQnaMapper adminQnaMapper,
            MemberMapper memberMapper) {

        this.adminQnaMapper = adminQnaMapper;
        this.memberMapper = memberMapper;
    }

    @Override
    @Transactional(readOnly = true)
    public List<AdminQnaVO> selectAdminQnaList(
            String keyword,
            String status,
            int currentPage,
            int size) {

        int startRow = (currentPage - 1) * size + 1;
        int endRow = currentPage * size;

        return adminQnaMapper.selectAdminQnaList(
                keyword,
                status,
                startRow,
                endRow
        );
    }

    @Override
    @Transactional(readOnly = true)
    public int selectAdminQnaCount(
            String keyword,
            String status) {

        return adminQnaMapper.selectAdminQnaCount(
                keyword,
                status
        );
    }

    @Override
    @Transactional(readOnly = true)
    public AdminQnaVO selectAdminQnaDetail(
            String qandaNumber) {

        if (qandaNumber == null
                || qandaNumber.isBlank()) {

            throw new IllegalArgumentException(
                    "문의 번호가 없습니다."
            );
        }

        return adminQnaMapper.selectAdminQnaDetail(
                qandaNumber
        );
    }

    @Override
    @Transactional
    public int updateAdminQnaAnswer(
            AdminQnaVO qna,
            String memberId) {

        if (qna == null) {
            throw new IllegalArgumentException(
                    "문의 정보가 없습니다."
            );
        }

        if (qna.getQandaNumber() == null
                || qna.getQandaNumber().isBlank()) {

            throw new IllegalArgumentException(
                    "문의 번호가 없습니다."
            );
        }

        if (qna.getResponseDetails() == null
                || qna.getResponseDetails().isBlank()) {

            throw new IllegalArgumentException(
                    "답변 내용을 입력해 주세요."
            );
        }

        if (memberId == null
                || memberId.isBlank()) {

            throw new IllegalArgumentException(
                    "로그인 사용자 정보가 없습니다."
            );
        }

        /*
         * Principal에서는 로그인 아이디(test)를 받는다.
         * MEMBER 테이블을 조회하여 실제 이름(테스트관리자)을 찾는다.
         */
        MemberVO member =
                memberMapper.selectMemberByLoginId(
                        memberId
                );

        if (member == null) {
            throw new IllegalArgumentException(
                    "로그인 회원 정보를 찾을 수 없습니다."
            );
        }

        if (member.getMemberName() == null
                || member.getMemberName().isBlank()) {

            throw new IllegalArgumentException(
                    "답변자 이름을 확인할 수 없습니다."
            );
        }

        /*
         * QNA.RESPONDENT에는 로그인 아이디가 아니라
         * MEMBER.MEMBER_NAME을 저장한다.
         */
        qna.setRespondent(
                member.getMemberName().trim()
        );

        return adminQnaMapper.updateAdminQnaAnswer(qna);
    }

    // 삭제
    @Override
    @Transactional
    public int deleteAdminQna(String qandaNumber) {

        if (qandaNumber == null || qandaNumber.isBlank()) {
            throw new IllegalArgumentException("문의 번호가 없습니다.");
        }

        return adminQnaMapper.deleteAdminQna(qandaNumber);
    }
}