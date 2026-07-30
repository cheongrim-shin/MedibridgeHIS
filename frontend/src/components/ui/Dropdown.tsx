import React, { useState, useRef, useEffect } from 'react';
import styles from './Dropdown.module.css';
import type { BaseUIProps } from '../types';
import { useComponentColor } from '../hooks/useComponentColor';

export interface DropdownProps extends BaseUIProps {
    children: React.ReactNode;
    align?: 'left' | 'right' | 'center';
    fullWidth?: boolean;
}

// 1. Context API를 이용해 부모의 상태를 서브 컴포넌트로 주입
interface DropdownContextValue {
    color?: string;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    anchorName: string;
    closeDropdown: () => void;
    popoverRef: React.RefObject<HTMLDivElement | null>;
    handleToggleEvent: (e: React.ToggleEvent<HTMLDivElement>) => void;
    align: 'left' | 'right' | 'center';
}

const DropdownContext = React.createContext<DropdownContextValue | null>(null);

function useDropdownContext() {
    const context = React.useContext(DropdownContext);
    if (!context) {
        throw new Error('Dropdown compound components must be rendered within a Dropdown provider');
    }
    return context;
}

export const Dropdown = ({
    children,
    color: propColor,
    align = 'left',
    fullWidth = false,
}: DropdownProps) => {
    const color = useComponentColor(propColor);
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);
    
    // Generate unique anchor name dynamically for CSS Anchor Positioning
    const [anchorId] = useState(() => `dropdown-anchor-${Math.random().toString(36).substring(2, 9)}`);
    const anchorName = `--${anchorId}`;

    // Synchronize React isOpen state with native Popover open state
    useEffect(() => {
        const popover = popoverRef.current;
        if (!popover) return;

        if (typeof popover.showPopover !== 'function') {
            console.warn('Popover API is not supported in this browser.');
            return;
        }

        try {
            const isCurrentlyOpen = popover.matches(':popover-open');
            if (isOpen && !isCurrentlyOpen) {
                popover.showPopover();
            } else if (!isOpen && isCurrentlyOpen) {
                popover.hidePopover();
            }
        } catch (error) {
            console.error('Popover API state synchronization failed:', error);
        }
    }, [isOpen]);

    const handleToggleEvent = (e: React.ToggleEvent<HTMLDivElement>) => {
        const nextState = e.newState;
        if (nextState === 'closed' && isOpen) {
            setIsOpen(false);
        } else if (nextState === 'open' && !isOpen) {
            setIsOpen(true);
        }
    };

    return (
        <DropdownContext.Provider 
            value={{ 
                color, 
                isOpen, 
                setIsOpen, 
                anchorName, 
                closeDropdown: () => setIsOpen(false),
                popoverRef,
                handleToggleEvent,
                align
            }}
        >
            <div className={`${styles.dropdownContainer} ${fullWidth ? styles.fullWidth : ''}`}>
                {children}
            </div>
        </DropdownContext.Provider>
    );
};

// 2. Dropdown.Trigger 서브 컴포넌트 선언
export interface DropdownTriggerProps {
    children: React.ReactNode;
}

Dropdown.Trigger = function DropdownTrigger({ children }: DropdownTriggerProps) {
    const { setIsOpen, anchorName } = useDropdownContext();

    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(prev => !prev);
    };

    return (
        <div 
            className={styles.triggerWrapper} 
            onClick={handleToggle}
            style={{ 'anchor-name': anchorName } as React.CSSProperties}
        >
            {children}
        </div>
    );
};

// 3. Dropdown.Menu 서브 컴포넌트 선언
Dropdown.Menu = function DropdownMenu({ children }: { children: React.ReactNode }) {
    const { popoverRef, handleToggleEvent, align, anchorName } = useDropdownContext();
    return (
        <div 
            ref={popoverRef}
            popover="auto"
            onToggle={handleToggleEvent}
            className={`${styles.dropdownPopover} ${styles[`align_${align}`]}`}
            style={{ 'position-anchor': anchorName } as React.CSSProperties}
        >
            {children}
        </div>
    );
};

// 4. Dropdown.Item 서브 컴포넌트 선언
export interface DropdownItemProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'style'> {
    children: React.ReactNode;
}

Dropdown.Item = function DropdownItem({ children, onClick, ...props }: DropdownItemProps) {
    const { closeDropdown, color } = useDropdownContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            onClick(e);
        }
        closeDropdown(); // 클릭 시 드롭다운 닫힘
    };

    return (
        <button
            type="button"
            className={`${styles.dropdownItem} ${color ? styles[`color_${color}`] : ''}`}
            onClick={handleClick}
            {...props}
        >
            {children}
        </button>
    );
};

Dropdown.displayName = 'Dropdown';
