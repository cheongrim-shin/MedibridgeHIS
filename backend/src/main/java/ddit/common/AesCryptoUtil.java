package ddit.common;

import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;
/**
 * 주민번호 "뒷 6자리" 전용 AES-256-GCM 암/복호화.
 * 저장 형태:  앞7자리(평문) + Base64(IV 12byte + 암호문 + 인증태그)
 *   - IV: 암호화마다 새 난수 → 같은 뒷자리도 매번 다른 암호문 (동일인 추정 차단)
 * ReceiptServiceImpl이 주입받아 등록 시 encryptRrn(), 서류발급 시 decryptRrn() 호출.
 */
@Component
public class AesCryptoUtil {
	
	private static final int PREFIX_LEN = 7; 
	private static final int IV_LENGTH = 12;  // GCM 권장 IV 96bit
	private static final int TAG_LENGTH_BIT = 128;  // 변조 감지용 인증 태그
	
	private final SecretKeySpec key;
	
	// 생성자 주입: 키가 없거나 길이가 틀리면 서버가 "부팅 단계"에서 실패(조기 발견)
	public AesCryptoUtil(@Value("${crypto.aes-key}") String base64Key) {
		byte[] keyBytes = Base64.getDecoder().decode(base64Key);
		if(keyBytes.length !=32) {
			throw new IllegalStateException("AES 키는 32바이트(AES-256)여야 합니다. 현재: " + keyBytes.length);
		}
		this.key = new SecretKeySpec(keyBytes, "AES");
	}
	
	// 평문 13자리 (앞7 평문 + 뒷6 암호문) INSERT 직전에 호출
	public String encryptRrn(String plainRrn13) {
		validate13(plainRrn13);
		String prefix = plainRrn13.substring(0, PREFIX_LEN); // 9202282  (그대로)
		String tail   = plainRrn13.substring(PREFIX_LEN);   // 234567   (암호화 대상)
		return prefix + encrypt(tail);
	}
	
	/** 저장형 → 평문 13자리 복원. 서류발급 등 원본 필요 시에만 호출 */
	public String decryptRrn(String stored) {
		if(stored == null || stored.length() <= PREFIX_LEN) {
			throw new IllegalArgumentException("저장된 주민번호 형식이 올바르지 않습니다.");
		}
		return stored.substring(0, PREFIX_LEN) + decrypt(stored.substring(PREFIX_LEN));
	}
	
	/** 중복확인 후보 조회용 앞7자리 */
	public String rrnPrefix(String plainRrn13) {
		validate13(plainRrn13);
        return plainRrn13.substring(0, PREFIX_LEN);
	}
	
	private void validate13(String rrn) {
		if(rrn ==null || !rrn.matches("\\d{13}")) {
			throw new IllegalArgumentException("주민등록번호는 숫자 13자리여야 합니다.");
		}
	}
	
	// ── 내부 구현: 일반 문자열 AES-GCM ────
	private String encrypt(String plain) {
		try {
			byte[] iv = new byte[IV_LENGTH];
			new SecureRandom().nextBytes(iv);	// 호출마다 새 IV
			Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
			cipher.init(Cipher.ENCRYPT_MODE, key, new GCMParameterSpec(TAG_LENGTH_BIT, iv));
			byte[] enc = cipher.doFinal(plain.getBytes(StandardCharsets.UTF_8));
			
			byte[] out = new byte[iv.length + enc.length];          // IV를 앞에 붙여 한 덩어리
            System.arraycopy(iv, 0, out, 0, iv.length);
            System.arraycopy(enc, 0, out, iv.length, enc.length);
            return Base64.getEncoder().encodeToString(out);
		}catch(Exception ex) {
			throw new IllegalStateException("암호화 실패", ex);
		}
	}
	
	private String decrypt(String base64) {
        try {
            byte[] in = Base64.getDecoder().decode(base64);
            Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
            cipher.init(Cipher.DECRYPT_MODE, key,
                    new GCMParameterSpec(TAG_LENGTH_BIT, in, 0, IV_LENGTH));  // 앞 12byte = IV
            byte[] plain = cipher.doFinal(in, IV_LENGTH, in.length - IV_LENGTH);
            return new String(plain, StandardCharsets.UTF_8);
        } catch (Exception e) {
            // 키 불일치·데이터 변조·평문(아직 마이그레이션 안 된 행) 모두 여기로
            throw new IllegalStateException("복호화 실패(키 불일치 또는 데이터 변조)", e);
        }
    }
}


