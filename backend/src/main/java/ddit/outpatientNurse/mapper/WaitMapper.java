package ddit.outpatientNurse.mapper;

import ddit.outpatientNurse.vo.HoldListVO;
import ddit.outpatientNurse.vo.RoomStatusVO;
import ddit.outpatientNurse.vo.WaitListVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface WaitMapper {

    // 대기중/진료중/대기보류 카운트 숫자
    List<Map<String,Object>> selectWaitCountByState();

    // 진료실 구분해서 대기 환자 리스트 불러오기
    List<WaitListVO> selectWaitListBySpace(String spaceNumber);

    // 진료실 호출 현황으로 리스트 불러오기
    List<RoomStatusVO> selectRoomStatus(String spaceNumber);

    // 보류 처리했을 때 DB 업데이트 (보류사유/대기상태:보류)
    // 같은 진료실(SPACE_NUMBER)에서, 대기 중인 사람 중 순번이 가장 빠른 사람을 찾아서 입장 처리(callNextWaitingPatient)
    int updateWaitToHold(@Param("medicalNumber")String medicalNumber, @Param("holdReason") String holdReason);

    // 보류 상태인 환자들 대기보류 현황(리스트)에 불러오기
    List<HoldListVO> selectHoldList();

    // 같은 진료실(SPACE_NUMBER)에서, 대기 중인 사람 중 순번이 가장 빠른 사람을 찾아서 입장 처리
    int callNextWaitingPatient(String spaceNumber);

    // 대기복귀 버튼 누르면 '대기' 상태로 넘어가기
    int returnFromHold(String medicalNumber);

    // 다음순번으로 버튼을 누르면 본인은 대기상태로 돌아가고 본인을 제외한 다음사람 호출
    //    (만약 본인 혼자 있을경우는 다시 그냥 입장 처리되도록 서비스에서 처리)
    int callNextWaitingPatientExcludingOne(@Param("spaceNumber") String spaceNumber, @Param("excludeMedicalNumber")String excludeMedicalNumber);
}
