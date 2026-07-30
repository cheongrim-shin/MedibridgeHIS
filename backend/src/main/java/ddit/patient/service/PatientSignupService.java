package ddit.patient.service;

import ddit.patient.vo.PatientSignupVO;

public interface PatientSignupService {

    boolean isMemberIdAvailable(String memberId);

    String signup(PatientSignupVO signupVO);
}
