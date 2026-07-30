 // hooks/useBeds.ts
import { useEffect, useState } from "react"
import { type BedState } from "./therapyQueue.types"
import { fetchBeds } from "./therapyQueue.api";

export const useBeds = () =>{
    const [beds, setBeds] = useState<BedState[]>([]); // 초기값: 빈 배열, null 아님

    // 마운트 시 1회 로딩 
    useEffect(()=>{
        fetchBeds()
            .then(setBeds)
            .catch((e)=> console.error("베드 로드 실패", e));
    },[]);

    // 1초마다 남은 시간 깎기
    useEffect(()=>{
        if (!beds.some(b=> b.status === 'occupied')) return;

        const interval = setInterval(()=>{
            setBeds(prev =>{
                if(!prev.some(b=> b.status === 'occupied' && b.remainingSeconds >0))
                    return prev;
                return prev.map(bed=>
                    bed.status === 'occupied' && bed.remainingSeconds > 0
                    ? {...bed, remainingSeconds: bed.remainingSeconds -1}
                    : bed
                );
            });
        }, 1000);

        return() => clearInterval(interval);
    },[beds]);

    return{beds, setBeds};
}