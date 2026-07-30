// ============================================================
// [헬퍼(도우미) 함수 모음]
// 특정 컴포넌트에 묶이지 않는, 순수 계산용 함수들을 모아둡니다.
// 순수 함수(입력 → 출력만 있고 화면을 안 그리는 함수)
// ============================================================
import type { BedState, PatientQueueItem } from "./therapyQueue.types";
export { getAgeAndGender } from '../../../utils/age';

// 초(seconds) → "MM:SS" 형태 문자열로 변환 (예: 330 → "05:30")
export const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);                       // 분
    const secs = seconds % 60;                                    // 초
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    // padStart(2,'0'): 한 자리면 앞에 0을 붙여 두 자리로 (예: 5 → "05")
};

/**
 * 예상 대기시간(분) 계산 — DB 저장이 아닌 조회 시점 파생값.
 * 규칙: 같은 치료종류 대기열에서 '내 앞 순번'들의 소요시간 합을
 *       해당 종류 베드 수로 나눠 평균적으로 몇 분 뒤에 시작할지 추정.
 *
 * @param item  대상 환자
 * @param queue 전체 대기열(내부에서 '대기' 상태만 사용)
 * @param beds  전체 베드(치료종류별 개수 산정용)
 * @returns 0 이상의 정수(분). 앞에 아무도 없으면 0
 */
export const estimatedWaitMinutes = (
    item: PatientQueueItem,
    queue: PatientQueueItem[],
    beds: BedState[],
): number=> {
    const typeBeds = beds.filter(b=> b.type === item.therapyType);
    const bedCount = typeBeds.length || 1;

    // 1 내 앞 순번들의 소요시간 합 (durationMinutes = 서버가 준 실측/상수)
    const aheadMinutes = queue.filter(q => 
                                q.status === 'WAIT' &&
                                q.therapyType === item.therapyType &&
                                q.sequence < item.sequence
    )
    .reduce((sum, q)=> sum + (q.durationMinutes >0 ? q.durationMinutes : 20), 0);

    //2 다음 빈 베드까지(분): 빈 베드 있으면 0, 없으면 사용중 베드 남은시간 중 최소
    const hasFree = typeBeds.some(b=> b.status === 'available');
    const occRemainMin = typeBeds.filter(b => b.status === 'occupied')
                                 .map(b => Math.ceil(b.remainingSeconds / 60));
    const nextFreeMin = (hasFree || occRemainMin.length ===0) ? 0 : Math.min(...occRemainMin);
    // 예상대기 = 1 + 2
    return Math.max(0, nextFreeMin + Math.round(aheadMinutes / bedCount));
}


export interface SiblingBadge {
    label: string;                 // 예: "일반 치료중", "견인 대기 1건"
    tone: 'wait' | 'active';       // wait=대기(회색), active=치료중(초록)
}

export const getSiblingBadge = (
    row: PatientQueueItem,
    queue: PatientQueueItem[],
): SiblingBadge | null => {
    // 같은 진료의 '다른 종류' 치료들만 추림
    const siblings = queue.filter(q =>
        q.medicalNumber === row.medicalNumber &&
        q.therapyType !== row.therapyType
    );
    if (siblings.length === 0) return null;   // 형제 없음 → 표시 안 함

    // 현재 행이 일반이면 형제는 '견인', 견인이면 형제는 '일반'
    const siblingLabel = row.therapyType === 'GENERAL' ? '견인' : '일반';

    // 1순위: 치료중 (베드 배정된 형제가 있으면)
    if (siblings.some(s => s.status === 'IN_PROGRESS')) {
        return { label: `${siblingLabel} 치료중`, tone: 'active' };
    }
    // 2순위: 대기 (몇 건인지 함께)
    const waitCount = siblings.filter(s => s.status === 'WAIT').length;
    if (waitCount > 0) {
        return { label: `${siblingLabel} 대기 ${waitCount}건`, tone: 'wait' };
    }
    // 완료/보류만 있으면 → 표시 없음 (4번: 완료 시 대기표시 제거)
    return null;
};
