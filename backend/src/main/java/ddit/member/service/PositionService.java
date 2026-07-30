package ddit.member.service;

import ddit.member.vo.PositionVO;

import java.util.List;

public interface PositionService
{
    // 직책 정보
    List<PositionVO> getAllPositions();
}
