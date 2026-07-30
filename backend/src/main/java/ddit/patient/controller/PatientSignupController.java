package ddit.patient.controller;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import ddit.patient.service.PatientSignupService;
import ddit.patient.vo.PatientSignupVO;
import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/patient/signup")
public class PatientSignupController {

    private static final String SESSION_PREPARED_ID =
            "PORTONE_PREPARED_ID";

    private static final String SESSION_VERIFIED_PROFILE =
            "PORTONE_VERIFIED_PROFILE";

    /*
     * DB 테이블 추가 없이 동일 서버 실행 중 재사용을 차단한다.
     * 운영 환경에서는 DI 또는 CI를 DB에 보관해 중복 가입을 막는 것이 안전하다.
     */
    private static final Set<String> CONSUMED_VERIFICATION_IDS =
            ConcurrentHashMap.newKeySet();

    private final PatientSignupService patientSignupService;
    private final ObjectMapper objectMapper;
    private final HttpClient httpClient;

    private final String portOneStoreId;
    private final String portOneChannelKey;
    private final String portOneApiSecret;

    public PatientSignupController(
            PatientSignupService patientSignupService,
            ObjectMapper objectMapper,
            @Value("${portone.store-id:${PORTONE_STORE_ID:}}")
            String portOneStoreId,
            @Value("${portone.channel-key:${PORTONE_CHANNEL_KEY:}}")
            String portOneChannelKey,
            @Value("${portone.api-secret:${PORTONE_API_SECRET:}}")
            String portOneApiSecret) {

        this.patientSignupService = patientSignupService;
        this.objectMapper = objectMapper;
        this.portOneStoreId = portOneStoreId;
        this.portOneChannelKey = portOneChannelKey;
        this.portOneApiSecret = portOneApiSecret;

        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .build();
    }

    /*
     * 회원가입 화면
     * GET /patient/signup
     */
    @GetMapping
    public String signupForm(Model model) {

        if (!model.containsAttribute("signup")) {
            model.addAttribute(
                    "signup",
                    new PatientSignupVO());
        }

        return "patient/signup/form";
    }

    /*
     * 아이디 중복 확인
     * GET /patient/signup/check-id?memberId=patient01
     */
    @GetMapping("/check-id")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> checkMemberId(
            @RequestParam String memberId) {

        String normalizedMemberId =
                memberId == null ? "" : memberId.trim();

        if (!normalizedMemberId.matches(
                "^[A-Za-z0-9_]{4,20}$")) {

            throw new IllegalArgumentException(
                    "아이디는 영문, 숫자, 밑줄 4~20자로 입력해 주세요.");
        }

        boolean available =
                patientSignupService.isMemberIdAvailable(
                        normalizedMemberId);

        Map<String, Object> result =
                new LinkedHashMap<>();

        result.put("available", available);
        result.put(
                "message",
                available
                        ? "사용 가능한 아이디입니다."
                        : "이미 사용 중인 아이디입니다.");

        return ResponseEntity.ok(result);
    }

    /*
     * PortOne 본인인증 요청 전에 서버가 인증 ID를 발급한다.
     *
     * 브라우저가 임의의 다른 인증 ID를 제출하지 못하도록
     * 세션에 준비된 ID를 저장한다.
     */
    @PostMapping("/identity/prepare")
    @ResponseBody
    public ResponseEntity<Map<String, Object>>
            prepareIdentityVerification(
                    HttpSession session) {

        validatePortOneConfiguration();

        String identityVerificationId =
                "mb" + UUID.randomUUID()
                        .toString()
                        .replace("-", "");

        session.setAttribute(
                SESSION_PREPARED_ID,
                identityVerificationId);

        session.removeAttribute(
                SESSION_VERIFIED_PROFILE);

        Map<String, Object> result =
                new LinkedHashMap<>();

        result.put(
                "storeId",
                portOneStoreId);

        result.put(
                "channelKey",
                portOneChannelKey);

        result.put(
                "identityVerificationId",
                identityVerificationId);

        return ResponseEntity.ok(result);
    }

