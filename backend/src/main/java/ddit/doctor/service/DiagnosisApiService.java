package ddit.doctor.service;

import ddit.doctor.vo.DiagnosisCodeVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class DiagnosisApiService {

    @Value("${hira.api.key}")
    private String apiKey;

    private static final String BASE_URL =
            "https://apis.data.go.kr/B551182/diseaseInfoService1/getDissNameCodeList1";

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public List<DiagnosisCodeVO> searchByName(String keyword) {
        List<DiagnosisCodeVO> combined = new ArrayList<>();
        combined.addAll(fetchBySickType(keyword, "1")); // 3단상병
        combined.addAll(fetchBySickType(keyword, "2")); // 4단상병

        // sickCd 기준으로 중복 제거
        Map<String, DiagnosisCodeVO> deduped = new LinkedHashMap<>();
        for (DiagnosisCodeVO vo : combined) {
            deduped.putIfAbsent(vo.getSickCd(), vo);
        }
        return new ArrayList<>(deduped.values());
    }

    public List<DiagnosisCodeVO> fetchBySickType(String keyword, String sickType) {
        String url = BASE_URL
                + "?serviceKey=" + apiKey
                + "&pageNo=1"
                + "&numOfRows=20"
                + "&sickType=" + sickType
                + "&medTp=1"
                + "&diseaseType=SICK_NM"
                + "&searchText=" + java.net.URLEncoder.encode(keyword, StandardCharsets.UTF_8);

        try {
            String response = restTemplate.getForObject(new URI(url), String.class);
            return parseJson(response);
        } catch (Exception e) {
            log.error("상병코드 API 호출 실패 (sickType={})", sickType, e);
            return new ArrayList<>();
        }
    }

    private List<DiagnosisCodeVO> parseJson(String json) throws Exception {
        List<DiagnosisCodeVO> result = new ArrayList<>();
        if (json == null || json.isBlank()) return result;

        JsonNode root = objectMapper.readTree(json);
        JsonNode body = root.path("response").path("body");
        int totalCount = body.path("totalCount").asInt(0);
        if (totalCount == 0) {
            return result;
        }

        JsonNode itemsNode = body.path("items").path("item");

        // 결과가 1건이면 item이 객체로, 여러 건이면 배열로 옴 (공공데이터 API 흔한 특징)
        if (itemsNode.isArray()) {
            for (JsonNode item : itemsNode) {
                result.add(toVO(item));
            }
        } else if (itemsNode.isObject()) {
            result.add(toVO(itemsNode));
        }

        return result;
    }

    private DiagnosisCodeVO toVO(JsonNode item) {
        return new DiagnosisCodeVO(
                item.path("sickCd").asText(""),
                item.path("sickNm").asText(""),
                item.path("sickEngNm").asText("")
        );
    }
}