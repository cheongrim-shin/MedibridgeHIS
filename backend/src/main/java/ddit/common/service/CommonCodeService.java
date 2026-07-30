package ddit.common.service;

import ddit.common.vo.CommonCodeVO;

import java.util.List;

public interface CommonCodeService
{
    List<CommonCodeVO> readCommonCodeListByGroup(String group);
}