package ddit.member.service.impl;

import ddit.member.mapper.PositionMapper;
import ddit.member.service.PositionService;
import ddit.member.vo.PositionVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PositionServiceImpl implements PositionService
{
    private final PositionMapper positionMapper;

    @Override
    public List<PositionVO> getAllPositions()
    {
        return positionMapper.selectAllPositions();
    }
}
