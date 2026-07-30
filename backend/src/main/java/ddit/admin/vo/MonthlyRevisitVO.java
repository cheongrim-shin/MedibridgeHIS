package ddit.admin.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MonthlyRevisitVO {
    private String month;              // "01" ~ "12"
    private int totalPatients;         // 그 달에 방문한 전체 환자 수
    private int revisitPatients;       // 그중 재방문(예전부터 다니던) 환자 수
}
