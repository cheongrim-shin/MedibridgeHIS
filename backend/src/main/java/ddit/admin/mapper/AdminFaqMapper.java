package ddit.admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import ddit.admin.vo.AdminFaqVO;

@Mapper
public interface AdminFaqMapper {

    List<AdminFaqVO> selectAdminFaqList(
            @Param("keyword") String keyword,
            @Param("startRow") int startRow,
            @Param("endRow") int endRow
    );

    int selectAdminFaqCount(
            @Param("keyword") String keyword
    );

    AdminFaqVO selectAdminFaqDetail(
            @Param("faqNumber") Integer faqNumber
    );

    int insertAdminFaq(AdminFaqVO faq);

    int updateAdminFaq(AdminFaqVO faq);

    int deleteAdminFaq(
            @Param("faqNumber") Integer faqNumber
    );
}