package ddit.receptionist.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ddit.common.LmStudioClient;
import ddit.receptionist.mapper.AppointmentMapper;
import ddit.receptionist.vo.AiParseResultVO;
import ddit.receptionist.vo.AppointmentDoctorVO;
import tools.jackson.databind.ObjectMapper;

@Service
public class AppointmentAiService {

	@Autowired
	LmStudioClient lmStudioClient;
    @Autowired 
    AppointmentMapper appointmentMapper;   // 의사 목록
    
    private final ObjectMapper objectMapper = new ObjectMapper();
    
    /** 자연어 → 예약 항목 파싱 */
    public AiParseResultVO parseAppointment(String text) {
        //  의사 목록을 프롬프트에 넣어 "이 중에서만 고르게" 한다 
        List<AppointmentDoctorVO> doctors = this.appointmentMapper.selectDoctors();
        String doctorList = doctors.stream()
                .map(d -> String.format("- %s (번호:%s, %s)", d.getDoctorName(), 
                	 d.getDoctorNumber(), d.getDeptName()))
                .collect(Collectors.joining("\n"));

        String system = """
            너는 병원 예약 접수 보조원이다. 사용자의 한국어 문장에서 예약 정보를 뽑아
            아래 JSON 형식으로만 답하라. 설명·인사말·코드블록 없이 JSON만 출력한다.

            {"doctorNumber":"","patientName":"","reserveAt":"","durationMinutes":30,"symptoms":""}

            규칙:
            - reserveAt 형식은 반드시 "yyyy-MM-dd HH:mm" 이다.
            - 진료시간은 09:00~12:00, 14:00~18:00 이며 30분 단위(09:00, 09:30 …)로만 잡는다.
            - 일요일은 휴진이다.
            - doctorNumber는 아래 의사 목록의 번호 중에서만 고른다. 확실하지 않으면 빈 문자열.
            - 모르는 값은 빈 문자열로 둔다. 절대 지어내지 않는다.
            """;

        String user = String.format("""
            오늘 날짜: %s
            의사 목록:
            %s

            문장: %s
            """, LocalDate.now(), doctorList, text);

        String raw = this.lmStudioClient.chat(system, user);
        return parseJson(raw);
    }
    
    /** 증상 메모 정리·요약 */
    public String refineSymptoms(String text) {
        String system = """
            너는 의무기록 보조원이다. 환자가 말한 증상을 의료진이 보기 쉽게 정리한다.
            - 한국어 한두 문장으로 간결하게
            - 사실만 남기고 추측·진단은 하지 않는다
            - 정리한 문장만 출력한다 (설명·따옴표 없이)
            """;
        return this.lmStudioClient.chat(system, text).trim();
    }

    /** 모델이 코드블록을 붙이는 경우가 잦아 ```json 을 걷어낸 뒤 파싱 */
    private AiParseResultVO parseJson(String raw) {
        String json = raw.trim()
                .replaceAll("(?s)^```(?:json)?", "")
                .replaceAll("(?s)```$", "")
                .trim();
        // 앞뒤에 잡담이 섞여도 첫 { 부터 마지막 } 까지만 취한다
        int s = json.indexOf('{'), e = json.lastIndexOf('}');
        if (s < 0 || e < s) {
            throw new IllegalStateException("AI 응답을 이해하지 못했습니다. 문장을 조금 더 구체적으로 적어 주세요.");
        }
        try {
            return this.objectMapper.readValue(json.substring(s, e + 1), AiParseResultVO.class);
        } catch (Exception ex) {
            throw new IllegalStateException("AI 응답을 이해하지 못했습니다. 다시 시도해 주세요.", ex);
        }
    }
}
