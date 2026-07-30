package ddit.common.service;

import ddit.common.mapper.CommonCodeMapper;
import ddit.common.vo.CommonCodeVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommonCodeServiceImpl implements CommonCodeService
{
    @Autowired
    CommonCodeMapper commonCodeMapper;

    public CommonCodeServiceImpl(CommonCodeMapper commonCodeMapper)
    {
        this.commonCodeMapper = commonCodeMapper;
    }

    @Override
    public List<CommonCodeVO> readCommonCodeListByGroup(String group)
    {
        List<CommonCodeVO> list = commonCodeMapper.selectCommonCodeListByGroup(group);
        if (list == null || list.isEmpty())
        {
            throw new IllegalArgumentException("해당 그룹의 공통코드가 없습니다: " + group);
        }
        return list;
    }
}