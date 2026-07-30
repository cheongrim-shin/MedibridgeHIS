import type { ReactNode } from 'react';
import styles from './Layout.module.css';
import { LayoutMainHeader } from './LayoutMainHeader';
import { LayoutMainBody } from './LayoutMainBody';

const LayoutMainRoot = ({ children }: { children: ReactNode }) => {
    return <div className={styles.mainWrapper}>{children}</div>;
};

LayoutMainRoot.displayName = 'LayoutMain';

export const LayoutMain = LayoutMainRoot as typeof LayoutMainRoot & {
    Header: typeof LayoutMainHeader;
    Body: typeof LayoutMainBody;
};

LayoutMain.Header = LayoutMainHeader;
LayoutMain.Body = LayoutMainBody;
