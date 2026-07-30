package ddit.patient.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import ddit.member.vo.MemberVO;

@Mapper
public interface PatientSignupMapper {

    int countByMemberId(@Param("memberId") String memberId);

    List<MemberVO> selectPatientCandidatesByRrnPrefix(
            @Param("rrnPrefix") String rrnPrefix);

    int selectNextPatientMemberNumberSuffix();

    int insertPatientMember(MemberVO member);

    int updatePatientPortalAccount(MemberVO member);
}
