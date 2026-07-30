import { useLocation, Outlet } from 'react-router-dom';
import { Layout } from '../../../components/layout/Layout';
import { RECEPTIONIST_MENU_ITEMS } from '../receptionist.schema';

export const ReceptionistLayout = () => {
    const { pathname } = useLocation();

    // URL 마지막 세그먼트를 추출하고 스키마에 정의된 메뉴 ID인지 검사하여 activeMenu 결정
    const lastPath = pathname.split('/').pop();
    const activeMenu = (lastPath && RECEPTIONIST_MENU_ITEMS.some((item) => item.id === lastPath)) 
        ? lastPath 
        : 'counter';
        
    const currentMenu = RECEPTIONIST_MENU_ITEMS.find((item) => item.id === activeMenu) || RECEPTIONIST_MENU_ITEMS[0];

    return (
        <Layout color="green">
            <Layout.Sidebar>
                <Layout.Sidebar.Header 
                    logoTextPrefix="Medi" 
                    logoTextSuffix="Reception" 
                    logoIcon={
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 18a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2H2v-2Z" />
                            <path d="M20 16a8 8 0 1 0-16 0" />
                            <path d="M12 4v4" />
                            <path d="M10 4h4" />
                        </svg>
                    }
                />
                <Layout.Sidebar.Menu>
                    {RECEPTIONIST_MENU_ITEMS.map((item) => (
                        <Layout.Sidebar.Item
                            key={item.id}
                            id={item.id}
                            label={item.label}
                            path={item.path}
                            icon={item.icon}
                            active={activeMenu === item.id}
                        />
                    ))}
                </Layout.Sidebar.Menu>
            </Layout.Sidebar>
            
            <Layout.Main>
                <Layout.Main.Header title={currentMenu.label} />
                <Layout.Main.Body>
                    <Outlet />
                </Layout.Main.Body>
            </Layout.Main>
        </Layout>
    );
};
