package ddit.physicalTherapist.enums;

/** 치료구분 매핑: DB 한글값 ↔ FE 코드 (베드 탭/대기열 필터의 기준) */
public enum TherapyType {

	GENERAL("일반치료"),
    TRACTION("견인치료");
	
	private final String dbLabel;

    TherapyType(String dbLabel) {
        this.dbLabel = dbLabel;
    }
    
    public String dbLabel() {
    	return this.dbLabel;
    }
    
    /**
     * DB 한글값 → FE 코드 문자열.
     * @param dbLabel 예: '견인치료'
     * @return 예: "TRACTION". 매칭 안 되거나 null 이면 기본 "GENERAL".
     */
    public static String toCode(String dbLabel) {
        for (TherapyType t : values()) {
            if (t.dbLabel.equals(dbLabel)) {
                return t.name();
            }
        }
        return GENERAL.name();       // 알 수 없는 값은 '일반치료'로 기본 처리
    }
}
