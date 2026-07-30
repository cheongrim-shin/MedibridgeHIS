package ddit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling  //스케줄러 기능 활성화
@SpringBootApplication
public class MedibridgeHisbe2Application {

	public static void main(String[] args) {
		SpringApplication.run(MedibridgeHisbe2Application.class, args);
	}

}
