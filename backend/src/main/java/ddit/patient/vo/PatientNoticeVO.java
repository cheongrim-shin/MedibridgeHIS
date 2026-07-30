package ddit.patient.vo;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/*
 * 환자포털 공지사항 VO
 */
@Getter
@Setter
@ToString
public class PatientNoticeVO {
	
	private Integer noticeNumber;
	private String noticeCode;
	private String noticeTitle;
	private String noticeContent;
	private Date noticeDate;
	private Integer views;
	private String noticeCategory;
	private String employeeCode;
	
	/*
	 * 기존 noticeNo 사용 코드 호환용
	 */
	public Integer getNoticeNo() {
		return noticeNumber;
	}

	public void setNoticeNo(Integer noticeNo) {
		this.noticeNumber = noticeNo;
	}

	/*
	 * 기존 title 사용 코드 호환용
	 */
	public String getTitle() {
		return noticeTitle;
	}

	public void setTitle(String title) {
		this.noticeTitle = title;
	}

	/*
	 * 기존 content 사용 코드 호환용
	 */
	public String getContent() {
		return noticeContent;
	}

	public void setContent(String content) {
		this.noticeContent = content;
	}

	/*
	 * 기존 category 사용 코드 호환용
	 */
	public String getCategory() {
		return noticeCategory;
	}

	public void setCategory(String category) {
		this.noticeCategory = category;
	}
}