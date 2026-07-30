package ddit.physicalTherapist.enums;

import lombok.extern.slf4j.Slf4j;

/**
 * 베드 상태 매핑: DB 한글값 ↔ FE 코드.
 * 상태가 추가/변경되면 "여기 한 곳"만 고치면 된다. (베드·대기열·시작·완료가 공용)
 */
@Slf4j
public enum BedStatus {
	
	OCCUPIED("사용중"),      // 코드(name) = OCCUPIED , DB 한글 = 사용중
    AVAILABLE("사용가능");    // 코드(name) = AVAILABLE, DB 한글 = 사용가능
	
	private final String dbLabel;
	
	private BedStatus(String dbLabel) {
		this.dbLabel = dbLabel;
	}
	
	public String dbLabel() {
		return this.dbLabel;
	}
	
	/**
     * DB 한글값 → FE 코드 문자열.
     * @param dbLabel 예: '사용중'
     * @return 예: "OCCUPIED". 매칭 안 되거나 null 이면 안전하게 "AVAILABLE".
     */
    public static String toCode(String dbLabel) {
    	for (BedStatus s : values()) {
    		if(s.dbLabel.equals(dbLabel)) {
    			return s.name();  // enum 상수명이 곧 FE 코드
    		}
    	}
    	log.warn("BedStatus 매칭 실패! DB에서 알 수 없는 라벨이 들어왔습니다: [{}]. 기본값(AVAILABLE)으로 대체합니다.", dbLabel);
    	return AVAILABLE.name();
    }

}
