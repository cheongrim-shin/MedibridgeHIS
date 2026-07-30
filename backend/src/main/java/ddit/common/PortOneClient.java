package ddit.common;

import java.time.Duration;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import ddit.receptionist.vo.PortOnePayment;


@Component
public class PortOneClient {

	private final RestTemplate restTemplate;
    private final String apiSecret;

    public PortOneClient(@Value("${portone.api-secret}") String apiSecret) {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(Duration.ofSeconds(5));
        factory.setReadTimeout(Duration.ofSeconds(10));
        this.restTemplate = new RestTemplate(factory);
        this.apiSecret = apiSecret;
    }

    /** GET https://api.portone.io/payments/{paymentId} — 결제 단건조회(검증용) */
    public PortOnePayment getPayment(String paymentId) {
        HttpHeaders headers = new HttpHeaders();
        // 포트원 V2 인증: "PortOne {API Secret}"  (앞의 'PortOne ' 공백 포함)
        headers.set(HttpHeaders.AUTHORIZATION, "PortOne " + apiSecret);

        try {
            ResponseEntity<Map> res = this.restTemplate.exchange(
                    "https://api.portone.io/payments/" + paymentId,
                    HttpMethod.GET, new HttpEntity<>(headers), Map.class);

            Map<?, ?> body = res.getBody();
            if (body == null) throw new IllegalStateException("포트원 응답이 비었습니다.");

            // 응답 구조: { status, amount: { total, ... }, ... }
            PortOnePayment out = new PortOnePayment();
            out.setStatus(String.valueOf(body.get("status")));

            Object amountObj = body.get("amount");
            if (amountObj instanceof Map<?, ?> amount) {
                Object total = amount.get("total");
                out.setAmountTotal(total == null ? 0 : ((Number) total).longValue());
            }
            return out;

        } catch (RestClientException e) {
            throw new IllegalStateException("결제 정보를 확인할 수 없습니다. 잠시 후 다시 시도해 주세요.", e);
        }
    }
}
