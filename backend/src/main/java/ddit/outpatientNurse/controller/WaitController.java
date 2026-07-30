package ddit.outpatientNurse.controller;

import ddit.outpatientNurse.service.WaitService;
import ddit.outpatientNurse.vo.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/wait")
public class WaitController {

    @Autowired
    WaitService waitService;

    // 대기중/진료중/대기보류 카운트 숫자
    @GetMapping("/count")
    public WaitCountVO selectWaitCountByState() {

        return waitService.selectWaitCountByState();
    }

    // 진료실 구분해서 대기 환자 리스트 불러오기
    @GetMapping("/list")
    public List<WaitListVO> selectWaitListBySpace(@RequestParam(required = false) String spaceNumber  // required=false: 없어도 에러 안 냄, 안 보내면 자동으로 null이 들어옴
    ) {
        return waitService.selectWaitListBySpace(spaceNumber); // null이면 서비스/매퍼에서 "전체 조회"로 처리하게 넘김
    }

    // 진료실 호출 현황으로 리스트 불러오기
    @GetMapping("/room-status")
    public List<RoomStatusVO> selectRoomStatus(@RequestParam(value = "spaceNumber", required = false) String spaceNumber) {

        return waitService.selectRoomStatus(spaceNumber);
    }

    // 보류 처리했을 때 DB 업데이트 (보류사유/대기상태:보류)
    // 같은 진료실(SPACE_NUMBER)에서, 대기 중인 사람 중 순번이 가장 빠른 사람을 찾아서 입장 처리
    @PostMapping("/hold")
    public ResponseEntity<String> updateWaitToHold(@RequestBody HoldRequestVO request) {
        int updatedCount = waitService.updateWaitToHold(request.getMedicalNumber(), request.getHoldReason(),request.getSpaceNumber());

        if(updatedCount == 0) {
            return ResponseEntity.badRequest().body("해당 대기 정보를 찾을 수 없습니다.");
        }
        return ResponseEntity.ok("보류 처리되었습니다.");
    }

    // 보류 상태인 환자들 대기보류 현황(리스트)에 불러오기
    @GetMapping("/hold-list")
    public List<HoldListVO> selectHoldList() {
        return waitService.selectHoldList();
    }

    // 대기복귀 버튼 누르면 '대기' 상태로 넘어가기
    @PostMapping("/return")
    public ResponseEntity<String> returnFromHold(@RequestBody HoldRequestVO request) {
        int updatedCount = waitService.returnFromHold(
                request.getMedicalNumber(),
                request.getSpaceNumber()
                );
        if(updatedCount == 0) {
            return ResponseEntity.badRequest().body("해당 대기 정보를 찾을 수 없습니다.");
        }
        return ResponseEntity.ok("대기 복귀 처리되었습니다.");
    }

    // 다음순번으로 버튼을 누르면 본인은 대기상태로 돌아가고 본인을 제외한 다음사람 호출
    //    (만약 본인 혼자 있을경우는 다시 그냥 입장 처리되도록 서비스에서 처리)
    @PostMapping("/next")
    public ResponseEntity<String> callNextWaitingPatientExcludingOne(@RequestBody NextRequestVO request) {
        int updatedCount = waitService.callNextWaitingPatientExcludingOne(
                request.getMedicalNumber(),
                request.getSpaceNumber()
        );

        if(updatedCount == 0) {
            return ResponseEntity.badRequest().body("해당 대기 정보를 찾을 수 없습니다.");
        }
        return ResponseEntity.ok("다음 순번으로 처리되었습니다");
    }

    // 대기자 중에서 제일 빠른사람 자동 입장
    @PostMapping("/init")
    public void initRoomStatus() {
        waitService.initRoomStatus();
    }
}
