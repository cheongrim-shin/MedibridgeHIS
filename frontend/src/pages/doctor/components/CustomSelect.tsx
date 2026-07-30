import { useEffect, useRef, useState } from "react";
import styles from "./CustomSelect.module.css";

interface CustomSelectOption {
    value: string;
    label: string;
}

interface CustomSelectProps {
    options: CustomSelectOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export function CustomSelect({ options, value, onChange, placeholder = "선택 없음" }: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selected = options.find((opt) => opt.value === value);

    return (
        <div className={styles.customSelectWrapper} ref={wrapperRef}>
            <button
                type="button"
                className={styles.customSelectTrigger}
                onClick={() => setIsOpen((v) => !v)}
            >
                <span>{options.length === 0 ? placeholder : selected?.label ?? placeholder}</span>
                <svg
                    className={`${styles.customSelectArrow} ${isOpen ? styles.customSelectArrowOpen : ""}`}
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </button>

            {isOpen && options.length > 0 && (
                <ul className={styles.customOptionList}>
                    {options.map((opt) => (
                        <li
                            key={opt.value}
                            className={`${styles.customOptionItem} ${
                                opt.value === value ? styles.customOptionItemActive : ""
                            }`}
                            onClick={() => {
                                onChange(opt.value);
                                setIsOpen(false);
                            }}
                        >
                            {opt.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}