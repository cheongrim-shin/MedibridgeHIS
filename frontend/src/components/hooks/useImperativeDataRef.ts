import React, { useImperativeHandle } from 'react';

export interface DataRefTarget {
    value: string;
    focus: () => void;
    select?: () => void;
}

/**
 * React useImperativeHandle을 래핑하여 상위 Ref로 data getter와 focus, select 메서드를 공통 위임해 주는 커스텀 훅입니다.
 */
export function useImperativeDataRef<T extends DataRefTarget>(
    ref: React.Ref<unknown>,
    innerRef: React.RefObject<T | null>
) {
    useImperativeHandle(ref, () => ({
        get value() {
            return innerRef.current?.value || '';
        },
        focus() {
            innerRef.current?.focus();
        },
        select() {
            innerRef.current?.select?.();
        }
    }), [innerRef]);
}
