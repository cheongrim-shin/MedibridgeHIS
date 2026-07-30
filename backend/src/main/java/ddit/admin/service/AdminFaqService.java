package ddit.admin.service;

import java.util.List;

import ddit.admin.vo.AdminFaqVO;

public interface AdminFaqService {

    List<AdminFaqVO> selectAdminFaqList(
            String keyword,
            int currentPage,
            int size
    );

    int selectAdminFaqCount(String keyword);

    AdminFaqVO selectAdminFaqDetail(Integer faqNumber);

    int insertAdminFaq(AdminFaqVO faq);

    int updateAdminFaq(AdminFaqVO faq);

    int deleteAdminFaq(Integer faqNumber);
}