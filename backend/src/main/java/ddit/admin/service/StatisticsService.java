package ddit.admin.service;

import ddit.admin.mapper.StatisticsMapper;
import ddit.admin.vo.*;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatisticsService {

    @Autowired
    private StatisticsMapper mapper;

    // 화면에서 넘어온 연도를 그대로 mapper에 전달해서 DB 조회 결과를 받아옴
    public List<SeasonalPatientCountVO> selectSeasonalPatientCount(@Param("year") int year) {
        return mapper.selectSeasonalPatientCount(year);
    }

    public List<MonthlyRevenueVO> selectMonthlyRevenue(@Param("year") int year) {
        return mapper.selectMonthlyRevenue(year);
    }

    public List<MonthlyRevisitVO> selectMonthlyRevisit(@Param("year") int year) {
        return mapper.selectMonthlyRevisit(year);
    }

    public List<TreatmentRevenueVO> selectTreatmentRevenue(@Param("year") int year) {
        return mapper.selectTreatmentRevenue(year);
    }

    public List<WeekdayPatientCountVO> selectWeekdayPatientCount(@Param("year") int year) {
        return mapper.selectWeekdayPatientCount(year);
    }

    public List<TimeOfDayPatientCountVO> selectTimeOfDayPatientCount(@Param("year") int year) {
        return mapper.selectTimeOfDayPatientCount(year);
    }

    public List<AgeGroupPatientCountVO> selectAgeGroupPatientCount(@Param("year") int year) {
        return mapper.selectAgeGroupPatientCount(year);
    }

    public List<TopPrescriptionItemVO> selectTopPrescriptionItems(int year) {
        return mapper.selectTopPrescriptionItems(year);
    }

    public List<PrescriptionTypeRatioVO> selectPrescriptionTypeRatio(int year) {
        return mapper.selectPrescriptionTypeRatio(year);
    }

    public List<TopDiagnosisVO> selectTopDiagnosis(int year) {
        return mapper.selectTopDiagnosis(year);
    }

    public List<TimeOfDayRevenueVO> selectTimeOfDayRevenue(int year) {
        return mapper.selectTimeOfDayRevenue(year);
    }

    public double selectTodayRevenue() {
        return mapper.selectTodayRevenue();
    }
}
