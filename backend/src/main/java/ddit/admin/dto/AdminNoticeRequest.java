package ddit.admin.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/*
 * 관리자 공지사항 등록·수정 요청 DTO
 */
@Getter
@Setter
@ToString
public class AdminNoticeRequest {

	private String noticeTitle;
	private String noticeContent;
	private String noticeCategory;
}