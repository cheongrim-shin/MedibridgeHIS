package ddit.physicalTherapist.enums;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public enum TreatmentStatus {

	WAIT("대기"),
	IN_PROGRESS("치료중"),
	DONE("치료완료");
	
	private final String dbLabel;

	private TreatmentStatus(String dbLabel) {
		this.dbLabel = dbLabel;
	}
	
	public String dbLabel() {
		return this.dbLabel;
	}
	
	/** DB 한글 → FE 코드. 매칭 실패/null 이면 기본 WAIT. */
	public static String toCode(String dbLabel) {
		for(TreatmentStatus s : values()) {
			if(s.dbLabel.equals(dbLabel)) return s.name();
		}
		log.warn("매칭 실패! DB에서 알 수 없는 라벨이 들어왔습니다: [{}] " ,dbLabel);
		return dbLabel;
	}
}
