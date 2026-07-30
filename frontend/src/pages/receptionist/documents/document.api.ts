import axios from "axios";
import type { DocumentRow , DocumentType} from "./document.types";
import * as PortOne from "@portone/browser-sdk/v2";

const BASE = "/api/receptionist";
const toMsg = (err: unknown): string =>
    axios.isAxiosError(err) ? (err.response?.data?.message ?? '요청 실패') : '알 수 없는 오류';

//서류 종류 목록
export const fetchDocumentTypes = async (): Promise<DocumentType[]> =>{
    const res = await axios.get<DocumentType[]>(`${BASE}/types`)
        .catch((e)=> {throw new Error(toMsg(e)); });
    return res.data;
};

// 발급 목록
export const fetchDocuments = async (keyword: string): Promise<DocumentRow[]> =>{
    const res = await axios.get<DocumentRow[]>(`${BASE}/documents`, { params: {keyword: keyword || undefined} })
        .catch((e)=> {throw new Error(toMsg(e)); });
    return res.data;
}

//상태 변경
export const changeDocumentState = async (receiveNumber: number, receiveState: string): Promise<void> =>{
    await axios.patch(`${BASE}/documents/${receiveNumber}/state`, {receiveState})
        .catch((e)=> {throw new Error(toMsg(e)); });
}

// 포트원 결제
export const payDocumentByPortOne = async (
    receiveNumber: number,
    docName: string,
    fee: number,
): Promise<string> =>{
    const paymentId = `doc-${receiveNumber}-${Date.now()}`;  //고유 주문번호
    const res = await PortOne.requestPayment({
        storeId: import.meta.env.VITE_PORTONE_STORE_ID,      // 환경변수
        channelKey: import.meta.env.VITE_PORTONE_CHANNEL_KEY,
        paymentId,
        orderName: `${docName} 발급`,
        totalAmount: fee,
        currency: "CURRENCY_KRW",
        payMethod: "EASY_PAY",   // 간편결제(카카오페이 등) 카드면 "CARD"
    });
    if(res?.code != null){            //코드 있으면 실패/취소
        throw new Error(res.message ?? "결제가 취소되었습니다.");
    }
    return paymentId;   // 서버 검증용
}

export const completeDocumentPayment = async (receiveNumber: number, paymentId: string): Promise<void> =>{
    await axios.post(`${BASE}/documents/${receiveNumber}/payment/complete`, {paymentId})
        .catch((e)=> {throw new Error(toMsg(e));});
};

// 현금 서류 수납: 결제창 없이 서버가 매출 적재 + 상태변경
export const payDocumentByCash = async (receiveNumber: number): Promise<void> => {
    await axios.post(`${BASE}/documents/${receiveNumber}/payment/cash`)
        .catch((e) => { throw new Error(toMsg(e)); });
};

