import type { BedTabType } from "./therapyQueue.types";
import styles from './TherapyQueue.module.css';
import { QueueSummary } from "./components/QueueSummary";
import { Input } from "./components/Input";
import { Tabs } from "./components/Tabs";
import { QueueTable } from "./components/QueueTable";
import { BedBoard } from "./components/BedBoard";
import { useTherapyQueue } from "./useTherapyQueue";
import { PatientDetailCard } from "./components/PatientDetailCard";
import { Button } from "./components/Button";

export const TherapyQueue = () => {
    const {
        beds, queue, selectedTab, setSelectedTab, searchQuery, setSearchQuery,
        selectedPatient, setSelectedPatient, isLoading, error,
        totalWaitCount, activeCount, filteredQueue,
        handleStartTherapy, handleCompleteTherapy, handleSelectBedPatient,
        detail, detailLoading,
    } = useTherapyQueue();

    const BED_TABS = [
        { label: '일반치료', value: 'GENERAL' },
        { label: '견인치료', value: 'TRACTION' },
    ] as const;

    if (isLoading) return <div>불러오는 중…</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className={styles.container}>
            <p className={styles.pageDesc}>
              <b>[시연용]</b>  물리치료사가 대기 환자를 베드에 배정하고 치료를 시작·완료하는 작업 화면입니다.
                좌측 대기열에서 환자를 선택해 치료를 시작하면 우측 베드 현황에 배정되고,
                치료 완료 시 해당 환자의 모든 처치가 끝났으면 자동으로 원무 <b>수납대기</b>로 전환됩니다.
            </p>
            <div className={styles.contentRow}>

                {/* ── 좌측: 요약카드 + 목록 ── */}
                <div className={styles.leftColumn}>
                    <QueueSummary waitCount={totalWaitCount} activeCount={activeCount} />

                    <div className={styles.listCard}>
                        <div className={styles.filterRow}>
                            <Input
                                className={styles.searchInput}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="환자명 또는 생년월일 검색..."
                                size="sm" color="teal"
                            />
                        </div>

                        <div className={styles.tabContainer}>
                            <Tabs activeTab={selectedTab} onChange={(val) => {
                                setSelectedTab(val as BedTabType);
                                setSelectedPatient(null);
                            }} color="teal">
                                <Tabs.List>
                                    {BED_TABS.map(tab => (
                                        <Tabs.Tab key={tab.value} value={tab.value}>{tab.label}</Tabs.Tab>
                                    ))}
                                </Tabs.List>
                            </Tabs>
                             {/*  대기 현황판 새 창 */}
                             <span className={styles.boardBtn}>
                                <Button size="sm" variant="outline" color="teal"
                                        onClick={() => window.open('/physical-therapist/board', '_blank', 'noopener')}>
                                    📺 대기 현황판
                                </Button>
                            </span>
                        </div>

                        <div className={styles.tableContainer}>
                            <Tabs activeTab={selectedTab} onChange={setSelectedTab} color="teal">
                                <Tabs.Panel value="GENERAL">
                                    <QueueTable filteredQueue={filteredQueue}
                                        selectedPatient={selectedPatient}
                                        setSelectedPatient={setSelectedPatient} />
                                </Tabs.Panel>
                                <Tabs.Panel value="TRACTION">
                                    <QueueTable filteredQueue={filteredQueue}
                                        selectedPatient={selectedPatient}
                                        setSelectedPatient={setSelectedPatient} />
                                </Tabs.Panel>
                            </Tabs>
                        </div>
                    </div>
                </div>

                {/* ── 우측: 베드 현황 + 환자 상세 (상단 정렬) ── */}
                <div className={styles.rightColumn}>
                    <div className={`${styles.rightCard} ${styles.rightCardBed}`}>
                        <div className={styles.cardTitleRow}>
                            <h3 className={styles.cardTitle}>
                                실시간 베드 현황 ({BED_TABS.find(t => t.value === selectedTab)?.label})
                            </h3>
                        </div>
                        <Tabs activeTab={selectedTab} onChange={setSelectedTab} color="teal" variant="modal">
                            <Tabs.Panel value="GENERAL">
                                <div className={styles.bedBoard}>
                                    <BedBoard currentTabBeds={beds.filter(b => b.type === 'GENERAL')}
                                        selectedPatient={selectedPatient}
                                        handleCompleteTherapy={handleCompleteTherapy}
                                        handleStartTherapy={handleStartTherapy} 
                                        onPatientClick={handleSelectBedPatient}/>
                                </div>
                            </Tabs.Panel>
                            <Tabs.Panel value="TRACTION">
                                <div className={styles.bedBoard}>
                                    <BedBoard currentTabBeds={beds.filter(b => b.type === 'TRACTION')}
                                        selectedPatient={selectedPatient}
                                        handleCompleteTherapy={handleCompleteTherapy}
                                        handleStartTherapy={handleStartTherapy} />
                                </div>
                            </Tabs.Panel>
                        </Tabs>
                    </div>

                    <PatientDetailCard
                        patient={selectedPatient}
                        detail={detail}
                        loading={detailLoading}
                        queue={queue}
                    />
                </div>

            </div>
        </div>
    );
};