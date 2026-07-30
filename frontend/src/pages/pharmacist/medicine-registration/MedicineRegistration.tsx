import { useEffect, useMemo, useState } from 'react';
import { Table } from '../../../components/Table';
import type { Column } from '../../../components/Table';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/Input';
import { Dropdown } from '../../../components/Dropdown';
import type { MedicineListVO } from '../medicine.types';
import { getMedicines, deleteMedicine, updateMedicine, COVERAGE_TO_LABEL } from '../medicine.api';
import { MedicineFormModal } from './MedicineFormModal';
import styles from './MedicineRegistration.module.css';

export const MedicineRegistration = () => {
    const [medicines, setMedicines] = useState<MedicineListVO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'register' | 'edit' | 'view'>('register');
    const [selectedMedicine, setSelectedMedicine] = useState<MedicineListVO | null>(null);

    useEffect(() => {
        let isCancelled = false;

        async function load() {
            setIsLoading(true);
            setLoadError(null);
            try {
                const data = await getMedicines();
                if (!isCancelled) setMedicines(data);
            } catch {
                if (!isCancelled) setLoadError('목록 불러오기 실패');
            } finally {
                if (!isCancelled) setIsLoading(false);
            }
        }

        load();
        return () => { isCancelled = true; };
    }, []);

    // 목록에 실제로 존재하는 약효분류만 필터 옵션으로 노출 (별도 COMMONCODE 조회 불필요)
    const categoryOptions = useMemo(() => {
        const names = medicines.map((med) => med.medicineCategoryName).filter(Boolean);
        return Array.from(new Set(names));
    }, [medicines]);

    const handleOpenRegister = () => {
        setModalMode('register');
        setSelectedMedicine(null);
        setIsModalOpen(true);
    };

    const handleOpenView = (medicine: MedicineListVO) => {
        setModalMode('view');
        setSelectedMedicine(medicine);
        setIsModalOpen(true);
    };

    const handleFormSubmit = async (result: MedicineListVO, isNew: boolean) => {
        try {
            if (isNew) {
                // 모달(MedicineFormModal)이 이미 POST 요청을 보내고 등록 완료된 결과(result)를 넘겨준 것
                // 여기서 또 createMedicine을 호출하면 안 됨 — 목록 상태에 반영만 하면 됨
                setMedicines(prev => [...prev, result]);
                alert(`${result.medicineNameText} 약품이 성공적으로 등록되었습니다.`);
            } else {
                await updateMedicine(result.medicineCode, result);
                setMedicines(prev => prev.map(med =>
                    med.medicineCode === result.medicineCode ? result : med
                ));
                alert(`${result.medicineNameText} 약품 정보가 성공적으로 수정되었습니다.`);
            }
            setIsModalOpen(false);
        } catch {
            alert(isNew ? '등록 중 오류가 발생했습니다.' : '수정 중 오류가 발생했습니다.');
        }
    };

    const handleFormDelete = async (medicineCode: string) => {
        try {
            await deleteMedicine(medicineCode);
            setMedicines(prev => prev.filter(med => med.medicineCode !== medicineCode));
            alert('약품이 성공적으로 삭제되었습니다.');
            setIsModalOpen(false);
        } catch {
            alert('삭제 중 오류가 발생했습니다.');
        }
    };

    const filteredMedicines = medicines.filter((med) => {
        const matchesSearch =
            (med.medicineNameText ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (med.manufacturer ?? '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || (med.medicineCategoryName ?? '') === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const columns: Column<MedicineListVO>[] = [
        { header: '약품 코드', key: 'medicineCode', width: '90px' },
        {
            header: '제품명',
            key: 'medicineNameText',
            width: '160px',
            render: (row) => (
                <span className={styles.medicineName}>
                    {row.medicineNameText ?? '-'}
                </span>
            )
        },
        { header: '제조사', key: 'manufacturer', width: '120px' },
        { header: '규격', key: 'specification', width: '80px' },
        { header: '단위', key: 'unitName', width: '60px', align: 'center' },
        {
            header: (
                <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
                    <Dropdown
                        align="left"
                        trigger={(isOpen) => (
                            <button type="button" className={styles.routeDropdownBtn}>
                                <span className={selectedCategory !== 'all' ? styles.routeFilterTextActive : ''}>
                                    {selectedCategory === 'all' ? '약효분류' : selectedCategory}
                                </span>
                                <svg className={`${styles.dropdownSvg} ${isOpen ? styles.isOpen : ''}`}
                                     viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd"
                                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                          clipRule="evenodd" />
                                </svg>
                            </button>
                        )}
                    >
                        {['all', ...categoryOptions].map((category) => (
                            <div
                                key={category}
                                className={selectedCategory === category ? 'active' : ''}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category === 'all' ? '전체' : category}
                            </div>
                        ))}
                    </Dropdown>
                </div>
            ),
            key: 'medicineCategoryName',
            width: '110px',
            align: 'left',
            render: (row) => <span style={{ paddingLeft: '16px' }}>{row.medicineCategoryName || '-'}</span>
        },
        {
            header: '재고(현재/최소)',
            key: 'currentQuantity',
            width: '90px',
            align: 'center',
            render: (row) => {
                const isLow = row.currentQuantity < row.minQuantity;
                return (
                    <span style={{ color: isLow ? '#ef4444' : undefined, fontWeight: isLow ? 600 : undefined }}>
                        {row.currentQuantity} / {row.minQuantity}
                    </span>
                );
            }
        },
        {
            header: '단가',
            key: 'unitCost',
            width: '90px',
            align: 'right',
            render: (row) => <span className={styles.priceCell}>{row.unitCost.toLocaleString()} 원</span>
        },
        {
            header: '수가',
            key: 'insuranceFee',
            width: '90px',
            align: 'right',
            render: (row) => <span className={styles.priceCell}>{row.insuranceFee.toLocaleString()} 원</span>
        },
        {
            header: '급여 여부',
            key: 'coverageYn',
            width: '90px',
            align: 'center',
            render: (row) => COVERAGE_TO_LABEL[row.coverageYn] ?? row.coverageYn
        }
    ];

    return (
        <div className={styles.container}>
            <div className={styles.listCard}>
                <div className={styles.filterRow}>
                    <div className={styles.inputWrapper}>
                        <Input
                            type="text"
                            size="sm"
                            placeholder="약품명 또는 제조사 검색..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            leftIcon={
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                                     style={{ width: '16px', height: '16px' }}>
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                            }
                        />
                    </div>

                    <Button
                        type="button"
                        color="indigo"
                        size="sm"
                        width="auto"
                        onClick={handleOpenRegister}
                    >
                        + 약품 등록
                    </Button>
                </div>

                <div className={styles.tableWrapper}>
                    {isLoading && <p>불러오는 중...</p>}
                    {loadError && <p style={{ color: '#ef4444' }}>{loadError}</p>}
                    {!isLoading && !loadError && (
                        <Table
                            columns={columns}
                            data={filteredMedicines}
                            size="md"
                            onRowClick={(row) => handleOpenView(row)}
                        />
                    )}
                </div>
            </div>

            {isModalOpen && (
                <MedicineFormModal
                    key={selectedMedicine?.medicineCode ?? 'new'}
                    mode={modalMode}
                    initialData={selectedMedicine}
                    onClose={() => setIsModalOpen(false)}
                    onRequestEdit={() => setModalMode('edit')}
                    onSubmit={handleFormSubmit}
                    onDelete={handleFormDelete}
                />
            )}
        </div>
    );
};