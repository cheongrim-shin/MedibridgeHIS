import React from 'react';
import styles from './Table.module.css';

export interface Column<T> {
    header: React.ReactNode;
    key: string;
    width?: string;
    align?: 'left' | 'center' | 'right';
    render?: (row: T, index: number) => React.ReactNode;
}

export interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    size?: 'sm' | 'md' | 'lg';
    color?: 'green' | 'indigo' | 'amber' | 'red' | 'blue' | 'teal';
    onRowClick?: (row: T, index: number) => void;
    rowClassName?: (row: T, index: number) => string;
    emptyMessage?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Table = <T extends Record<string, any>>({
    columns,
    data,
    size = 'md',
    color = 'green',
    onRowClick,
    rowClassName,
    emptyMessage = '조회된 데이터가 없습니다.',
}: TableProps<T>) => {
    const renderColGroup = () => (
        <colgroup>
            {columns.map((col, idx) => (
                <col key={idx} style={{ width: col.width }} />
            ))}
        </colgroup>
    );

    return (
        <div className={`
            ${styles.tableWrapper}
            ${styles[`size_${size}`]}
            ${styles[`color_${color}`]}
            ${data.length === 0 ? styles.isEmpty : ''}
        `.trim().replace(/\s+/g, ' ')}>
            <div className={styles.headerContainer}>
                <table className={styles.table}>
                    {renderColGroup()}
                    <thead>
                        <tr>
                            {columns.map((col, idx) => (
                                <th key={idx} style={col.align ? { textAlign: col.align } : undefined}>
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                </table>
            </div>
            <div className={styles.bodyContainer}>
                <table className={styles.table}>
                    {renderColGroup()}
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className={styles.emptyCell}>
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            data.map((row, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    className={`${styles.row} ${onRowClick ? styles.clickable : ''} ${
                                        rowClassName ? rowClassName(row, rowIndex) : ''
                                    }`}
                                    onClick={() => onRowClick && onRowClick(row, rowIndex)}
                                >
                                    {columns.map((col, colIndex) => (
                                        <td key={colIndex} style={col.align ? { textAlign: col.align } : undefined}>
                                            {col.render ? col.render(row, rowIndex) : row[col.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
