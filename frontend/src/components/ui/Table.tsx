import React, { createContext, useContext } from 'react';
import styles from './Table.module.css';
import type { ComponentColor, ComponentSize } from '../types';
import { useComponentColor } from '../hooks/useComponentColor';

const TableContext = createContext<{ gridTemplate?: string }>({});

export const Table = ({
    children,
    size = 'md',
    color: propColor,
    widths,
}: {
    children: React.ReactNode;
    size?: ComponentSize;
    color?: ComponentColor;
    widths?: number[];
}) => {
    const color = useComponentColor(propColor);

    const gridTemplate = widths
        ? widths.map((w) => `${w}%`).join(' ')
        : undefined;

    return (
        <TableContext.Provider value={{ gridTemplate }}>
            <div className={`${styles.tableWrapper} ${styles[`size_${size}`]} ${styles[`color_${color}`]}`}>
                {children}
            </div>
        </TableContext.Provider>
    );
};

const TableHeader = ({ children }: { children: React.ReactNode }) => (
    <div className={styles.headerContainer}>{children}</div>
);

const TableBody = ({ 
    children, 
    emptyMessage = '조회된 데이터가 없습니다.' 
}: { 
    children?: React.ReactNode;
    emptyMessage?: string; 
}) => {
    const hasData = React.Children.toArray(children).filter(Boolean).length > 0;

    return (
        <div className={styles.bodyContainer}>
            {hasData ? (
                children
            ) : (
                <TableRow fullWidth>
                    <TableCell>
                        <div className={styles.emptyCell}>
                            {emptyMessage}
                        </div>
                    </TableCell>
                </TableRow>
            )}
        </div>
    );
};

const TableRow = ({
    children,
    active = false,
    onClick,
    fullWidth = false,
}: {
    children: React.ReactNode;
    active?: boolean;
    onClick?: () => void;
    fullWidth?: boolean;
}) => {
    const { gridTemplate } = useContext(TableContext);

    const rowStyle: React.CSSProperties = {
        ...(fullWidth || !gridTemplate
            ? { display: 'flex' }
            : { display: 'grid', gridTemplateColumns: gridTemplate }
        )
    };

    return (
        <div 
            className={`${styles.row} ${onClick ? styles.clickable : ''} ${active ? styles.activeRow : ''}`}
            style={rowStyle}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

const TableCell = ({
    children,
    align = 'left',
}: {
    children: React.ReactNode;
    align?: 'left' | 'center' | 'right';
}) => {
    const cellStyle: React.CSSProperties = {
        flex: '1 1 0%',
        minWidth: 0,
        textAlign: align,
    };
    return (
        <div className={styles.cell} style={cellStyle}>
            {children}
        </div>
    );
};

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;

Table.displayName = 'Table';
