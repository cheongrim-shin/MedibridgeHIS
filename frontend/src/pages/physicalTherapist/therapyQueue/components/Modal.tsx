import { createPortal } from 'react-dom';
import React, { createContext, useContext, useEffect, useState } from 'react';
import styles from './Modal.module.css';

interface ModalContextType {
    variant: 'default' | 'tabbed';
}

const ModalContext = createContext<ModalContextType | null>(null);

function useModalContext() {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('Modal compound components must be rendered within a Modal provider');
    }
    return context;
}

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    variant?: 'default' | 'tabbed';
    width?: string;
    height?: string;
}

export function Modal({
    children,
    variant = 'default',
    width,
    height,
    onClick,
    ...rest
}: ModalProps) {
    const [mounted, setMounted] = useState(false);

    // 마운트 시 뒷배경 스크롤 방지
    useEffect(() => {
        const timer = setTimeout(() => {
            setMounted(true);
        }, 0);

        const originalStyle = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            clearTimeout(timer);
            document.body.style.overflow = originalStyle;
        };
    }, []);

    const resolvedWidth = width || (variant === 'tabbed' ? '580px' : '420px');
    const resolvedHeight = height || (variant === 'tabbed' ? '620px' : 'auto');

    if (!mounted) return null;

    return createPortal(
        <ModalContext.Provider value={{ variant }}>
            <div className={styles.backdrop} onClick={onClick} {...rest}>
                <div 
                    className={`${styles.container} ${styles[`container_${variant}`]}`}
                    style={{ maxWidth: resolvedWidth, height: resolvedHeight }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {children}
                </div>
            </div>
        </ModalContext.Provider>,
        document.body
    );
}

// 1. Modal.Header (헤더 컨테이너)
interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}
Modal.Header = function ModalHeader({ children, className, ...rest }: ModalHeaderProps) {
    const { variant } = useModalContext();
    return (
        <div 
            className={`${styles.header} ${styles[`header_${variant}`]} ${className || ''}`}
            {...rest}
        >
            {children}
        </div>
    );
};

// 2. Modal.Title (일반 팝업용 타이틀)
interface ModalTitleProps {
    children: React.ReactNode;
}
Modal.Title = function ModalTitle({ children }: ModalTitleProps) {
    return <span className={styles.title}>{children}</span>;
};

// 3. Modal.CloseBtn (닫기 버튼 - 통일된 × 디자인 제공)
type ModalCloseBtnProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
Modal.CloseBtn = function ModalCloseBtn(props: ModalCloseBtnProps) {
    return (
        <button 
            type="button" 
            className={styles.closeBtn}
            {...props}
            aria-label="닫기"
        />
    );
};

// 4. Modal.Content (내부 콘텐츠 컨테이너 및 탭 스크롤 박스)
interface ModalContentProps {
    children: React.ReactNode;
}
Modal.Content = function ModalContent({ children }: ModalContentProps) {
    const { variant } = useModalContext();
    return (
        <div className={`${styles.content} ${styles[`content_${variant}`]}`}>
            {children}
        </div>
    );
};

Modal.displayName = 'Modal';
