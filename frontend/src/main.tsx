import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from './features/auth/context/AuthContext.tsx';
import './features/auth/axios.setup'; // axios 인터셉터 등록 (side-effect import)

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>,
)
