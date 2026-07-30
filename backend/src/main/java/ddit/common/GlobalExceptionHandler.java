package ddit.common;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice(basePackages ={
        "ddit.admin",               // 관리자
        "ddit.physicalTherapist",   // 물리치료
        "ddit.login",               // 로그인
        "ddit.receptionist",        // 원무과
        "ddit.pharmacist",          // 약사
        "ddit.common",             // 공통코드
        "ddit.doctor"
})
public class GlobalExceptionHandler {
	
	@ExceptionHandler(DeletedCodeExistsException.class)
	public ResponseEntity<Map<String, Object>> handleDeletedCode(DeletedCodeExistsException ex){
		log.info("DeletedCodeExists : {}", ex.getMessage());
		Map<String, Object> body = new HashMap<>();
		body.put("message", ex.getMessage());
		body.put("errorCode","DELETED_CODE_EXISTS"); 
		body.put("code", ex.getCode());
		return ResponseEntity.status(HttpStatus.CONFLICT).body(body); //409
	}
	
	/** 활성 코드 중복 등 "상태 충돌" → 409 */
    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<Map<String, Object>> handleConflict(IllegalStateException e) {
        log.info("Conflict : {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message", e.getMessage())); // 409
    }

    /** 입력값 검증 실패 → 400 */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> handleBadRequest(IllegalArgumentException e) {
        log.info("BadRequest : {}", e.getMessage());
        return ResponseEntity.badRequest().body(Map.of("message", e.getMessage())); // 400
    }

    /** 그 외 예상 못한 예외 → 500 (상세는 서버 로그로만, 사용자에겐 일반 안내) */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleEtc(Exception e) {
        log.error("Unexpected error", e); // 스택트레이스는 서버 로그에만 남김
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("message", "서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String,Object>> handleValid(MethodArgumentNotValidException e) {
        String msg = e.getBindingResult().getFieldErrors().get(0).getDefaultMessage();
        log.info("ValidationFail : {}", msg);
        return ResponseEntity.badRequest().body(Map.of("message", msg));   // 400
    }


}
