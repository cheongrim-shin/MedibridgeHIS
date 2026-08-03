package ddit.common;

import java.time.Duration;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class LmStudioClient {

	private final RestTemplate restTemplate;
    private final String baseUrl;
    private final String model;
    
    public LmStudioClient(@Value("${lmstudio.base-url}") String baseUrl,
				          @Value("${lmstudio.model}") String model,
				          @Value("${lmstudio.timeout-ms}") long timeoutMs) {
    	SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
    	factory.setConnectTimeout(Duration.ofSeconds(5));
    	factory.setReadTimeout(Duration.ofMillis(timeoutMs));
    	this.restTemplate = new RestTemplate(factory);
    	this.baseUrl = baseUrl;
    	this.model = model;
    }
    
    /**
     * @param systemPrompt 역할 지시(문법·출력형식)
     * @param userPrompt   실제 입력
     * @return 모델이 낸 텍스트
     */
    public String chat(String systemPrompt, String userPrompt) {
    	log.debug("AI 요청 : model={}, userPrompt={}", model, userPrompt);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = Map.of(
                "model", model,
                "messages", List.of(
                        Map.of("role", "system", "content", systemPrompt),
                        Map.of("role", "user",   "content", userPrompt)
                ),
                "temperature", 0.2   // 파싱 용도라 창의성 최소화 — 값이 낮을수록 일관된 답
        );
        
        long startedAt = System.currentTimeMillis();  //소요시간 확인

        try {
            ResponseEntity<Map> res = this.restTemplate.postForEntity(
                    baseUrl + "/chat/completions", new HttpEntity<>(body, headers), Map.class);

            // 응답 구조: choices[0].message.content
            // 무검증 캐스팅은 형식이 조금만 달라도 NPE로 터지므로 단계마다 확인한다
            Object choicesObj = res.getBody() == null ? null : res.getBody().get("choices");
            if (!(choicesObj instanceof List<?> choices) || choices.isEmpty()) {
                throw new IllegalStateException("LLM 응답이 비어 있습니다.");
            }
            Object first = choices.get(0);
            if (!(first instanceof Map<?, ?> firstMap)) throw new IllegalStateException("LLM 응답 형식 오류");
            Object msg = firstMap.get("message");
            if (!(msg instanceof Map<?, ?> msgMap)) throw new IllegalStateException("LLM 응답 형식 오류");
            Object content = msgMap.get("content");
            if (content == null) throw new IllegalStateException("LLM 응답 본문이 없습니다.");
            
            String result = content.toString();
            long elapsed = System.currentTimeMillis() - startedAt;
            log.debug("AI 응답 : {}ms, content={}", elapsed, result);
            return result;

        } catch (RestClientException e) {
        	long elapsed = System.currentTimeMillis() - startedAt;
        	log.warn("LM Studio 호출 실패: {}ms, {}", elapsed, e.getMessage(), e);
            throw new ExternalServiceException("AI 서버에 연결할 수 없습니다. LM Studio 실행 여부를 확인해 주세요.", e);
        }       
    }
}
