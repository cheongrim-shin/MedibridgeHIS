import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'

import {Login} from './pages/login/Login'
import {Signup} from './pages/signup/Signup'
import {BlankLayout} from './pages/blankPage/layout/BlankLayout'
import {Content} from './pages/blankPage/content/Content'
import {PhysicalTherapistLayout} from './pages/physicalTherapist/layout/PhysicalTherapistLayout'
import {TherapyQueue} from './pages/physicalTherapist/therapyQueue/TherapyQueue.tsx'
import {TherapyItemManagement} from './pages/physicalTherapist/therapyItemManagement/TherapyItemManagement.tsx'
import {ReceptionistLayout} from './pages/receptionist/layout/ReceptionistLayout'
import {Counter} from './pages/receptionist/counter/Counter.tsx'
import {OutpatientLayout} from "./pages/outpatientNurse/layout/OutpatientLayout"
import {WaitQueue} from "./pages/outpatientNurse/wait-queue/WaitQueue"
import {PharmacistLayout} from './pages/pharmacist/layout/PharmacistLayout'
import {DispensingOrder} from './pages/pharmacist/dispensing-order/DispensingOrder'
import {DispensingHistory} from './pages/pharmacist/dispensing-history/DispensingHistory'
import {MedicineRegistration} from './pages/pharmacist/medicine-registration/MedicineRegistration'
import {AdminLayout} from './pages/admin/layout/AdminLayout';
import {PatientManagement} from './pages/admin/patient-management/PatientManagement.tsx';
import {EmployeeManagement} from './pages/admin/employee-management/EmployeeManagement.tsx';
import {FeeManagement} from './pages/admin/fee-management/FeeManagement.tsx';
import {InjectionOrder} from './pages/outpatientNurse/injection-order/InjectionOrder.tsx'
import {ProtectedRoute} from './pages/ProtectedRoute'
import { DoctorLayout } from './pages/doctor/layout/DoctorLayout.tsx'
import { TodayCallList } from './pages/doctor/today-call-list/TodayCallList.tsx'
import { MedicalHistory } from './pages/doctor/medical-history/MedicalHistory.tsx'
import { Diagnose } from './pages/doctor/diagnose/Diagnose.tsx'
import { AppointmentPage } from './pages/receptionist/appointments/AppointmentPage.tsx'
import { InjectionHistory } from './pages/outpatientNurse/injection-history/InjectionHistory.tsx'
import { DocumentPage } from './pages/receptionist/documents/DocumentPage.tsx'
import { TherapyBoard } from './pages/physicalTherapist/board/TherapyBoard.tsx'
import { Statistics } from './pages/admin/statistics-management/Statistics.tsx'
import { RoleShortcuts } from './pages/admin/role-shortcuts/RoleShortcuts.tsx'
import { RoleShortcutFab } from './components/common/RoleShortcutFab.tsx'
import {NoticeManagement} from "./pages/admin/notice-management/NoticeManagement.tsx";
import {FaqManagement} from "./pages/admin/faq-management/FaqManagement.tsx";
import {QnaManagement} from "./pages/admin/qna-management/QnaManagement.tsx";


function App() {
    return (
        <>
        <Routes>
            {/* 로그인 */}
            <Route path="/" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path={"/blank"} element={<BlankLayout/>}>
                <Route path="content" element={<Content/>}/>
            </Route>

            {/* 원무과 */}
            <Route path='/receptionist' element={
                <ProtectedRoute requiredRole="receptionist"><ReceptionistLayout/></ProtectedRoute>
            }>
                <Route index element={<Counter/>}/>
                <Route path='counter' element={<Counter/>}/>
                <Route path='appointments' element={<AppointmentPage/>}/>
                <Route path='patient-document' element={<DocumentPage/>}/>
            </Route>

            {/* 물리치료 */}
            <Route path='/physical-therapist' element={
                <ProtectedRoute requiredRole="physical-therapist"><PhysicalTherapistLayout/></ProtectedRoute>
            }>
                <Route index element={<TherapyQueue/>}/>
                <Route path='therapy-queue' element={<TherapyQueue/>}/>
                <Route path='therapy-item-management' element={<TherapyItemManagement/>}/>
            </Route>
            {/* 물리치료실 대기자 표시 모니터 화면 */}
            <Route path='/physical-therapist/board' element={
                <ProtectedRoute requiredRole="physical-therapist"><TherapyBoard/></ProtectedRoute>
            }/>

            {/* 의사 */}
            <Route path="/doctor" element={
                <ProtectedRoute requiredRole="doctor"><DoctorLayout /></ProtectedRoute>
            }>
                <Route index element={<Navigate to="/doctor/today-call-list" replace />} />
                <Route path="today-call-list" element={<TodayCallList />} />
                <Route path="history" element={<MedicalHistory />} />
                <Route path="diagnose" element={<Diagnose />} />
            </Route>

            {/* 간호사 */}
            <Route path="/outpatient-nurse" element={
                <ProtectedRoute requiredRole="outpatient-nurse"><OutpatientLayout/></ProtectedRoute>
            }>
                <Route index element={<WaitQueue />} />
                <Route path="queue" element={<WaitQueue />} />
                <Route path="injection-order" element={<InjectionOrder />} />
                <Route path="injection-history" element={<InjectionHistory />} />
            </Route>

            {/* 약사 */}
            <Route path="/pharmacist" element={
                <ProtectedRoute requiredRole="pharmacist"><PharmacistLayout/></ProtectedRoute>
            }>
                <Route index element={<DispensingOrder/>}/>
                <Route path="dispensing-order" element={<DispensingOrder/>}/>
                <Route path="dispensing-history" element={<DispensingHistory/>}/>
                <Route path="medicine-registration" element={<MedicineRegistration/>}/>
            </Route>

            {/* 관리자 */}
            <Route path="/admin" element={
                <ProtectedRoute requiredRole="admin"><AdminLayout/></ProtectedRoute>
            }>
                <Route index element={<PatientManagement />} />
                <Route path="patient-management" element={<PatientManagement />} />
                <Route path="patients" element={<PatientManagement />} />
                <Route path="employee-management" element={<EmployeeManagement />} />
                <Route path="fee-management" element={<FeeManagement />} />
                <Route path="notice-management" element={<NoticeManagement />} />
                <Route path="faq-management" element={<FaqManagement />} />
                <Route path="qna-management" element={<QnaManagement />} />
                <Route path="statistics-management" element={<Statistics />} />
                <Route path="role-shortcuts" element={<RoleShortcuts />} />
            </Route>
        </Routes>
        <RoleShortcutFab />
        </>
    )
}

export default App