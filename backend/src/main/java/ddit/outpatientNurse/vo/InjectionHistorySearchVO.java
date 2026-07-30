package ddit.outpatientNurse.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InjectionHistorySearchVO {
   private String startDate;
   private String endDate;
   private String period; // "morning" | "afternoon" | null(전체)
   private String keyword; // 환자명 또는 생년월일
}
