import type { RoomTab, WaitListVO } from "../../types";
import styles from "./WaitListTable.module.css";

interface WaitListTableProps {
    roomTabs: RoomTab[];
    activeRoom: string;
    onChangeRoom: (roomId: string) => void;
    searchText: string;
    onChangeSearchText: (text: string) => void;
    filteredList: WaitListVO[];
}

export function WaitListTable({
    roomTabs,
    activeRoom,
    onChangeRoom,
    searchText,
    onChangeSearchText,
    filteredList,
}: WaitListTableProps) {
    return (
        <div className={styles.tableContainer}>
            <input
                type="text"
                className={styles.searchInput}
                placeholder="환자명 또는 생년월일을 검색해주세요"
                value={searchText}
                onChange={(e) => onChangeSearchText(e.target.value)}
            />

            <div className={styles.tabRow}>
                {roomTabs.map((room) => (
                    <button
                        key={room.id}
                        className={`${styles.tabButton} ${
                            activeRoom === room.id ? styles.tabButtonActive : ""
                        }`}
                        onClick={() => onChangeRoom(room.id)}
                    >
                        {room.label}
                    </button>
                ))}
            </div>

            <div className={styles.waitListContainer}>
                <table className={styles.waitTable}>
                    <thead>
                        <tr>
                            <th>환자명</th>
                            <th>생년월일</th>
                            <th>나이/성별</th>
                            <th>접수 구분</th>
                            <th>예상 대기시간</th>
                            <th>접수 시간</th>
                            <th>순번</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredList.length === 0 ? (
                            <tr>
                                <td colSpan={7} className={styles.emptyRow}>
                                    대기 중인 환자가 없습니다.
                                </td>
                            </tr>
                        ) : (
                            filteredList.map((item) => (
                                <tr key={item.medicalNumber}>
                                    <td className={styles.memberNameCell}>
                                        {item.memberName}
                                        <button
                                            type="button"
                                            className={styles.detailBtn}
                                            onClick={() => console.log("환자 상세정보 클릭:", item.memberName)}
                                            title="환자 상세정보"
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="3" />
                                                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                                            </svg>
                                        </button>
                                    </td>
                                    <td className={styles.patientbirthCell}>{item.birthDate}</td>
                                    <td className={styles.patientbirthCell}>{item.age}세/{item.gender}</td>
                                    <td className={styles.patientCell}>
                                        <span className={`${styles.receiptDot} ${
                                            item.receiptType === '당일' ? styles.receiptDotGray : ''
                                        }`}
                                        ></span>
                                        {item.receiptType}
                                    </td>
                                    <td className={styles.patientbirthCell}>
                                        {item.expectedWaitingTime !== null
                                        ? `${item.expectedWaitingTime}분` : "-"}
                                    </td>
                                    <td className={styles.patientbirthCell}>{item.receiptDate?.slice(11, 16)}</td>
                                    <td className={styles.patientCell}>{item.waitingTurnNumber}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}