    /*
     * 브라우저 인증창이 완료된 뒤 호출한다.
     *
     * 브라우저 응답만 믿지 않고 PortOne REST API를 서버에서 호출해
     * status가 VERIFIED인지 다시 검증한다.
     */
    @PostMapping(
            value = "/identity/complete",
            consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<Map<String, Object>>
            completeIdentityVerification(
                    @RequestBody Map<String, String> body,
                    HttpSession session) {

        validatePortOneConfiguration();

        String identityVerificationId =
                trim(body.get(
                        "identityVerificationId"));

        if (!identityVerificationId.matches(
                "^[A-Za-z0-9]{1,40}$")) {

            throw new IllegalArgumentException(
                    "올바르지 않은 본인인증 번호입니다.");
        }

        String preparedId =
                (String) session.getAttribute(
                        SESSION_PREPARED_ID);

        if (preparedId == null
                || !preparedId.equals(
                        identityVerificationId)) {

            throw new IllegalStateException(
                    "현재 회원가입 화면에서 시작한 인증이 아닙니다.");
        }

        if (CONSUMED_VERIFICATION_IDS.contains(
                identityVerificationId)) {

            throw new IllegalStateException(
                    "이미 회원가입에 사용된 본인인증입니다.");
        }

        JsonNode identityVerification =
                requestIdentityVerification(
                        identityVerificationId);

        String status =
                identityVerification
                        .path("status")
                        .asText("");

        if (!"VERIFIED".equals(status)) {
            throw new IllegalStateException(
                    "본인인증이 완료되지 않았습니다.");
        }

        JsonNode verifiedCustomer =
                identityVerification.path(
                        "verifiedCustomer");

        String name =
                verifiedCustomer
                        .path("name")
                        .asText("");

        String phoneNumber =
                normalizePhone(
                        verifiedCustomer
                                .path("phoneNumber")
                                .asText(""));

        String birthDate =
                verifiedCustomer
                        .path("birthDate")
                        .asText("");

        String ci =
                verifiedCustomer
                        .path("ci")
                        .asText("");

        String di =
                verifiedCustomer
                        .path("di")
                        .asText("");

        if (name.isBlank()
                || phoneNumber.isBlank()
                || birthDate.isBlank()) {

            throw new IllegalStateException(
                    "인증기관에서 필수 본인정보를 받지 못했습니다.");
        }

        VerifiedIdentityProfile profile =
                new VerifiedIdentityProfile(
                        identityVerificationId,
                        name,
                        phoneNumber,
                        birthDate,
                        ci,
                        di);

        session.setAttribute(
                SESSION_VERIFIED_PROFILE,
                profile);

        Map<String, Object> result =
                new LinkedHashMap<>();

        result.put("verified", true);
        result.put(
                "identityVerificationId",
                identityVerificationId);

        result.put(
                "name",
                name);

        result.put(
                "phoneNumber",
                phoneNumber);

        result.put(
                "birthDate",
                birthDate);

        result.put(
                "message",
                "실제 본인인증이 완료되었습니다.");

        return ResponseEntity.ok(result);
    }

    /*
     * 회원가입 처리
     * POST /patient/signup
     */
    @PostMapping
    public String signup(
            @ModelAttribute("signup")
            PatientSignupVO signupVO,
            @RequestParam String memberName,
            @RequestParam String memberPhoneNumber,
            @RequestParam String rrnFront,
            @RequestParam String rrnBack,
            @RequestParam(
                    name = "identityVerificationId",
                    required = false)
            String identityVerificationId,
            Model model,
            RedirectAttributes redirectAttributes,
            HttpSession session) {

        try {
            VerifiedIdentityProfile profile =
                    validateVerifiedIdentity(
                            memberName,
                            memberPhoneNumber,
                            rrnFront,
                            rrnBack,
                            identityVerificationId,
                            session);

            String memberNumber =
                    patientSignupService.signup(
                            signupVO);

            CONSUMED_VERIFICATION_IDS.add(
                    profile.identityVerificationId);

            session.removeAttribute(
                    SESSION_PREPARED_ID);

            session.removeAttribute(
                    SESSION_VERIFIED_PROFILE);

            redirectAttributes.addFlashAttribute(
                    "signupMemberNumber",
                    memberNumber);

            return "redirect:/patient/login?signup=true";

        } catch (
                IllegalArgumentException
                | IllegalStateException exception) {

            model.addAttribute(
                    "signupError",
                    exception.getMessage());

            return "patient/signup/form";
        }
    }

    private VerifiedIdentityProfile
            validateVerifiedIdentity(
                    String memberName,
                    String memberPhoneNumber,
                    String rrnFront,
                    String rrnBack,
                    String identityVerificationId,
                    HttpSession session) {

        VerifiedIdentityProfile profile =
                (VerifiedIdentityProfile)
                        session.getAttribute(
                                SESSION_VERIFIED_PROFILE);

        if (profile == null) {
            throw new IllegalStateException(
                    "실제 본인인증을 완료해 주세요.");
        }

        if (identityVerificationId == null
                || !profile.identityVerificationId
                        .equals(
                                identityVerificationId)) {

            throw new IllegalStateException(
                    "본인인증 정보가 일치하지 않습니다.");
        }

        if (CONSUMED_VERIFICATION_IDS.contains(
                identityVerificationId)) {

            throw new IllegalStateException(
                    "이미 사용된 본인인증입니다.");
        }

        if (!normalizeName(memberName)
                .equals(
                        normalizeName(profile.name))) {

            throw new IllegalStateException(
                    "입력한 이름과 본인인증 이름이 다릅니다.");
        }

        if (!normalizePhone(memberPhoneNumber)
                .equals(profile.phoneNumber)) {

            throw new IllegalStateException(
                    "입력한 휴대폰 번호와 본인인증 번호가 다릅니다.");
        }

        String inputBirthDate =
                birthDateFromRrn(
                        rrnFront,
                        rrnBack);

        if (!inputBirthDate.equals(
                profile.birthDate)) {

            throw new IllegalStateException(
                    "입력한 주민등록번호 생년월일과 본인인증 정보가 다릅니다.");
        }

        return profile;
    }

    private JsonNode requestIdentityVerification(
            String identityVerificationId) {

        try {
            URI uri = URI.create(
                    "https://api.portone.io"
                    + "/identity-verifications/"
                    + identityVerificationId);

            HttpRequest request =
                    HttpRequest.newBuilder(uri)
                            .timeout(
                                    Duration.ofSeconds(15))
                            .header(
                                    "Authorization",
                                    "PortOne "
                                            + portOneApiSecret)
                            .header(
                                    "Accept",
                                    "application/json")
                            .GET()
                            .build();

            HttpResponse<String> response =
                    httpClient.send(
                            request,
                            HttpResponse.BodyHandlers
                                    .ofString(
                                            StandardCharsets.UTF_8));

            if (response.statusCode() < 200
                    || response.statusCode() >= 300) {

                throw new IllegalStateException(
                        "PortOne 인증정보 조회에 실패했습니다. "
                        + "응답코드: "
                        + response.statusCode());
            }

            return objectMapper.readTree(
                    response.body());

        } catch (InterruptedException exception) {

            Thread.currentThread().interrupt();

            throw new IllegalStateException(
                    "본인인증 조회가 중단되었습니다.");

        } catch (IllegalStateException exception) {

            throw exception;

        } catch (Exception exception) {

            throw new IllegalStateException(
                    "본인인증 결과를 확인하지 못했습니다.");
        }
    }

    private void validatePortOneConfiguration() {

        if (portOneStoreId == null
                || portOneStoreId.isBlank()) {

            throw new IllegalStateException(
                    "PORTONE_STORE_ID가 설정되지 않았습니다.");
        }

        if (portOneChannelKey == null
                || portOneChannelKey.isBlank()) {

            throw new IllegalStateException(
                    "PORTONE_CHANNEL_KEY가 설정되지 않았습니다.");
        }

        if (portOneApiSecret == null
                || portOneApiSecret.isBlank()
                || portOneApiSecret.startsWith(
                        "unused")) {

            throw new IllegalStateException(
                    "실제 PORTONE_API_SECRET이 설정되지 않았습니다.");
        }
    }

    private String birthDateFromRrn(
            String rrnFront,
            String rrnBack) {

        String front =
                digits(rrnFront);

        String back =
                digits(rrnBack);

        if (!front.matches("^\\d{6}$")
                || !back.matches("^\\d{7}$")) {

            throw new IllegalArgumentException(
                    "주민등록번호 형식을 확인해 주세요.");
        }

        char centuryCode =
                back.charAt(0);

        String century;

        if ("1256".indexOf(centuryCode) >= 0) {
            century = "19";
        } else if ("3478".indexOf(
                centuryCode) >= 0) {
            century = "20";
        } else if ("90".indexOf(
                centuryCode) >= 0) {
            century = "18";
        } else {
            throw new IllegalArgumentException(
                    "주민등록번호 뒷자리 형식을 확인해 주세요.");
        }

        return century
                + front.substring(0, 2)
                + "-"
                + front.substring(2, 4)
                + "-"
                + front.substring(4, 6);
    }

    private String normalizeName(String value) {

        return trim(value)
                .replaceAll("\\s+", "");
    }

    private String normalizePhone(String value) {

        return digits(value);
    }

    private String digits(String value) {

        return value == null
                ? ""
                : value.replaceAll("[^0-9]", "");
    }

    private String trim(String value) {

        return value == null
                ? ""
                : value.trim();
    }

    private Map<String, Object> message(
            String message) {

        Map<String, Object> result =
                new LinkedHashMap<>();

        result.put("message", message);

        return result;
    }

    @ExceptionHandler(
            IllegalArgumentException.class)
    @ResponseBody
    public ResponseEntity<Map<String, Object>>
            handleIllegalArgument(
                    IllegalArgumentException exception) {

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(
                        message(
                                exception.getMessage()));
    }

    @ExceptionHandler(
            IllegalStateException.class)
    @ResponseBody
    public ResponseEntity<Map<String, Object>>
            handleIllegalState(
                    IllegalStateException exception) {

        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(
                        message(
                                exception.getMessage()));
    }

    /*
     * 별도 Java 파일을 만들지 않기 위한 내부 클래스다.
     */
    private static final class
            VerifiedIdentityProfile {

        private final String identityVerificationId;
        private final String name;
        private final String phoneNumber;
        private final String birthDate;
        private final String ci;
        private final String di;

        private VerifiedIdentityProfile(
                String identityVerificationId,
                String name,
                String phoneNumber,
                String birthDate,
                String ci,
                String di) {

            this.identityVerificationId =
                    identityVerificationId;

            this.name = name;
            this.phoneNumber = phoneNumber;
            this.birthDate = birthDate;
            this.ci = ci;
            this.di = di;
        }
    }
}