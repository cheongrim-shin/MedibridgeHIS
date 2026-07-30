package ddit.admin.vo;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/*
 * 관리자 공지사항 VO
 */
@Getter
@Setter
@ToString
public class AdminNoticeVO {

	private Integer noticeNumber;
	private String noticeTitle;
	private String noticeContent;
	private Date noticeDate;
	private Integer views;
	private String noticeCategory;
	private String noticeAuthor;
}