import axios from "axios";
import type { PaymentCreateReq, PaymentDetailInput } from "./types";
import * as PortOne from "@portone/browser-sdk/v2";

const BASE = "/api/receptionist";

const toMsg = (err: unknown): string => 
    axios.isAxiosError(err) ? (err.response?.data?.message ?? "수납 실패") : "알수 없는 오류"

/** [수납 등록] POST /api/receptionist/payments
 *  요청 body: { medicalNumber, paymentType, details[] }
 *  응답: { paymentNumber } */
export const createPayment =async (req: PaymentCreateReq): Promise<number>=>{
    const res = await axios.post<{paymentNumber: number}>(`${BASE}/payments`, req)
        .catch((err)=>{
            throw new Error(toMsg(err));
        });
    return res.data.paymentNumber;
}

export const fetchCharges = async (medicalNumber: string): Promise<PaymentDetailInput[]> => {
    const res = await axios.get<PaymentDetailInput[]>(`${BASE}/receipts/${medicalNumber}/charges`)
        .catch((err) => { throw new Error(toMsg(err)); });
    return res.data;
};

/** [수납 내역 조회] GET /api/receptionist/payments/{medicalNumber}/history
 *  응답: [{ paymentNumber, medicalNumber, lineNo, paymentDetailName, amount }] — LINE_NO 순 */
export const fetchPaymentHistory = async (medicalNumber: string): Promise<PaymentDetailInput[]> => {
    const res = await axios.get<PaymentDetailInput[]>(`${BASE}/payments/${medicalNumber}/history`)
        .catch((err) => { throw new Error(toMsg(err)); });
    return res.data;
};

export const fetchReceiptCounts = async (fromDate?: string, toDate?: string) => {
    const res = await axios.get<Record<string, number>>(`${BASE}/receipts/counts`,
        { params: { fromDate, toDate } }).catch((err) => { throw new Error(toMsg(err)); });
    return res.data;
};

export const payReceiptByPortOne = async (
    medicalNumber: string,
    total: number,
): Promise<string> => {
    const paymentId = `rcpt-${medicalNumber}-${Date.now()}`;   // 고유 주문번호
    const res = await PortOne.requestPayment({
        storeId: import.meta.env.VITE_PORTONE_STORE_ID,
        channelKey: import.meta.env.VITE_PORTONE_CHANNEL_KEY,
        paymentId,
        orderName: `진료비 수납 (${medicalNumber})`,
        totalAmount: total,
        currency: "CURRENCY_KRW",
        payMethod: "EASY_PAY",          // 진료비는 보통 카드
    });
    if (res?.code != null) throw new Error(res.message ?? "결제가 취소되었습니다.");
    return paymentId;
};

// 결제 성공 후: 서버 검증, 적재
export const completeReceiptPayment = async (
    req: PaymentCreateReq, paymentId: string,
): Promise<number> => {
    const res = await axios.post<{ paymentNumber: number }>(
        `${BASE}/receipts/${req.medicalNumber}/payment/complete`,
        { ...req, paymentId },
    ).catch((e) => { throw new Error(toMsg(e)); });
    return res.data.paymentNumber;
};