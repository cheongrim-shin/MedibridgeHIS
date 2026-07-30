package ddit.admin.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ddit.admin.mapper.AdminFaqMapper;
import ddit.admin.vo.AdminFaqVO;

@Service
public class AdminFaqServiceImpl implements AdminFaqService {

    private final AdminFaqMapper adminFaqMapper;

    public AdminFaqServiceImpl(
            AdminFaqMapper adminFaqMapper) {

        this.adminFaqMapper = adminFaqMapper;
    }

    @Override
    @Transactional(readOnly = true)
    public List<AdminFaqVO> selectAdminFaqList(
            String keyword,
            int currentPage,
            int size) {

        int startRow =
                (currentPage - 1) * size + 1;

        int endRow =
                currentPage * size;

        return adminFaqMapper.selectAdminFaqList(
                keyword,
                startRow,
                endRow
        );
    }

    @Override
    @Transactional(readOnly = true)
    public int selectAdminFaqCount(String keyword) {

        return adminFaqMapper.selectAdminFaqCount(
                keyword
        );
    }

    @Override
    @Transactional(readOnly = true)
    public AdminFaqVO selectAdminFaqDetail(
            Integer faqNumber) {

        return adminFaqMapper.selectAdminFaqDetail(
                faqNumber
        );
    }

    @Override
    @Transactional
    public int insertAdminFaq(AdminFaqVO faq) {

        validateFaq(faq);

        return adminFaqMapper.insertAdminFaq(faq);
    }

    @Override
    @Transactional
    public int updateAdminFaq(AdminFaqVO faq) {

        if (faq.getFaqNumber() == null) {
            throw new IllegalArgumentException(
                    "FAQ 번호가 없습니다."
            );
        }

        validateFaq(faq);

        return adminFaqMapper.updateAdminFaq(faq);
    }

    @Override
    @Transactional
    public int deleteAdminFaq(Integer faqNumber) {

        if (faqNumber == null) {
            throw new IllegalArgumentException(
                    "FAQ 번호가 없습니다."
            );
        }

        return adminFaqMapper.deleteAdminFaq(
                faqNumber
        );
    }

    private void validateFaq(AdminFaqVO faq) {

        if (faq == null) {
            throw new IllegalArgumentException(
                    "FAQ 정보가 없습니다."
            );
        }

        if (faq.getFaqTitle() == null
                || faq.getFaqTitle().isBlank()) {

            throw new IllegalArgumentException(
                    "FAQ 제목을 입력해 주세요."
            );
        }

        if (faq.getFaqContent() == null
                || faq.getFaqContent().isBlank()) {

            throw new IllegalArgumentException(
                    "FAQ 내용을 입력해 주세요."
            );
        }
    }
}