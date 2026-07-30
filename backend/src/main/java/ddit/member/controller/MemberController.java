package ddit.member.controller;

import ddit.member.dto.MemberSignupRequestDTO;
import ddit.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    // 회원가입 - REST 관례상 자원 생성이라 POST + 201 응답
    @PostMapping
    public ResponseEntity<Void> signup(@RequestBody MemberSignupRequestDTO request) {
        memberService.signup(request); // DTO 그대로 넘김
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}