package ddit.outpatientNurse.service;

import ddit.outpatientNurse.mapper.WaitMapper;
import ddit.outpatientNurse.vo.HoldListVO;
import ddit.outpatientNurse.vo.RoomStatusVO;
import ddit.outpatientNurse.vo.WaitCountVO;
import ddit.outpatientNurse.vo.WaitListVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class WaitService {

    @Autowired
    WaitMapper waitMapper;

    // 대기중/진료중/대기보류 카운트 숫자
    public WaitCountVO selectWaitCountByState() {
        List<Map<String, Object>> result = waitMapper.selectWaitCountByState();

        WaitCountVO waitCountVO = new WaitCountVO();
        long waitingCnt = 0;   // 접수완료 + 호출중을 합쳐서 "대기 중"으로 집계
        long treatingCnt = 0;  // 진짜 "진료중"만 집계

        for (Map<String, Object> row : result) {
            String state = (String) row.get("RECEIPT_STATUS");
            long cnt = ((Number) row.get("CNT")).longValue();

            switch (state) {
                case "접수완료":
                case "호출중":
                    // 아직 의사가 실제로 진료를 시작하기 전(접수만 됐거나, 진료실 배정만 된 상태)이라
                    // 둘 다 "대기 중"으로 취급함
                    waitingCnt += cnt;
                    break;
                case "진료중":
                    treatingCnt += cnt;
                    break;
                case "보류":
                    waitCountVO.setHoldCnt(cnt);
                    break;
            }
        }

        waitCountVO.setWaitingCnt(waitingCnt);
        waitCountVO.setTreatingCnt(treatingCnt);
        return waitCountVO;
    }

    // 진료실 구분해서 대기 환자 리스트 불러오기
    public List<WaitListVO> selectWaitListBySpace(String spaceNumber) {
        return waitMapper.selectWaitListBySpace(spaceNumber);
    }

    // 진료실 호출 현황으로 리스트 불러오기
    public List<RoomStatusVO> selectRoomStatus(String spaceNumber) {

        return waitMapper.selectRoomStatus(spaceNumber);
    }

    // 보류 처리했을 때 DB 업데이트 (보류사유/대기상태:보류)
    // 같은 진료실(SPACE_NUMBER)에서, 대기 중인 사람 중 순번이 가장 빠른 사람을 찾아서 입장 처리(callNextWaitingPatient)
    public int updateWaitToHold(String medicalNumber, String holdReason, String spaceNumber) {
        int holdResult = waitMapper.updateWaitToHold(medicalNumber, holdReason);

        /*보류 처리가 성공했을 때만 다음 대기자 호출 시도*/
        if (holdResult > 0) {
            waitMapper.callNextWaitingPatient(spaceNumber);
        }
        return holdResult;
    }

    // 보류 상태인 환자들 대기보류 현황(리스트)에 불러오기
    public List<HoldListVO> selectHoldList() {
        return waitMapper.selectHoldList();
    }

    // 대기복귀 버튼 누르면 '대기' 상태로 넘어가기
    public int returnFromHold(String medicalNumber, String spaceNumber) {
        int result = waitMapper.returnFromHold(medicalNumber);

        if (result > 0) {
            waitMapper.callNextWaitingPatient(spaceNumber);
        }
        return result;
    }

    // 다음순번으로 버튼을 누르면 본인은 대기상태로 돌아가고 본인을 제외한 다음사람 호출
    //    (만약 본인 혼자 있을경우는 다시 그냥 입장 처리되도록 서비스에서 처리)
    public int callNextWaitingPatientExcludingOne(String medicalNumber, String spaceNumber) {
        // 본인을 대기상태로 돌림
        int result = waitMapper.returnFromHold(medicalNumber);

        if (result > 0) {
            // 본인 제외하고 다음 순위 사람을 입장처리
            int nextResult = waitMapper.callNextWaitingPatientExcludingOne(spaceNumber, medicalNumber);

            // 부를 사람이 없으면 0건, 본인을 다시 입장시킴
            // (본인이 다시 대기상태가 되었고, 다른 대기자가 없어서 본인이 1순위라서 다시 입장)
            if (nextResult == 0) {
                waitMapper.callNextWaitingPatient(spaceNumber);
            }
        }
        return result;
    }

    // 진료실 1, 2, 3 각각에 대해 입장한 사람이 없으면 1순위 자동 입장
    // callNextWaitingPatient 안에 NOT EXISTS 조건이 있으니
    // 이미 입장한 사람이 있는 진료실은 자동으로 건너뜀
    public void initRoomStatus() {
        for(String spaceNumber : List.of("1", "2", "3")) {
            waitMapper.callNextWaitingPatient(spaceNumber);
        }
    }
}