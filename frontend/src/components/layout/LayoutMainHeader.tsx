import { useState, useEffect, forwardRef } from 'react';
import styles from './Layout.module.css';
import { useLayoutContext } from './Layout.context';
import { Button } from '../ui/Button';
import type { ButtonProps } from '../ui/Button';

// Internal ButtonWidget
type ButtonWidgetProps = Omit<ButtonProps, 'size'>;

const ButtonWidget = forwardRef<HTMLButtonElement, ButtonWidgetProps>(({
    color,
    ...props
}, ref) => {
    const context = useLayoutContext();
    const resolvedColor = color || context?.color || 'green';

    return (
        <Button
            ref={ref}
            color={resolvedColor}
            size="sm"
            {...props}
        />
    );
});
ButtonWidget.displayName = 'ButtonWidget';

// Internal TimeWidget
const TimeWidget = () => {
    const context = useLayoutContext();
    const resolvedColor = context?.color || 'green';
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            setCurrentTime(`${month}.${day} ${hours}:${minutes}:${seconds}`);
        };
        updateTime();
        const timer = setInterval(updateTime, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    const iconThemeClass = styles[`widgetIcon_${resolvedColor}`] || styles.widgetIcon_green;

    return (
        <div className={styles.timeWidget}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`${styles.widgetIcon} ${iconThemeClass}`}>
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className={styles.timeText}>{currentTime}</span>
        </div>
    );
};

// Exported LayoutMainHeader
export interface LayoutMainHeaderAction {
    text: string;
    onClick: () => void;
}

export interface LayoutMainHeaderProps {
    title: string;
    badge?: string;
    action?: LayoutMainHeaderAction;
}

export const LayoutMainHeader = ({ title, badge, action }: LayoutMainHeaderProps) => {
    const context = useLayoutContext();
    const themeClass = styles[`color_${context?.color || 'green'}`] || styles.color_green;
    const badgeThemeClass = styles[`badge_${context?.color || 'green'}`] || styles.badge_green;

    return (
        <header className={`${styles.mainHeader} ${themeClass}`}>
            <div className={styles.headerLeft}>
                <div className={styles.headerTitleArea}>
                    <span className={styles.headerTitleText}>
                        {title}
                    </span>
                    {badge && (
                        <span className={`${styles.headerBadge} ${badgeThemeClass}`}>
                            {badge}
                        </span>
                    )}
                </div>
            </div>
            <div className={styles.headerRight}>
                {action ? (
                    <ButtonWidget 
                        variant="solid" 
                        onClick={action.onClick}
                    >
                        {action.text}
                    </ButtonWidget>
                ) : (
                    <TimeWidget />
                )}
            </div>
        </header>
    );
};
