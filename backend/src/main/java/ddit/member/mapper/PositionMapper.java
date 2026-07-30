package ddit.member.mapper;

import ddit.member.vo.PositionVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PositionMapper
{
    // 관리자 전체권한 캐싱용 - 모든 권한값 목록 (중복 제거)
    List<String> selectAllDefaultPermissionNames();

    // 직책정보 - 회원가입 폼 드롭다운용(코드/이름)
    List<PositionVO> selectAllPositions();
}