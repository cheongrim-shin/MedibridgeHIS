/** 이름 가운데 마스킹: 홍길동→홍*동, 남궁민수→남**수, 홍길→홍* */
export const maskName = (name: string): string => {
    if (name.length <= 1) return name;
    if (name.length === 2) return name[0] + '*';
    return name[0] + '*'.repeat(name.length - 2) + name[name.length - 1];
};

export const maskBirth = (birth: string): string =>
    birth.length >= 2 ? birth.slice(0, 2) + '****' : birth;

