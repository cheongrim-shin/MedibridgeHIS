package ddit.patient.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

@Configuration
public class PatientViewConfig {

    /**
     * Controller에서 "patient/login/form"처럼 반환한 논리 View 이름을
     * /WEB-INF/views/patient/login/form.jsp로 연결한다.
     */
    @Bean
    public InternalResourceViewResolver jspViewResolver() {

        InternalResourceViewResolver resolver =
                new InternalResourceViewResolver();

        resolver.setPrefix("/WEB-INF/views/");
        resolver.setSuffix(".jsp");

        return resolver;
    }
}