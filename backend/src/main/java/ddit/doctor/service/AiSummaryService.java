package ddit.doctor.service;

import ddit.doctor.vo.MedicalRecordDetailVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
@Slf4j
@Service
@RequiredArgsConstructor
public class AiSummaryService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private static final String GEMINI_URL =
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent";

    private final RestTemplate restTemplate = new RestTemplate();

    public String summarize(List<MedicalRecordDetailVO> records) {
        if (records == null || records.isEmpty()) {
            return "요약할 진료 기록이 없습니다.";
        }

        String recordText = records.stream()
                .map(r -> String.format(
                        "[%s]%nS(주관적 증상): %s%nO(객관적 소견): %s%nA(평가/진단): %s%nP(계획/처치): %s",
                        r.getTreatmentDate(), r.getRegisterS(), r.getRegisterO(), r.getRegisterA(), r.getRegisterP()
                ))
                .collect(Collectors.joining("\n\n"));

        String prompt = "다음은 한 환자의 진료 기록입니다. 의사가 빠르게 파악할 수 있도록 핵심만 3~4문장으로 한국어로 요약해주세요.\n\n" + recordText;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // 키를 URL 대신 헤더로 보냄
        headers.set("x-goog-api-key", apiKey);

        Map<String, Object> body = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(Map.of("text", prompt)))
                )
        );
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        String url = GEMINI_URL + "?key=" + apiKey;

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

            List<Map> candidates = (List<Map>) response.getBody().get("candidates");
            Map firstCandidate= candidates.get(0);
            Map content = (Map) firstCandidate.get("content");
            List<Map> parts = (List<Map>) content.get("parts");
            Map firstPart = parts.get(0);
            return (String) firstPart.get("text");
        } catch (Exception e) {
            // e 자체를 log.error(e)처럼 통째로 넘기지 않는 게 포인트예요.
            // e.getClass().getSimpleName()은 "무슨 종류의 에러인지"만 알려주고
            // 요청 URL이나 헤더 값 같은 민감한 내용은 노출하지 않아요.
            log.error("Gemini API 호출 실패: {}", e.getClass().getSimpleName());
            return "AI 요약 생성 중 오류가 발생했습니다.";
        }
    }
}