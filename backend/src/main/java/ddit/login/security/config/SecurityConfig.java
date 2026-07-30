package ddit.login.security.config;

import ddit.login.security.CustomUserDetailsService;
import ddit.login.security.jwt.JwtAuthenticationFilter;
import jakarta.servlet.DispatcherType;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.servlet.util.matcher.PathPatternRequestMatcher;

// 수업 - @EnableWebSecurity(debug=false), @EnableMethodSecurity 명시적으로 선언
// 현재 - 스프링 부트는 starter-security 의존성만 있으면 자동 활성화되어 생략
//        @EnableMethodSecurity(@PreAuthorize 등)는 컨트롤러에서 필요해지면 그때 추가
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomUserDetailsService customUserDetailsService;

    // 정적 리소스(static)는 필터 체인 건너뜀
    // HIS(React)는 별도 빌드/서빙이라 이 설정과 무관
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer()
    {
        var matcherBuilder = PathPatternRequestMatcher.withDefaults();
        return (web) -> web.ignoring()
                .requestMatchers(
                        // "/static/**" : 실제 요청 주소는 static이 없음
                        matcherBuilder.matcher("/css/**"),
                        matcherBuilder.matcher("/js/**"),
                        matcherBuilder.matcher("/images/**")
                );
    }

    /*
    수업 - BCryptPasswordEncoder 타입으로 직접 Bean 등록
    현재 - 인터페이스 타입(PasswordEncoder)으로 등록
         - 나중에 다른 구현체로 바꿔도 이 타입을 참조하는 다른 코드는 안 바뀌어도 됨
    */
    // 비밀번호 암호화 및 비교에 사용하는 공통 Encoder
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /*
    수업 - authenticationManager가 파라미터 3개 받지만 실제로는 필드(detailsServiceImpl) 사용, 일부 미사용
    현재 - 실제로 쓰는 PasswordEncoder만 파라미터로 받고, UserDetailsService는 생성자 주입 필드 사용
    */
    // 로그인 시 아이디/비번 검증
    @Bean
    public AuthenticationManager authenticationManager(PasswordEncoder passwordEncoder)
    {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider(customUserDetailsService); // 사용자 조회
        provider.setPasswordEncoder(passwordEncoder); // 비밀번호 비교
        return new ProviderManager(provider);
    }

    /*
     * 수업 - 체인 1개, 세션 기반(formLogin/logout/403 핸들러 등 전부 포함)
     * 현재 - HIS(React)와 환자(JSP)를 @Order로 분리한 체인 2개 구조
     *      - 이 체인(HIS)은 JWT 방식이라 formLogin/logout/커스텀 핸들러 불필요(로그인은 별도 API 컨트롤러 + JWT로 처리)
     */
    // ---------- Chain 1: HIS(React) 전용, JWT 인증 체인 ----------
    @Bean
    @Order(1)
    public SecurityFilterChain apiFilterChain(
            HttpSecurity http,
            JwtAuthenticationFilter jwtAuthenticationFilter
    ) throws Exception
    {
        http
                .securityMatcher("/api/**") // 리엑트
                .csrf(csrf -> csrf.disable()) // 세션/쿠키 안 씀 - CSRF 불필요
                .httpBasic(httpBasic -> httpBasic.disable()) // 기본 로그인 팝업 미사용
                .formLogin(formLogin -> formLogin.disable()) // 로그인은 별도 API+JWT로 처리
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // 세션 미생성, 매 요청 JWT로 인증
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/login", "/api/auth/reissue").permitAll() // 로그인
                        .requestMatchers(HttpMethod.POST, "/api/members").permitAll() // 회원가입(POST)만 예외, /members/**는 인증 필요
                        .requestMatchers(HttpMethod.GET, "/api/departments", "/api/positions").permitAll() // 회원가입 - 드롭다운 목록
                        .requestMatchers("/api/commoncode/**").authenticated() // 공통코드

                        // 경로 권한 제한 추가 =======================================================================
                        .requestMatchers("/api/admin/**").hasRole("ADMIN") // 관리자
                        .requestMatchers("/api/pharmacist/**").hasRole("CHEMIST") // 약사
                        .requestMatchers("/api/physical/**").hasRole("THERAPIST") //물리치료
                        .requestMatchers("/api/receptionist/**").hasRole("SERVICE") //원무
                        .requestMatchers("/api/doctor/**").hasRole("DOCTOR") // 의사
                        .requestMatchers("/api/injection-orders/**", "/api/wait/**").hasRole("NURSE") // 간호사

                        // 이 외 API는 로그인 필요 ===================================================================
                        .anyRequest().authenticated()
                )
                // 토큰 인증 실패
                .exceptionHandling(exception -> exception
                        // 로그인하지 않은 사용자의 API 접근 → 401 Unauthorized
                        .authenticationEntryPoint((
                                request,
                                response,
                                authException
                        ) -> response.setStatus(HttpServletResponse.SC_UNAUTHORIZED)) // 401(인증안됨)
                        // 로그인했지만 권한이 없는 사용자의 API 접근 → 403 Forbidden
                        .accessDeniedHandler((
                                request,
                                response,
                                accessDeniedException
                        ) -> response.setStatus(HttpServletResponse.SC_FORBIDDEN)) // 403(권한부족)
                )

                // JWT 인증 필터를 기본 로그인 필터보다 먼저 실행
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    /*
     * 수업 - formLogin + logout + 403 핸들러까지 전부 구성
     * 현재 - 환자(JSP)용 체인, formLogin 골격만 우선하고 커스텀 핸들러는 환자 로그인 화면 만들 때 추가 예정
     */
    // ---------- Chain 2: 환자(JSP) 전용, 세션 인증 체인 ----------
    @Bean
    @Order(2)
    public SecurityFilterChain sessionFilterChain(HttpSecurity http) throws Exception
    {
        http
                .authorizeHttpRequests(auth -> auth

                        // JSP로 이동하는 내부 FORWARD 및 오류 요청 허용
                        .dispatcherTypeMatchers(
                                DispatcherType.FORWARD,
                                DispatcherType.ERROR
                        ).permitAll()

                        // 로그인하지 않아도 접근 가능한 환자포털 화면
                        .requestMatchers(
                                "/patient",
                                "/patient/",
                                "/patient/main",
                                "/patient/login",
                                "/patient/signup",
                                "/patient/signup/**",

                                "/patient/notice/**",
                                "/patient/faq/**",
                                "/patient/guide/**",
                                "/patient/facility/**",
                                "/patient/fees/**",
                                "/patient/directions/**",

                                "/patient/css/**",
                                "/patient/js/**",
                                "/patient/images/**",
                                "/css/**",
                                "/js/**",
                                "/images/**",
                                "/favicon.ico"
                        ).permitAll()

                        // 나머지 환자 페이지는 로그인 필요
                        .anyRequest().authenticated()
                )

                .formLogin(form -> form
                        .loginPage("/patient/login")    // 로그인 페이지
                        .usernameParameter("memberId")  // input name="memberId"
                        .passwordParameter("password")  // input name="password"(default: password)
                        .defaultSuccessUrl("/patient/main", true) // 로그인 성공 시 이동할 페이지, true = 항상
                        .failureUrl("/patient/login?error=true")
                        .permitAll()
                )

                .logout(logout -> logout
                        .logoutUrl("/patient/logout") // 로그아웃 post 요청 경로 (세션 무효화)
                        .logoutSuccessUrl("/patient/main")
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                        .permitAll()
                );

        return http.build();
    }
}