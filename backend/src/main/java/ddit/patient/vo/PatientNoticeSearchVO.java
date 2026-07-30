package ddit.patient.vo;

/*
 * PatientNoticeSearchVO
 * 
 * 역할: 공지사항 목록 조회 시 검색 조건과 페이징 정보를 담는 객체
 * 
 * 나중에 DB 조회할 때 검색어, 현재 페이지, 한 페이지당 개수, 시작 행 번호를 Mapper로 넘긴다
 */
public class PatientNoticeSearchVO {
	
	//검색 타입
	//예: title,content,all
	private String searchType;
	
	//검색어
	private String keyword;
	
	//현재 페이지
	private int currentPage=1;
	
	//한 페이지당 게시글 수
	private int size=10;
	
	//전체 게시글 수
	private int totalCount;
	
	//시작 행 번호
	private int startRow;
	
	//끝 행 번호
	private int endRow;
	
	public PatientNoticeSearchVO() {
	}
	
	/*
	 * 페이징 계산
	 * 
	 * currentPage=1, size=10이면
	 * startRow=1
	 * endRow=10
	 * 
	 * currentPage=2, size=10이면
	 * startRow=11
	 * endRow=20
	 */
	public void caculatePaging() {
		this.startRow= (this.currentPage -1)*this.size +1;
		this.endRow= this.currentPage * this.size;
	}
	
	public String getSearchType() {
		return searchType;
	}
	
	public void setSearchType(String searchType) {
		this.searchType= searchType;
	}
	
	public String getKeyword() {
		return keyword;
	}
	
	public void setKeyword(String keyword) {
		this.keyword= keyword;
	}
	
	public int getCurrentPage() {
		return currentPage;
	}
	
	public void setCurrentPage(int currentPage) {
		if(currentPage<=0) {
			this.currentPage=1;
		} else {
			this.currentPage= currentPage;
		}
	}
	
	public int getSize() {
		return size;
	}
	
	public void setSize(int size) {
		if(size<=0) {
			this.size=10;
		}else {
			this.size=size;
		}
	}
	
	public int getTotalCount() {
		return totalCount;
	}
	
	public void setStartRow(int StartRow) {
		this.startRow=startRow;
	}
	
	public int getEndRow() {
		return endRow;
	}
	
	public void setEndRow(int endRow) {
		this.endRow= endRow;
	}

}
