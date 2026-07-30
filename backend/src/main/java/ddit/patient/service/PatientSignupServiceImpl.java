package ddit.patient.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ddit.common.AesCryptoUtil;
import ddit.member.vo.MemberVO;
import ddit.patient.mapper.PatientSignupMapper;
import ddit.patient.vo.PatientSignupVO;

@Service
public class PatientSignupServiceImpl
        implements PatientSignupService {

    private static final int MIN_PASSWORD_LENGTH = 4;

    private final PatientSignupMapper patientSignupMapper;
    private final PasswordEncoder passwordEncoder;
    private final AesCryptoUtil aesCryptoUtil;

    public PatientSignupServiceImpl(
            PatientSignupMapper patientSignupMapper,
            PasswordEncoder passwordEncoder,
            AesCryptoUtil aesCryptoUtil) {

        this.patientSignupMapper = patientSignupMapper;
        this.passwordEncoder = passwordEncoder;
        this.aesCryptoUtil = aesCryptoUtil;
    }

    @Override
    public boolean isMemberIdAvailable(String memberId) {

        String normalizedMemberId = normalizeMemberId(memberId);

        if (!normalizedMemberId.matches("^[A-Za-z0-9_]{4,20}$")) {
            return false;
        }

        return patientSignupMapper.countByMemberId(
                normalizedMemberId) == 0;
    }

    @Override
    @Transactional
    public String signup(PatientSignupVO signupVO) {

        validateSignup(signupVO);

        String memberId = normalizeMemberId(
                signupVO.getMemberId());

        if (patientSignupMapper.countByMemberId(memberId) > 0) {
            throw new IllegalArgumentException(
                    "이미 사용 중인 아이디입니다.");
        }

        String plainRrn = signupVO.getPlainRrn();
        String rrnPrefix = aesCryptoUtil.rrnPrefix(plainRrn);

        List<MemberVO> candidates =
                patientSignupMapper
                        .selectPatientCandidatesByRrnPrefix(
                                rrnPrefix);

        MemberVO samePatient = findSamePatient(
                candidates,
                plainRrn);

        if (samePatient != null) {
            return connectExistingPatient(
                    samePatient,
                    signupVO,
                    memberId);
        }

        return createNewPatient(
                signupVO,
                memberId,
                plainRrn);
    }

    private String connectExistingPatient(
            MemberVO existingPatient,
            PatientSignupVO signupVO,
            String memberId) {

        if (isPortalAccountRegistered(existingPatient)) {
            throw new IllegalStateException(
                    "이미 회원가입이 완료된 환자입니다.");
        }

        String existingName = trimToEmpty(
                existingPatient.getMemberName());

        String inputName = trimToEmpty(
                signupVO.getMemberName());

        if (!existingName.equals(inputName)) {
            throw new IllegalArgumentException(
                    "기존 환자정보와 이름이 일치하지 않습니다.");
        }

        existingPatient.setMemberId(memberId);
        existingPatient.setMemberPassword(
                passwordEncoder.encode(
                        signupVO.getPassword()));

        existingPatient.setMemberName(inputName);
        existingPatient.setMemberPhoneNumber(
                normalizePhone(
                        signupVO.getMemberPhoneNumber()));

        existingPatient.setPrimaryAddress(
                signupVO.getPrimaryAddress().trim());

        existingPatient.setDetailedAddress(
                trimToNull(
                        signupVO.getDetailedAddress()));

        existingPatient.setPostalCode(
                signupVO.getPostalCode().trim());

        existingPatient.setAccountStatus("Y");
        existingPatient.setMemberStatus("환자");

        int result = patientSignupMapper
                .updatePatientPortalAccount(
                        existingPatient);

        if (result != 1) {
            throw new IllegalStateException(
                    "기존 환자 계정 연결에 실패했습니다.");
        }

        return existingPatient.getMemberNumber();
    }

    private String createNewPatient(
            PatientSignupVO signupVO,
            String memberId,
            String plainRrn) {

        int nextSuffix = patientSignupMapper
                .selectNextPatientMemberNumberSuffix();

        String memberNumber = String.format(
                "M02-%02d",
                nextSuffix);

        MemberVO member = new MemberVO();

        member.setMemberNumber(memberNumber);
        member.setMemberId(memberId);
        member.setMemberPassword(
                passwordEncoder.encode(
                        signupVO.getPassword()));

        member.setMemberName(
                signupVO.getMemberName().trim());

        member.setMemberPhoneNumber(
                normalizePhone(
                        signupVO.getMemberPhoneNumber()));

        member.setResidentRegistrationNumber(
                aesCryptoUtil.encryptRrn(plainRrn));

        member.setPrimaryAddress(
                signupVO.getPrimaryAddress().trim());

        member.setDetailedAddress(
                trimToNull(
                        signupVO.getDetailedAddress()));

        member.setPostalCode(
                signupVO.getPostalCode().trim());

        member.setAccountStatus("Y");
        member.setMemberStatus("환자");

        int result = patientSignupMapper
                .insertPatientMember(member);

        if (result != 1) {
            throw new IllegalStateException(
                    "환자 회원가입에 실패했습니다.");
        }

        return memberNumber;
    }

    private MemberVO findSamePatient(
            List<MemberVO> candidates,
            String plainRrn) {

        if (candidates == null) {
            return null;
        }

        for (MemberVO candidate : candidates) {

            String storedRrn =
                    candidate
                            .getResidentRegistrationNumber();

            if (matchesRrn(storedRrn, plainRrn)) {
                return candidate;
            }
        }

        return null;
    }

    private boolean matchesRrn(
            String storedRrn,
            String plainRrn) {

        if (storedRrn == null
                || storedRrn.isBlank()) {
            return false;
        }

        if (storedRrn.matches("\\d{13}")) {
            return storedRrn.equals(plainRrn);
        }

        try {
            return aesCryptoUtil
                    .decryptRrn(storedRrn)
                    .equals(plainRrn);
        } catch (RuntimeException exception) {
            return false;
        }
    }

    private boolean isPortalAccountRegistered(
            MemberVO member) {

        String memberId = trimToEmpty(
                member.getMemberId());

        String memberNumber = trimToEmpty(
                member.getMemberNumber());

        String password = trimToEmpty(
                member.getMemberPassword());

        boolean customLoginId =
                !memberId.isBlank()
                && !memberId.equals(memberNumber);

        boolean bcryptPassword =
                password.startsWith("$2a$")
                || password.startsWith("$2b$")
                || password.startsWith("$2y$");

        return customLoginId && bcryptPassword;
    }

    private void validateSignup(
            PatientSignupVO signupVO) {

        if (signupVO == null) {
            throw new IllegalArgumentException(
                    "회원가입 정보가 없습니다.");
        }

        String memberId = normalizeMemberId(
                signupVO.getMemberId());

        if (!memberId.matches("^[A-Za-z0-9_]{4,20}$")) {
            throw new IllegalArgumentException(
                    "아이디는 영문, 숫자, 밑줄을 사용해 4~20자로 입력해 주세요.");
        }

        if (signupVO.getPassword() == null
                || signupVO.getPassword().length()
                    < MIN_PASSWORD_LENGTH) {

            throw new IllegalArgumentException(
                    "비밀번호는 "
                    + MIN_PASSWORD_LENGTH
                    + "자 이상이어야 합니다.");
        }

        if (!signupVO.getPassword().equals(
                signupVO.getPasswordConfirm())) {

            throw new IllegalArgumentException(
                    "비밀번호 확인이 일치하지 않습니다.");
        }

        if (signupVO.getMemberName() == null
                || signupVO.getMemberName().isBlank()) {

            throw new IllegalArgumentException(
                    "이름을 입력해 주세요.");
        }

        if (!signupVO.getPlainRrn()
                .matches("^\\d{13}$")) {

            throw new IllegalArgumentException(
                    "주민등록번호는 숫자 13자리로 입력해 주세요.");
        }

        String phone = normalizePhone(
                signupVO.getMemberPhoneNumber());

        if (!phone.matches("^01[0-9]\\d{7,8}$")) {
            throw new IllegalArgumentException(
                    "휴대폰 번호 형식이 올바르지 않습니다.");
        }

        if (signupVO.getPostalCode() == null
                || signupVO.getPostalCode().isBlank()) {

            throw new IllegalArgumentException(
                    "우편번호를 입력해 주세요.");
        }

        if (signupVO.getPrimaryAddress() == null
                || signupVO.getPrimaryAddress().isBlank()) {

            throw new IllegalArgumentException(
                    "기본주소를 입력해 주세요.");
        }
    }

    private String normalizeMemberId(String memberId) {
        return memberId == null
                ? ""
                : memberId.trim();
    }

    private String normalizePhone(String phone) {
        return phone == null
                ? ""
                : phone.replaceAll("[^0-9]", "");
    }

    private String trimToEmpty(String value) {
        return value == null
                ? ""
                : value.trim();
    }

    private String trimToNull(String value) {

        if (value == null
                || value.isBlank()) {
            return null;
        }

        return value.trim();
    }
}
