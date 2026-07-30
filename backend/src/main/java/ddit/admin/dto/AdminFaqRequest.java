package ddit.admin.dto;

import lombok.Data;

@Data
public class AdminFaqRequest {

    private String faqTitle;
    private String faqContent;
}