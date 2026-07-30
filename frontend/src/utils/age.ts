/** 만 나이: 'YYMMDD' → 나이. 2자리 연도가 올해 뒷자리보다 크면 1900년대로 추정 */
export const getAge = (birth: string): number | null => {
    if (!/^\d{6}$/.test(birth)) return null;
    const now = new Date();
    const yy = Number(birth.slice(0, 2));
    const year = (yy > now.getFullYear() % 100 ? 1900 : 2000) + yy;
    const age = now.getFullYear() - year;
    const birthdayPassed =
        now >= new Date(now.getFullYear(), Number(birth.slice(2, 4)) - 1, Number(birth.slice(4, 6)));
    return birthdayPassed ? age : age - 1;
};

/**  — 물리치료 화면 호환 시그니처 유지 (내부만 getAge로 교체) */
export const getAgeAndGender = (birthDate: string, gender?: '남' | '여'): string => {
    const age = getAge(birthDate);
    return `${age ?? '-'}세/${gender || '남'}`;
};