import React, { forwardRef, useImperativeHandle, useState, useCallback } from 'react';
import styles from './Modal.module.css';
import type { BaseUIProps } from '../types';
import { ModalContext } from './Modal.context';
import { ModalHeader } from './ModalHeader';
import { ModalBody } from './ModalBody';
import { useComponentColor } from '../hooks/useComponentColor';

export interface ModalRef {
    open: () => void;
    close: () => void;
}

export interface ModalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color' | 'className' | 'style'>, BaseUIProps {
    children?: React.ReactNode;
    variant?: 'default' | 'tabbed';
    width: string;
    onTabChange?: (tab: string) => void;
}

const findFirstTabTarget = (children: React.ReactNode): string => {
    let firstTarget = '';
    const search = (node: React.ReactNode) => {
        if (firstTarget) return;
        React.Children.forEach(node, (child) => {
            if (firstTarget) return;
            if (React.isValidElement(child)) {
                const props = child.props as Record<string, unknown> | undefined;
                if (props) {
                    if ('target' in props && typeof props.target === 'string') {
                        firstTarget = props.target;
                        return;
                    }
                    if (props.children) {
                        search(props.children as React.ReactNode);
                    }
                }
            }
        });
    };
    search(children);
    return firstTarget;
};

const ModalRoot = forwardRef<ModalRef, ModalProps>(({
    children,
    variant = 'default',
    width,
    onTabChange,
    color: propColor,
    ...props
}, ref) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const color = useComponentColor(propColor);

    const firstTabTarget = findFirstTabTarget(children);
    const [activeTab, setActiveTab] = useState<string>(firstTabTarget);

    const handleTabChange = useCallback((tab: string) => {
        setActiveTab(tab);
        if (onTabChange) {
            onTabChange(tab);
        }
    }, [onTabChange]);

    useImperativeHandle(ref, () => ({
        open: () => {
            setIsOpen(true);
            setActiveTab(firstTabTarget);
        },
        close: () => setIsOpen(false),
    }));

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            setIsOpen(false);
        }
    };

    if (!isOpen) return null;

    const handleClose = () => setIsOpen(false);

    return (
        <ModalContext.Provider value={{ variant, activeTab, onTabChange: handleTabChange, color }}>
            <div className={styles.backdrop} onClick={handleBackdropClick}>
                <div
                    role="dialog"
                    aria-modal="true"
                    className={`${styles.container} ${styles[`container_${variant}`]}`}
                    style={{ width }}
                    tabIndex={-1}
                    onClick={(event) => event.stopPropagation()}
                    {...props}
                >
                    <button
                        type="button"
                        className={styles.closeBtn}
                        onClick={handleClose}
                        aria-label="닫기"
                    />
                    {children}
                </div>
            </div>
        </ModalContext.Provider>
    );
});

ModalRoot.displayName = 'Modal';

export const Modal = ModalRoot as typeof ModalRoot & {
    Header: typeof ModalHeader;
    Body: typeof ModalBody;
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
