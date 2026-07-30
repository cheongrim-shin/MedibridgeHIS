/** 숫자를 2자리로 0-패딩 — 7 → '07' */
const pad2 = (n: number): string => String(n).padStart(2, '0');

/**
 * Date → 'YYYY-MM-DD' (로컬 기준)
 * ★toISOString() 대신 반드시 이 함수를 쓸 것★
 */
export const toDateStr = (d: Date): string =>
    `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

/** Date → 'HH:MM' (로컬 기준) */
export const toTimeStr = (d: Date): string =>
    `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;

/**
 * Date → 'YYYY-MM-DD HH:MM' (로컬 기준)
 * BE AppointmentCreateVO.reserveAt 의 @Pattern 형식과 정확히 일치한다.
 * 캘린더에서 슬롯을 클릭했을 때 받은 Date를 이 함수로 변환해 전송한다.
 */
export const toReserveAt = (d: Date): string => `${toDateStr(d)} ${toTimeStr(d)}`;

/**
 * 두 Date의 차이를 분 단위로 — 드래그로 길이를 조절했을 때 durationMinutes 계산용
 */
export const diffMinutes = (start: Date, end: Date): number =>
    Math.round((end.getTime() - start.getTime()) / 60000);

/** 'YYMMDD' 생년월일 → 나이 표시용 문자열. 잘못된 값이면 '-' */
export const formatBirth = (yymmdd: string | null): string => {
    if (!yymmdd || yymmdd.length !== 6) return '-';
    const yy = Number(yymmdd.slice(0, 2));
    const mm = yymmdd.slice(2, 4);
    const dd = yymmdd.slice(4, 6);
    // 2자리 연도 해석: 현재 연도 뒤 2자리보다 크면 1900년대로 본다
    const nowYY = new Date().getFullYear() % 100;
    const fullYear = yy > nowYY ? 1900 + yy : 2000 + yy;
    return `${fullYear}-${mm}-${dd}`;
};

/** 전화번호 표시 마스킹 — 010-1234-5678 → 010-****-5678 */
export const maskPhone = (phone: string | null): string => {
    if (!phone) return '-';
    return phone.replace(/(\d{2,3})-?(\d{3,4})-?(\d{4})/, '$1-****-$3');
};
