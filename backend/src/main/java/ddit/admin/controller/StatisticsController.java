package ddit.admin.controller;

import ddit.admin.service.StatisticsService;
import ddit.admin.vo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class StatisticsController {

    @Autowired
    private StatisticsService service;

    // 최종 API 주소: GET /api/admin/seasonal-patient-count?year=2026
    // @RequestParam: URL의 ?year=2026 부분에서 값을 꺼내서 year 변수에 담아줌
    @GetMapping("/seasonal-patient-count")
    public List<SeasonalPatientCountVO> selectSeasonalPatientCount(@RequestParam("year") int year) {
        return service.selectSeasonalPatientCount(year);
    }

    @GetMapping("/monthly-revenue")
    public List<MonthlyRevenueVO> selectMonthlyRevenue(@RequestParam("year") int year) {
        return service.selectMonthlyRevenue(year);
    }

    @GetMapping("/monthly-revisit")
    public List<MonthlyRevisitVO> selectMonthlyRevisit(@RequestParam("year") int year) {
        return service.selectMonthlyRevisit(year);
    }

    @GetMapping("/treatment-revenue")
    public List<TreatmentRevenueVO> selectTreatmentRevenue(@RequestParam("year") int year) {
        return service.selectTreatmentRevenue(year);
    }

    @GetMapping("/weekday-patient-count")
    public List<WeekdayPatientCountVO> selectWeekdayPatientCount(@RequestParam("year") int year) {
        return service.selectWeekdayPatientCount(year);
    }

    @GetMapping("/time-of-day-patient-count")
    public List<TimeOfDayPatientCountVO> selectTimeOfDayPatientCount(@RequestParam("year") int year) {
        return service.selectTimeOfDayPatientCount(year);
    }

    @GetMapping("/age-group-patient-count")
    public List<AgeGroupPatientCountVO> selectAgeGroupPatientCount(@RequestParam("year") int year) {
        return service.selectAgeGroupPatientCount(year);
    }

    @GetMapping("/top-prescription-items")
    public List<TopPrescriptionItemVO> selectTopPrescriptionItems(@RequestParam("year") int year) {
        return service.selectTopPrescriptionItems(year);
    }

    @GetMapping("/prescription-type-ratio")
    public List<PrescriptionTypeRatioVO> selectPrescriptionTypeRatio(@RequestParam("year") int year) {
        return service.selectPrescriptionTypeRatio(year);
    }

    @GetMapping("/top-diagnosis")
    public List<TopDiagnosisVO> selectTopDiagnosis(@RequestParam("year") int year) {
        return service.selectTopDiagnosis(year);
    }

    @GetMapping("/time-of-day-revenue")
    public List<TimeOfDayRevenueVO> selectTimeOfDayRevenue(@RequestParam("year") int year) {
        return service.selectTimeOfDayRevenue(year);
    }

    @GetMapping("/today-revenue")
    public double selectTodayRevenue() {
        return service.selectTodayRevenue();
    }


}
