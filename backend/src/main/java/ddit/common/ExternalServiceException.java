package ddit.common;

/**
 * ============================================================
 * [커스텀 예외] ExternalServiceException
 * ------------------------------------------------------------
 * 외부 시스템(LM Studio, 포트원 등) 호출이 실패했을 때 던집니다.
 *
 * 왜 IllegalStateException 과 분리했나?
 *  - IllegalStateException 은 "업무 규칙상 지금 할 수 없음" → 409 (사용자 잘못)
 *  - 외부 서버가 죽은 것은 사용자 잘못이 아님 → 503 (일시적 서버 문제)
 *  같은 예외로 묶으면 "AI 서버가 꺼져 있음"이 409로 나가서
 *  프론트가 사용자에게 잘못된 안내를 하게 됩니다.
 * ============================================================
 */
public class ExternalServiceException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public ExternalServiceException(String message, Throwable cause) {
		super(message, cause);
	}
}
