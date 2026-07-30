package ddit.admin.vo;

import java.util.Date;

import lombok.Data;

@Data
public class AdminQnaVO {

    private String qandaNumber;

    private String subject;

    private String categoryCode;

    private String inquiryDetails;

    private String inquirer;

    private String respondent;

    private String responseDetails;

    private Date dateWritten;

    private Date dateOfResponse;

    private String status;
}