import React, { useEffect, useRef, useState } from "react";
import styles from './Dropdown.module.css';

export interface DropdownProps {
    // 드롭다운을 열고 닫는 트리거(버튼 등).
    //  - 고정된 JSX를 줄 수도 있고, isOpen 상태를 받아 동적으로 렌더링하는 함수를 줄 수도 있음
    trigger: React.ReactNode | ((isOpen: boolean) => React.ReactNode);

    // 드롭다운이 열렸을 때 보여줄 내용 (메뉴 아이템들)
    children: React.ReactNode;

    // 팝업이 트리거 기준 어느 위치에 정렬될지 (기본값: left)
    align?: 'left' | 'center' | 'right';

    // 팝업의 색상 테마 (기본값: green)
    color?: 'green' | 'indigo' | 'red' | 'gray' | 'slate' | 'teal';

    // true면 컨테이너/팝업이 부모 너비에 꽉 차게 늘어남
    fullWidth?: boolean;
}

export const Dropdown = ({
                             trigger,
                             children,
                             align = 'left',
                             color = 'green',
                             fullWidth = false
                         }: DropdownProps) => {
    // 드롭다운 열림/닫힘 상태
    const [isOpen, setIsOpen] = useState(false);

    // 드롭다운 전체 영역(트리거 + 팝업)을 감싸는 div를 참조
    // 외부 클릭 감지에 사용
    const containerRef = useRef<HTMLDivElement>(null);

    // 외부 클릭 시 팝업 닫기
    useEffect(() => {
        // 마우스 클릭 이벤트가 발생했을 때, 클릭된 지점이 containerRef 영역 밖이면 닫음
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        // 드롭다운이 열려있을 때만 리스너 등록 (불필요한 리스너 방지)
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // cleanup: isOpen이 바뀌거나 컴포넌트가 unmount될 때 리스너 제거
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen]);

    // 트리거 클릭 시 열림/닫힘 토글
    const handleToggle = (e: React.MouseEvent) => {
        // 이 클릭이 상위 요소(예: containerRef)의 클릭 이벤트로 전파되는 것을 막음
        // (안 막으면 토글 직후 바로 외부 클릭으로 인식되어 닫힐 수 있음)
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    // trigger prop이 함수인지 ReactNode인지 분기해서 실제 렌더링할 내용을 반환
    const renderTrigger = () => {
        if (typeof trigger === 'function') {
            // 함수면 현재 isOpen 상태를 넘겨서 호출 (열림 상태에 따라 모양 다르게 가능)
            return trigger(isOpen);
        }
        // 함수가 아니면 그냥 그대로 렌더링
        return trigger;
    };

    return (
        <div
            // 컨테이너 기본 클래스 + fullWidth면 추가 클래스
            // 여러 줄로 쓰고 trim/replace로 공백 정리
            className={`
                ${styles.dropdownContainer}
                ${fullWidth ? styles.fullWidth : ``}
            `.trim().replace(/\s+/g, ' ')}
            ref={containerRef} // 외부 클릭 감지를 위해 이 div를 참조
        >
            {/* 트리거 영역: 클릭하면 토글 */}
            <div className={styles.triggerWrapper} onClick={handleToggle}>
                {renderTrigger()}
            </div>

            {/* isOpen이 true일 때만 팝업(드롭다운 메뉴) 렌더링 */}
            {isOpen && (
                <div
                    className={`
                    ${styles.dropPopover}
                    ${styles[`align_${align}`]}
                    ${styles[`color_${color}`]}
                    ${fullWidth ? styles.fullWidth : ''}
                    `.trim().replace(/\s+/g, ' ')}
                    // 팝업 내부(메뉴 아이템) 클릭 시 드롭다운 닫기
                    // (예: 메뉴 항목 선택하면 자동으로 닫히는 UX)
                    onClick={() => setIsOpen(false)}
                >
                    {children}
                </div>
            )}
        </div>
    )
}

// React DevTools에서 컴포넌트 이름이 명확히 보이도록 지정
Dropdown.displayName = 'Dropdown'