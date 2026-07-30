package ddit.member.vo;

import lombok.Data;

/*
수업 - 권한(userAuthVOList)을 VO 안에 필드로 포함시킴
현재 - 권한을 별도 조회(AUTHORITY 테이블, MemberMapper.selectAuthoritiesByMemberNumber)로 분리
 */
@Data
public class MemberVO
{
    private String memberNumber;                // MEMBER_NUMBER - PK, 회원번호
    private String memberId;                    // MEMBER_ID - 아이디
    private String memberPassword;              // MEMBER_PASSWORD - 비밀번호 (BCrypt 암호화 저장)
    private String memberName;                  // MEMBER_NAME - 이름
    private String memberPhoneNumber;           // MEMBER_PHONE_NUMBER - 전화번호
    private String residentRegistrationNumber;  // RESIDENT_REGISTRATION_NUMBER - 주민번호
    private String primaryAddress;              // PRIMARY_ADDRESS - 기본주소
    private String detailedAddress;             // DETAILED_ADDRESS - 상세주소
    private String postalCode;                  // POSTAL_CODE - 우편번호
    private String accountStatus;               // ACCOUNT_STATUS - 계정활성상태 (default: 1 - 활성)
    private String memberStatus;                // MEMBER_STATUS - 회원상태
}
