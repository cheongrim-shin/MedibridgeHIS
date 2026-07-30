package ddit.patient.vo;

/*
 * 환자포털 Q&A 검색/페이징 VO
 *
 * 역할:
 * - Q&A 목록 검색 조건 저장
 * - 현재 페이지, 페이지 크기 저장
 * - Oracle 페이징용 startRow, endRow 계산
 *
 * 실제 QNA 테이블 기준 검색 컬럼:
 * - SUBJECT
 * - CATEGORY_CODE
 * - STATUS
 * - INQUIRER
 */
public class PatientQnaSearchVO {

	/*
	 * 로그인 사용자 회원번호
	 *
	 * QNA.INQUIRER 조건으로 사용한다.
	 * 사용자가 URL이나 form에서 넘기는 값이 아니라
	 * Controller에서 Spring Security 로그인 사용자 기준으로 세팅한다.
	 */
	private String inquirer;

	/*
	 * 제목 검색어
	 *
	 * QNA.SUBJECT LIKE 조건으로 사용한다.
	 */
	private String keyword;

	/*
	 * 문의 유형
	 *
	 * QNA.CATEGORY_CODE 조건으로 사용한다.
	 */
	private String categoryCode;

	/*
	 * 답변 상태
	 *
	 * 현재 DB 확인 결과:
	 * - WAIT
	 * - 답변대기
	 * - 답변완료
	 */
	private String status;

	/*
	 * 현재 페이지
	 */
	private int currentPage = 1;

	/*
	 * 한 페이지에 보여줄 개수
	 */
	private int rowSize = 5;

	/*
	 * 전체 게시글 수
	 */
	private int totalCount;

	/*
	 * 페이지 블록 크기
	 */
	private int pageBlockSize = 5;

	public String getInquirer() {
		return inquirer;
	}

	public void setInquirer(String inquirer) {
		this.inquirer = inquirer;
	}

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {

		if (keyword != null) {
			keyword = keyword.trim();
		}

		this.keyword = keyword;
	}

	public String getCategoryCode() {
		return categoryCode;
	}

	public void setCategoryCode(String categoryCode) {

		if (categoryCode != null) {
			categoryCode = categoryCode.trim();
		}

		this.categoryCode = categoryCode;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {

		if (status != null) {
			status = status.trim();
		}

		this.status = status;
	}

	public int getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(int currentPage) {

		if (currentPage < 1) {
			currentPage = 1;
		}

		this.currentPage = currentPage;
	}

	public int getRowSize() {
		return rowSize;
	}

	public void setRowSize(int rowSize) {

		if (rowSize < 1) {
			rowSize = 5;
		}

		if (rowSize > 20) {
			rowSize = 20;
		}

		this.rowSize = rowSize;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {

		if (totalCount < 0) {
			totalCount = 0;
		}

		this.totalCount = totalCount;
	}

	public int getPageBlockSize() {
		return pageBlockSize;
	}

	public void setPageBlockSize(int pageBlockSize) {

		if (pageBlockSize < 1) {
			pageBlockSize = 5;
		}

		this.pageBlockSize = pageBlockSize;
	}

	/*
	 * Oracle ROW_NUMBER 페이징 시작 번호
	 *
	 * 1페이지, rowSize 5 → 1
	 * 2페이지, rowSize 5 → 6
	 */
	public int getStartRow() {
		return (currentPage - 1) * rowSize + 1;
	}

	/*
	 * Oracle ROW_NUMBER 페이징 끝 번호
	 *
	 * 1페이지, rowSize 5 → 5
	 * 2페이지, rowSize 5 → 10
	 */
	public int getEndRow() {
		return currentPage * rowSize;
	}

	/*
	 * 전체 페이지 수
	 */
	public int getTotalPage() {

		if (totalCount == 0) {
			return 1;
		}

		return (int) Math.ceil((double) totalCount / rowSize);
	}

	/*
	 * 현재 페이지 블록 시작 페이지
	 */
	public int getStartPage() {
		return ((currentPage - 1) / pageBlockSize) * pageBlockSize + 1;
	}

	/*
	 * 현재 페이지 블록 끝 페이지
	 */
	public int getEndPage() {

		int endPage = getStartPage() + pageBlockSize - 1;

		if (endPage > getTotalPage()) {
			endPage = getTotalPage();
		}

		return endPage;
	}

	public boolean isHasPrev() {
		return getStartPage() > 1;
	}

	public boolean isHasNext() {
		return getEndPage() < getTotalPage();
	}
}