package ddit.patient.vo;

/*
 * PatientFeeVO
 * 
 * 역할:
 * 환자포털 비급여 진료비용 화면에 출력할 항목 정보를 담는 VO
 * 
 * DB 기준:
 * COMMONCODE
 */
public class PatientFeeVO {

	private String commonCode;
	private String commonCodeNumber;
	private String groupName;
	private String itemName;
	private String itemDetail;
	private Integer unitPrice;
	private String coverageYn;
	private Integer durationMin;

	public String getCommonCode() {
		return commonCode;
	}

	public void setCommonCode(String commonCode) {
		this.commonCode = commonCode;
	}

	public String getCommonCodeNumber() {
		return commonCodeNumber;
	}

	public void setCommonCodeNumber(String commonCodeNumber) {
		this.commonCodeNumber = commonCodeNumber;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getItemDetail() {
		return itemDetail;
	}

	public void setItemDetail(String itemDetail) {
		this.itemDetail = itemDetail;
	}

	public Integer getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(Integer unitPrice) {
		this.unitPrice = unitPrice;
	}

	public String getCoverageYn() {
		return coverageYn;
	}

	public void setCoverageYn(String coverageYn) {
		this.coverageYn = coverageYn;
	}

	public Integer getDurationMin() {
		return durationMin;
	}

	public void setDurationMin(Integer durationMin) {
		this.durationMin = durationMin;
	}
}