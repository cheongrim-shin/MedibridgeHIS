package ddit.common.mapper;

import ddit.common.vo.CommonCodeVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CommonCodeMapper
{
    List<CommonCodeVO> selectCommonCodeListByGroup(String commonCode);

    // 공통코드 등록 (약품명 M그룹 신규 코드 생성용)
    void insertCommonCode(CommonCodeVO commonCodeVO);

    // CODENAME_1만 수정 (약품명 텍스트 수정용)
    void updateCodeName1(@Param("commonCodeNumber") String commonCodeNumber,
                         @Param("commonCode") String commonCode,
                         @Param("codeName1") String codeName1);
}