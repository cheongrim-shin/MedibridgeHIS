package ddit.admin.mapper;

import ddit.admin.vo.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface StatisticsMapper {
    // 특정 연도의 계절별 환자(접수) 수를 조회
    // 결과가 여러 줄(봄/여름/가을/겨울)이라서 List로 받음
    List<SeasonalPatientCountVO> selectSeasonalPatientCount(@Param("year") int year);

    // 특정 연도의 월별 매출 조회
    List<MonthlyRevenueVO> selectMonthlyRevenue(@Param("year") int year);

    List<MonthlyRevisitVO> selectMonthlyRevisit(@Param("year") int year);

    List<TreatmentRevenueVO> selectTreatmentRevenue(@Param("year") int year);

    List<WeekdayPatientCountVO> selectWeekdayPatientCount(@Param("year") int year);

    List<TimeOfDayPatientCountVO> selectTimeOfDayPatientCount(@Param("year") int year);

    List<AgeGroupPatientCountVO> selectAgeGroupPatientCount(@Param("year") int year);

    List<TopPrescriptionItemVO> selectTopPrescriptionItems(int year);
    List<PrescriptionTypeRatioVO> selectPrescriptionTypeRatio(int year);
    List<TopDiagnosisVO> selectTopDiagnosis(int year);

    List<TimeOfDayRevenueVO> selectTimeOfDayRevenue(int year);
    double selectTodayRevenue();
}
