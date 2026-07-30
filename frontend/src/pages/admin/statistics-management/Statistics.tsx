import { useEffect, useState } from "react";
import axios from "axios";
import { SeasonalPatientChart } from "./components/SeasonalPatientChart";
import { WeekdayPatientChart } from "./components/WeekdayPatientChart";
import { TimeOfDayPatientChart } from "./components/TimeOfDayPatientChart";
import { AgeGroupPatientChart } from "./components/AgeGroupPatientChart";
import { MonthlyRevenueChart } from "./components/MonthlyRevenueChart";
import { MonthlyRevisitChart } from "./components/MonthlyRevisitChart";
import { TreatmentRevenueChart } from "./components/TreatmentRevenueChart";
import { TopPrescriptionItemsList } from "./components/TopPrescriptionItemsList";
import { PrescriptionTypeRatioList } from "./components/PrescriptionTypeRatioList";
import { TopDiagnosisList } from "./components/TopDiagnosisList";
import type {
    SeasonalPatientCountVO, MonthlyRevenueVO, MonthlyRevisitVO, TreatmentRevenueVO,
    WeekdayPatientCountVO, TimeOfDayPatientCountVO, AgeGroupPatientCountVO,
    TopPrescriptionItemVO, PrescriptionTypeRatioVO, TopDiagnosisVO,
    TimeOfDayRevenueVO,
} from "./types";
import styles from "./Statistics.module.css";
import { TimeOfDayRevenueChart } from "./components/TimeOfDayRevenueChart";

type PatientViewType = "all" | "season" | "weekday" | "timeOfDay" | "ageGroup";

