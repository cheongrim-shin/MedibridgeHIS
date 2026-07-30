package ddit.admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import ddit.admin.vo.AdminQnaVO;

@Mapper
public interface AdminQnaMapper {

    List<AdminQnaVO> selectAdminQnaList(
            @Param("keyword") String keyword,
            @Param("status") String status,
            @Param("startRow") int startRow,
            @Param("endRow") int endRow
    );

    int selectAdminQnaCount(
            @Param("keyword") String keyword,
            @Param("status") String status
    );

    AdminQnaVO selectAdminQnaDetail(
            @Param("qandaNumber") String qandaNumber
    );

    int updateAdminQnaAnswer(AdminQnaVO qna);

    // 삭제
    int deleteAdminQna(@Param("qandaNumber") String qandaNumber);
}