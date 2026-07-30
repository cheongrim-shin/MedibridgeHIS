package ddit.login;




import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordHashTest {

    @Test
    void generateHash() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "pass1234";
        String hash = encoder.encode(rawPassword);
        System.out.println("생성된 해시: " + hash);
    }
}