package ddit.common;

/**
 * ============================================================
 * [커스텀 예외] DeletedCodeExistsException
 * ------------------------------------------------------------
 * "소프트 삭제(USED='N')되어 DB에는 남아있는 코드"를 다시 등록하려 할 때 던집니다.
 *
 * 왜 IllegalStateException 과 분리했나?
 *  - "활성 코드(USED='Y')라서 중복" → 그냥 막아야 함 (409)
 *  - "삭제 이력 코드(USED='N')라서 중복" → "복원하시겠습니까?" 안내 (409 + 분기)
 *  이 둘을 프론트가 구분할 수 있도록, 삭제 이력 케이스만 별도 예외로 빼서
 *  GlobalExceptionHandler 에서 errorCode='DELETED_CODE_EXISTS' 마커를 실어 보냅니다.
 * ============================================================
 */
public class DeletedCodeExistsException extends RuntimeException{
	
	private static final long serialVersionUID = 1L;
	  /** 충돌난 코드(PT01 등) — 프론트가 그대로 복원 API 호출에 쓸 수 있게 담아둠 */
	private final String code;
	
	public DeletedCodeExistsException(String code) {
		super("삭제 이력이 있는 코드입니다. 복원 후 사용하세요: " + code);
		this.code = code;
	}
	
	public String getCode() {
		return code;
	}

}
