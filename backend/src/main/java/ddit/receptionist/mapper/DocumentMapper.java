package ddit.receptionist.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import ddit.receptionist.vo.DocumentRowVO;
import ddit.receptionist.vo.DocumentTypeVO;

@Mapper
public interface DocumentMapper {
	//서류 종류
	public List<DocumentTypeVO> selectDocumentTypes();
	//서류목록검색
    public List<DocumentRowVO> selectDocumentList(String keyword);
    //서류 상태변경 
    public int updateDocumentState(@Param("receiveNumber") Long receiveNumber,
    							  @Param("receiveState") String receiveState,
    							  @Param("fromState") String fromState);
    // 포트원
    public DocumentRowVO selectDocumentOne(Long receiveNumber);
}
