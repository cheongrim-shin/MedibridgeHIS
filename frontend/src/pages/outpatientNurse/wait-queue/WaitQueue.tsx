import { useEffect, useRef, useState } from "react";
import styles from "./WaitQueue.module.css";
import { WaitCountCards } from "./components/WaitCountCards";
import { WaitListTable } from "./components/WaitListTable";
import { RoomStatusPanel } from "./components/RoomStatusPanel";
import { HoldStatusPanel } from "./components/HoldStatusPanel";
import type { HoldListVO, RoomStatusVO, WaitListVO } from "../types";
import axios from "axios";

const ROOM_TABS = [
    { id: "all", label: "전체" },
    { id: "1", label: "진료실1" },
    { id: "2", label: "진료실2" },
    { id: "3", label: "진료실3" },
];

const STATE_LABEL_MAP: Record<string, string> = {
    '접수완료': '대기중',
    '호출중': '호출중',
    '진료중': '진료중',
};

const SPACE_LABEL_MAP: Record<string, string> = {
    "1": "진료실1",
    "2": "진료실2",
    "3": "진료실3",
};

export function WaitQueue() {
    const isFirstRender = useRef(true);

    const [counts, setCounts] = useState({
        waitingCnt: 0,
        treatingCnt: 0,
        holdCnt: 0,
    });

    const [activeRoom, setActiveRoom] = useState("all");
    const [waitList, setWaitList] = useState<WaitListVO[]>([]);
    const [searchText, setSearchText] = useState("");
    const [roomStatusList, setRoomStatusList] = useState<RoomStatusVO[]>([]);
    const [holdList, setHoldList] = useState<HoldListVO[]>([]);

    const fetchWaitList = () => {
        axios.get(`/api/wait/list`, {
            params: activeRoom === "all" ? {} : { spaceNumber: activeRoom }
        })
            .then((res) => setWaitList(res.data))
            .catch((err) => console.error("목록 조회 실패 : ", err));
    };

    useEffect(() => {
        // 첫 렌더링일 때는 여기서 fetchWaitList()를 실행하지 않고 그냥 넘어감
        // → 첫 목록 불러오기는 아래 /api/wait/init의 .then() 쪽에만 맡김 (경쟁 방지)
        if (isFirstRender.current) {
            isFirstRender.current = false; // 메모장에 "이제 첫 렌더링 아님"이라고 표시
            return;
        }
        // 두 번째 렌더링부터(=사용자가 탭을 클릭해서 activeRoom이 바뀔 때부터)는 정상적으로 재조회
        fetchWaitList();
    }, [activeRoom]);
    
    const fetchCounts = () => {
        axios.get(`/api/wait/count`)
            .then((res) => setCounts(res.data))
            .catch((err) => console.error("카운트 조회 실패 : ", err));
    };
    useEffect(() => {
        fetchCounts();
    }, []);

    const fetchRoomStatus = () => {
        axios.get(`/api/wait/room-status`)
            .then((res) => setRoomStatusList(res.data))
            .catch((err) => console.error("진료실 현황 조회 실패 : ", err));
    };
    useEffect(() => {
        fetchRoomStatus();
    }, []);

    // 보류 목록 불러오는 함수
    const fetchHoldList = () => {
        axios.get(`/api/wait/hold-list`)
            .then((res) => setHoldList(res.data))
            .catch((err) => console.error("보류 목록 조회 실패 : ", err));
    };
    useEffect(() => {
        fetchHoldList();
    }, []);

    // 페이지 처음 로드 시 한 번만 실행
    useEffect(() => {
        axios.post(`/api/wait/init`)
            .then(() => {
                // 초기화 완료 후 화면 데이터 갱신
                fetchRoomStatus();
                fetchCounts();
                fetchWaitList();
                fetchHoldList();
            })
            .catch((err) => console.error("초기화 실패 : ", err))
    }, []);

    const handleHoldConfirm = async (medicalNumber: string, holdReason: string, spaceNumber: string) => {
        try {
            await axios.post(`/api/wait/hold`, { medicalNumber, holdReason, spaceNumber })

            // 성공하면 카운트, 목록, 보류 목록 전부 갱신
            fetchRoomStatus();
            fetchCounts();
            fetchWaitList();
            fetchHoldList();
        } catch (err) {
            console.error("보류 처리 중 오류 : ", err);
            alert("보류 처리 중 오류가 발생했습니다.");
        }
    };


    const handleReturnConfirm = async (medicalNumber: string, spaceNumber: string) => {
        try {
            await axios.post(`/api/wait/return`, { medicalNumber, spaceNumber });

            // 성공하면 카운트, 목록, 보류 목록 전부 갱신
            fetchRoomStatus();
            fetchCounts();
            fetchWaitList();
            fetchHoldList();
        } catch (err) {
            console.error("대기 복귀 처리 중 오류 : ", err);
            alert("대기 복귀 처리중 오류 발생")
        }
    };

    const handleNextPatient = async (medicalNumber: string, spaceNumber: string) => {
        try {
            await axios.post(`/api/wait/next`, { medicalNumber, spaceNumber })

            // 성공하면 카운트 , 진료실 현황, 대기 목록 갱신
            fetchCounts();
            fetchRoomStatus();
            fetchWaitList();
        } catch (err) {
            console.error("다음 순번으로 처리 중 오류 : ", err);
            alert("다음 순번으로 처리 중 오류가 발생했습니다.");
        }
    };

    const filteredList = waitList.filter((item) => {
        const keyword = searchText.trim();
        if (!keyword) return true;
        return (
            item.memberName.includes(keyword) ||
            item.birthDate.includes(keyword)
        );
    });

    return (
        <div className={styles.cardContainer}>
            <WaitCountCards
                waitingCnt={counts.waitingCnt}
                treatingCnt={counts.treatingCnt}
                holdCnt={counts.holdCnt}
            />

            <div className={styles.mainContentRow}>
                <WaitListTable
                    roomTabs={ROOM_TABS}
                    activeRoom={activeRoom}
                    onChangeRoom={setActiveRoom}
                    searchText={searchText}
                    onChangeSearchText={setSearchText}
                    filteredList={filteredList}
                />

                <div className={styles.rightColumn}>
                    <RoomStatusPanel
                        roomTabs={ROOM_TABS}
                        roomStatusList={roomStatusList}
                        stateLabelMap={STATE_LABEL_MAP}
                        onHoldConfirm={handleHoldConfirm}
                        onNextPatient={handleNextPatient}
                    />
                    <HoldStatusPanel
                        holdList={holdList}
                        spaceLabelMap={SPACE_LABEL_MAP}
                        onReturnConfirm={handleReturnConfirm}
                    />
                </div>
            </div>
        </div>
    );
}