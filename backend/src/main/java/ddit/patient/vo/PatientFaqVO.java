package ddit.patient.vo;

/*
 * 환자포털 FAQ VO
 * 
 * 역할:
 * FAQ 테이블에서 조회한 자주 묻는 질문 데이터를 담는다.
 * 
 * 현재 단계:
 * FAQ 테이블과 DB 연결하여 목록 화면에 출력한다.
 */
public class PatientFaqVO {

	private Integer faqNumber;
	private String faqCategory;
	private String faqQuestion;
	private String faqAnswer;

	public PatientFaqVO() {
	}

	public PatientFaqVO(Integer faqNumber, String faqCategory, String faqQuestion, String faqAnswer) {
		this.faqNumber = faqNumber;
		this.faqCategory = faqCategory;
		this.faqQuestion = faqQuestion;
		this.faqAnswer = faqAnswer;
	}

	public Integer getFaqNumber() {
		return faqNumber;
	}

	public void setFaqNumber(Integer faqNumber) {
		this.faqNumber = faqNumber;
	}

	public String getFaqCategory() {
		return faqCategory;
	}

	public void setFaqCategory(String faqCategory) {
		this.faqCategory = faqCategory;
	}

	public String getFaqQuestion() {
		return faqQuestion;
	}

	public void setFaqQuestion(String faqQuestion) {
		this.faqQuestion = faqQuestion;
	}

	public String getFaqAnswer() {
		return faqAnswer;
	}

	public void setFaqAnswer(String faqAnswer) {
		this.faqAnswer = faqAnswer;
	}

	/*
	 * 기존 title 사용 코드 호환용
	 */
	public String getTitle() {
		return faqQuestion;
	}

	public void setTitle(String title) {
		this.faqQuestion = title;
	}

	/*
	 * 기존 content 사용 코드 호환용
	 */
	public String getContent() {
		return faqAnswer;
	}

	public void setContent(String content) {
		this.faqAnswer = content;
	}

	/*
	 * 기존 category 사용 코드 호환용
	 */
	public String getCategory() {
		return faqCategory;
	}

	public void setCategory(String category) {
		this.faqCategory = category;
	}
}