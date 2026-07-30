
import { useEffect, useState } from 'react';
import { fetchReceiptList } from './receipt.api';
import type { ReceiptItem, ReceiptSearchParams } from './types';

export const useReceiptList = (search: ReceiptSearchParams) => {
    // 검색조건을 문자열 키로 
    const key = [search.status, search.keyword, search.doctorNumber, search.fromDate, search.toDate].join('|');

    // 수동 재조회 트리거 
    const [nonce, setNonce] = useState(0);
    const reload = () => setNonce(n => n + 1);

    // 마지막 응답 결과를 "어떤 key의 응답인지"와 함께 저장
    const [result, setResult] = useState<{ key: string; list: ReceiptItem[]; error: string | null } | null>(null);

    useEffect(() => {
        let ignore = false;                      
        fetchReceiptList(search)
            .then(list => { if (!ignore) setResult({ key, list, error: null }); })
            .catch(e => { if (!ignore) setResult({ key, list: [], error: e instanceof Error ? e.message : '목록을 불러오지 못했습니다.' }); });
        return () => { ignore = true; };          
    }, [key, nonce]);                            

      // 로딩을 상태가 아니라 "파생값"으로: 저장된 응답의 key ≠ 현재 key → 아직 로딩 중
    const isLoading = result?.key !== key;

    return {
        list: isLoading ? [] : result?.list ?? [],
        isLoading,
        error: isLoading ? null : result?.error ?? null,
        reload,
    };
};