package ddit.admin.vo;

import java.util.Date;

import lombok.Data;

@Data
public class AdminFaqVO {

    private Integer faqNumber;
    private String faqTitle;
    private String faqContent;
    private Date faqDate;
    private String faqAuthor;
}