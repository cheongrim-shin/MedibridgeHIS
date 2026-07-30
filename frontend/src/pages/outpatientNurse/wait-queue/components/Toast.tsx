import { useEffect } from "react";
import styles from "./Toast.module.css"

interface ToastProps {
    message: string;
    onClose: () => void;
    duration?:number; // 몇 초뒤에 사라질건지
}

export function Toast({message, onClose, duration = 2000}: ToastProps) {
    // 컴포넌트가 화면에 나타나면 타이머를 걸어서 일정 시간 후 자동으로 닫힘
    useEffect(() => {
        const timer = setTimeout(()=> {
            onClose();
        }, duration);

        // 컴포넌트가 사라지거나 다시 렌더링되기 전에 이전 타이머를 정리
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div className={styles.toast}>
            {message}
        </div>
    )

}