export function Statistics() {

    const [year, setYear] = useState(new Date().getFullYear());
    const [seasonalData, setSeasonalData] = useState<SeasonalPatientCountVO[]>([]);
    const [weekdayData, setWeekdayData] = useState<WeekdayPatientCountVO[]>([]);
    const [timeOfDayData, setTimeOfDayData] = useState<TimeOfDayPatientCountVO[]>([]);
    const [ageGroupData, setAgeGroupData] = useState<AgeGroupPatientCountVO[]>([]);
    const [revenueData, setRevenueData] = useState<MonthlyRevenueVO[]>([]);
    const [revisitData, setRevisitData] = useState<MonthlyRevisitVO[]>([]);
    const [treatmentData, setTreatmentData] = useState<TreatmentRevenueVO[]>([]);

    const [topItemsData, setTopItemsData] = useState<TopPrescriptionItemVO[]>([]);
    const [typeRatioData, setTypeRatioData] = useState<PrescriptionTypeRatioVO[]>([]);
    const [topDiagnosisData, setTopDiagnosisData] = useState<TopDiagnosisVO[]>([]);

    const [timeOfDayRevenueData, setTimeOfDayRevenueData] = useState<TimeOfDayRevenueVO[]>([]);
    const [todayRevenue, setTodayRevenue] = useState(0);

    const [patientView, setPatientView] = useState<PatientViewType>("all");

    useEffect(() => {
        axios.get<SeasonalPatientCountVO[]>(`/api/admin/seasonal-patient-count`, { params: { year } })
            .then((res) => setSeasonalData(res.data))
            .catch((err) => console.error("계절별 환자 수 조회 실패 : ", err));

        axios.get<WeekdayPatientCountVO[]>(`/api/admin/weekday-patient-count`, { params: { year } })
            .then((res) => setWeekdayData(res.data))
            .catch((err) => console.error("요일별 환자 수 조회 실패 : ", err));

        axios.get<TimeOfDayPatientCountVO[]>(`/api/admin/time-of-day-patient-count`, { params: { year } })
            .then((res) => setTimeOfDayData(res.data))
            .catch((err) => console.error("시간대별 환자 수 조회 실패 : ", err));

        axios.get<AgeGroupPatientCountVO[]>(`/api/admin/age-group-patient-count`, { params: { year } })
            .then((res) => setAgeGroupData(res.data))
            .catch((err) => console.error("연령대별 환자 비율 조회 실패 : ", err));

        axios.get<MonthlyRevenueVO[]>(`/api/admin/monthly-revenue`, { params: { year } })
            .then((res) => setRevenueData(res.data))
            .catch((err) => console.error("월별 매출 조회 실패 : ", err));

        axios.get<MonthlyRevisitVO[]>(`/api/admin/monthly-revisit`, { params: { year } })
            .then((res) => setRevisitData(res.data))
            .catch((err) => console.error("월별 재방문 조회 실패 : ", err));

        axios.get<TreatmentRevenueVO[]>(`/api/admin/treatment-revenue`, { params: { year } })
            .then((res) => setTreatmentData(res.data))
            .catch((err) => console.error("치료 종류별 매출 조회 실패 : ", err));

        axios.get<TopPrescriptionItemVO[]>(`/api/admin/top-prescription-items`, { params: { year } })
            .then((res) => setTopItemsData(res.data))
            .catch((err) => console.error("처방 항목 순위 조회 실패 : ", err));

        axios.get<PrescriptionTypeRatioVO[]>(`/api/admin/prescription-type-ratio`, { params: { year } })
            .then((res) => setTypeRatioData(res.data))
            .catch((err) => console.error("처방 유형별 비율 조회 실패 : ", err));

        axios.get<TopDiagnosisVO[]>(`/api/admin/top-diagnosis`, { params: { year } })
            .then((res) => setTopDiagnosisData(res.data))
            .catch((err) => console.error("상병별 순위 조회 실패 : ", err));

        axios.get<TimeOfDayRevenueVO[]>(`/api/admin/time-of-day-revenue`, { params: { year } })
            .then((res) => setTimeOfDayRevenueData(res.data))
            .catch((err) => console.error("시간대별 매출 조회 실패 : ", err));
    }, [year]);

    // 오늘 매출은 연도 선택이랑 상관없이 항상 "오늘" 기준이라, 별도로 한 번만 조회
    useEffect(() => {
        axios.get<number>(`/api/admin/today-revenue`)
            .then((res) => setTodayRevenue(res.data))
            .catch((err) => console.error("금일 매출 조회 실패 : ", err));
    }, []);

    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: 5 }, (_, i) => currentYear - i);
    const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
    const totalPatients = revisitData.reduce((sum, item) => sum + item.totalPatients, 0);
    const totalRevisitPatients = revisitData.reduce((sum, item) => sum + item.revisitPatients, 0);
    const revisitRate = totalPatients > 0 ? (totalRevisitPatients / totalPatients) * 100 : 0;
    const avgMonthlyPatients = Math.round(totalPatients / 12);

    const patientViewTitle = {
        all: "환자 분포 통계",
        season: "계절별 환자 수",
        weekday: "요일별 방문 분포",
        timeOfDay: "시간대별 방문 분포",
        ageGroup: "연령대별 환자 비율",
    }[patientView];

    return (
        <div className={styles.statisticsContainer}>

            <div className={styles.kpiGrid}>
                <div className={styles.kpiCard}>
                    <p className={styles.kpiLabel}>올해 총 방문</p>
                    <p className={styles.kpiValue}>{totalPatients.toLocaleString()}건</p>
                </div>
                <div className={styles.kpiCard}>
                    <p className={styles.kpiLabel}>누적 매출</p>
                    <p className={styles.kpiValue}>{totalRevenue.toLocaleString()}원</p>
                </div>
                <div className={styles.kpiCard}>
                    <p className={styles.kpiLabel}>재방문율</p>
                    <p className={styles.kpiValue}>{revisitRate.toFixed(1)}%</p>
                </div>
                <div className={styles.kpiCard}>
                    <p className={styles.kpiLabel}>월평균 방문자</p>
                    <p className={styles.kpiValue}>{avgMonthlyPatients.toLocaleString()}명</p>
                </div>
            </div>

            {/* ① 시간대별 매출(도넛, 가운데 오늘 매출) + 월별 매출 추이 */}
            <div className={styles.sectionHeader} style={{ marginTop: "32px" }}>
                <h3 className={styles.sectionTitle}>매출 통계</h3>
                <select className={styles.yearSelect} value={year} onChange={(e) => setYear(Number(e.target.value))}>
                    {yearOptions.map((y) => (<option key={y} value={y}>{y}년</option>))}
                </select>
            </div>
            <div className={styles.twoColumnRow}>
                <div className={styles.chartCardFull}>
                    <p className={styles.miniCardTitle}>시간대별 매출</p>
                    <TimeOfDayRevenueChart data={timeOfDayRevenueData} todayRevenue={todayRevenue} />
                </div>
                <div className={styles.chartCardFull}>
                    <p className={styles.miniCardTitle}>월별 매출 추이</p>
                    <MonthlyRevenueChart data={revenueData} />
                </div>
            </div>

            {/* ② 처방 유형별 비율 + 치료 종류별 매출 비율 */}
            <div className={styles.sectionHeader} style={{ marginTop: "32px" }}>
                <h3 className={styles.sectionTitle}>처방 / 매출 비율</h3>
            </div>
            <div className={styles.twoColumnRow}>
                <div className={styles.chartCardFull}>
                    <p className={styles.miniCardTitle}>처방 유형별 비율</p>
                    <PrescriptionTypeRatioList data={typeRatioData} />
                </div>
                <div className={styles.chartCardFull}>
                    <p className={styles.miniCardTitle}>치료 종류별 매출 비율</p>
                    <TreatmentRevenueChart data={treatmentData} />
                </div>
            </div>

            {/* ③ 많이 나간 약품/치료 항목 TOP5 + 상병별 TOP5 */}
            <div className={styles.sectionHeader} style={{ marginTop: "32px" }}>
                <h3 className={styles.sectionTitle}>처방 / 진단 순위</h3>
            </div>
            <div className={styles.twoColumnRow}>
                <div className={styles.chartCardFull}>
                    <p className={styles.miniCardTitle}>많이 나간 약품/치료 항목 TOP 5</p>
                    <TopPrescriptionItemsList data={topItemsData} />
                </div>
                <div className={styles.chartCardFull}>
                    <p className={styles.miniCardTitle}>상병(진단명)별 TOP 5</p>
                    <TopDiagnosisList data={topDiagnosisData} />
                </div>
            </div>

            {/* ④ 월별 환자 수/재방문 현황 + 환자 분포 통계 */}
            <div className={styles.twoColumnRow} style={{ marginTop: "32px" }}>
                <div>
                    <div className={styles.sectionHeader}>
                        <h3 className={styles.sectionTitle}>월별 환자 수 / 재방문 현황</h3>
                    </div>
                    <div className={styles.chartCardFull}>
                        <MonthlyRevisitChart data={revisitData} />
                    </div>
                </div>

                <div>
                    <div className={styles.sectionHeader}>
                        <h3 className={styles.sectionTitle}>{patientViewTitle}</h3>
                        <div className={styles.toggleGroup}>
                            <button className={patientView === "all" ? styles.toggleButtonActive : styles.toggleButton} onClick={() => setPatientView("all")}>전체</button>
                            <button className={patientView === "season" ? styles.toggleButtonActive : styles.toggleButton} onClick={() => setPatientView("season")}>계절별</button>
                            <button className={patientView === "weekday" ? styles.toggleButtonActive : styles.toggleButton} onClick={() => setPatientView("weekday")}>요일별</button>
                            <button className={patientView === "timeOfDay" ? styles.toggleButtonActive : styles.toggleButton} onClick={() => setPatientView("timeOfDay")}>시간대별</button>
                            <button className={patientView === "ageGroup" ? styles.toggleButtonActive : styles.toggleButton} onClick={() => setPatientView("ageGroup")}>연령대별</button>
                        </div>
                    </div>
                    <div className={styles.chartCardFull}>
                        {patientView === "all" ? (
                            <div className={styles.miniCardGrid}>
                                <div>
                                    <p className={styles.miniCardTitle}>계절별</p>
                                    <div className={styles.miniChartBody}>
                                        <SeasonalPatientChart data={seasonalData} compact />
                                    </div>
                                </div>
                                <div>
                                    <p className={styles.miniCardTitle}>요일별</p>
                                    <div className={styles.miniChartBody}>
                                        <WeekdayPatientChart data={weekdayData} compact />
                                    </div>
                                </div>
                                <div>
                                    <p className={styles.miniCardTitle}>시간대별</p>
                                    <div className={styles.miniChartBody}>
                                        <TimeOfDayPatientChart data={timeOfDayData} compact />
                                    </div>
                                </div>
                                <div>
                                    <p className={styles.miniCardTitle}>연령대별</p>
                                    <div className={styles.miniChartBody}>
                                        <AgeGroupPatientChart data={ageGroupData} compact />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                {patientView === "season" && <SeasonalPatientChart data={seasonalData} />}
                                {patientView === "weekday" && <WeekdayPatientChart data={weekdayData} />}
                                {patientView === "timeOfDay" && <TimeOfDayPatientChart data={timeOfDayData} />}
                                {patientView === "ageGroup" && <AgeGroupPatientChart data={ageGroupData} />}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}