package ddit.common;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration    // 스프링이 이 클래스를 설정 파일로 인식하고 자동으로 읽어들임
public class CorsConfig implements WebMvcConfigurer {
	/*
	 * React(기본포트 5173) <--> 스프링부트(포트 80) 간 포트 틀림으로인해 접근x 를 허용설정...
	 * 프론트 개발서버에서 백엔드 api 호추 시 브라우저가 차단하지않도록 설정해야함 
	 * 
	 */
	

	
	// 해당 메서드 재정의 할때 상단의 source -> Override/Implement Methods... 로 가져오시면됩니다
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/api/**") //  어떤 URL 패턴에 CORS를 적용할지 지정,/api/로 시작하는 모든 요청에 적용

				.allowedOrigins("http://localhost:5173","http://127.0.0.1:5173",
								"http://localhost:5174", "http://127.0.0.1:5174",
								"http://192.168.36.206:5173"
						)
				.allowedOriginPatterns(   // 개발 환경 용 와일드카드 사용(이 후 삭제)

						"http://localhost:*",
						"http://127.0.0.1:*",
						"http://192.168.36.206:*"
				)
				                //어떤 출처(프론트 주소)에서 오는 요청을 허용할지 지정 => 배포시에는 실제도메인 (ex:https://medibridge.com) 교체 
				.allowedMethods("GET","POST","PUT","DELETE","PATCH","OPTIONS")
				                //허용하는 http 메서드 지정 options의 경우 사전요청
				.allowedHeaders("*")
				                //어떤 HTTP 헤더를 허용할지 지정(content-type, authorization 등등 ...
				.allowCredentials(true);
		                       // 쿠키, 인증 정보(세션, 토큰 등)를 포함한 요청을 허용할지 여부
	
	}


}
