import { useEffect, useState } from "react";
import { fetchDoctors, type DoctorRow } from "../shared/doctor.api";

export const useDoctors =(enabled: boolean = true) =>{
    const [doctors, setDoctors] = useState<DoctorRow[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        if(!enabled) return;
        let ignore = false;
        fetchDoctors()
            .then((list)=> {if(!ignore) setDoctors(list);})
            .catch((e) =>{if(!ignore) setError(e instanceof Error ? e.message: "담당의 목록 로드 실패");});
        return () => {
            ignore = true;
        };
    },[enabled]);
    return { doctors, error};
}