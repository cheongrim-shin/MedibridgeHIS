import { useEffect, useState } from 'react';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { Table } from '../../../components/ui/Table';
import styles from './DocumentPage.module.css';
import type { DocumentType, DocumentRow } from './document.types';
import { fetchDocumentTypes, fetchDocuments, changeDocumentState, payDocumentByPortOne, completeDocumentPayment, payDocumentByCash } from './document.api';
import { Tab } from '../../../components/tab/Tab';

export const DocumentPage = () => {
    const [types, setTypes] = useState<DocumentType[]>([]);   // 수수료 표시용
    const [keyword, setKeyword] = useState('');
    const [rows, setRows] = useState<DocumentRow[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => { fetchDocumentTypes().then(setTypes).catch(() => setTypes([])); }, []);

    const loadList = () => fetchDocuments(keyword).then(setRows).catch(() => setRows([]));
    useEffect(() => { loadList(); }, []);

    // 서류종류명  수수료 (COMMONCODE R그룹 단가)
    const feeOf = (docType: string | null) =>
        types.find((t) => t.name === docType)?.unitPrice;

    const printDocument = (row: DocumentRow) => {
        if (row.documentType === '소견서') printOpinion(row);
        else printDiagnosis(row);   // 그 외(일반진단서 등)는 진단서 서식
    };


    //진단서
    const printDiagnosis = (row: DocumentRow) => {
        const w = window.open('', '_blank', 'width=820,height=1000');
        if (!w) { alert('팝업 차단을 해제해 주세요.'); return; }
        const today = new Date().toISOString().slice(0, 10);
        const rrn = row.birthDate ? `${row.birthDate}-*******` : '-';

        w.document.write(`
    <html><head><title>진단서</title><style>
    * { box-sizing: border-box; }
    body { font-family: 'Malgun Gothic', sans-serif; padding: 36px 44px; color: #111; font-size: 12.5px; }
    .docNo { font-size: 11px; margin-bottom: 6px; }
    .frame { border: 2px solid #111; padding: 18px 20px; }
    h1 { text-align: center; letter-spacing: 24px; font-size: 30px; margin: 6px 0 18px; text-indent: 24px; }
    table.form { width: 100%; border-collapse: collapse; }
    table.form td { border: 1px solid #111; padding: 8px 10px; vertical-align: top; }
    td.h { width: 110px; background: #f3f3f3; font-weight: 700; text-align: center; vertical-align: middle; }
    .tall { height: 92px; }    
    .mid  { height: 56px; }
    .chk { font-size: 11.5px; color: #333; }
    .sign { margin-top: 22px; }
    .sign p { margin: 4px 0; }
    .stampWrap { position: relative; text-align: right; margin-top: 14px; padding-right: 30px; }
    .stamp-img { position: absolute; right: 8px; top: -26px; width: 84px; opacity: 0.9; }
    .stamp-css { position: absolute; right: 14px; top: -18px; width: 70px; height: 70px;
                border: 3px solid #c0392b; border-radius: 50%; color: #c0392b;
                display: flex; align-items: center; justify-content: center; text-align: center;
                font-weight: 800; font-size: 13px; transform: rotate(-10deg); }
    .center { text-align: center; }
    .foot { font-size: 11px; color: #444; margin-top: 10px; }
    </style></head><body>
    <div class="docNo">발행번호: ${today.replace(/-/g, '')}-${row.receiveNumber}
        &nbsp;&nbsp;등록번호: ${row.medicalNumber}</div>

    <div class="frame">
        <h1>진 단 서</h1>
        <table class="form">
        <tr>
            <td class="h">환자 성명</td><td style="width:26%">${row.memberName}</td>
            <td class="h">주민등록번호</td><td>${rrn}</td>
        </tr>
        <tr>
            <td class="h">환자 주소</td>
            <td colspan="3">${row.address ?? '-'} &nbsp;&nbsp;<span class="chk">(연락처: ${row.phone ?? '-'})</span></td>
        </tr>
        <tr>
            <td class="h">병 명<br/><span class="chk">☐ 임상적추정<br/>☑ 최종진단</span></td>
            <td colspan="2" class="mid"><b>${row.diagnosis ?? '(진료기록 참조)'}</b></td>
            <td style="width:18%"><span class="chk">한국표준질병<br/>분류번호</span><br/><br/>-</td>
        </tr>
        <tr>
            <td class="h">진단년월일</td><td>${row.treatmentDate ?? row.receiveDate ?? '-'}</td>
            <td class="h">발행일</td><td>${today}</td>
        </tr>
        <tr>
            <td class="h">치료내용 및<br/>향후 치료에<br/>대한 소견</td>
            <td colspan="3" class="tall">${row.treatmentPlan ?? '-'}</td>
        </tr>
        <tr>
            <td class="h">용 도</td><td colspan="3">${row.receiveUse ?? '-'}</td>
        </tr>
        <tr>
            <td class="h">비 고</td><td colspan="3" class="mid"></td>
        </tr>
        </table>

        <div class="sign">
        <p class="center" style="font-size:15px; margin-top:18px;"><b>위와 같이 진단합니다.</b></p>
        <div class="stampWrap">
            <p>의료기관 명칭: <b>메디브릿지 병원</b></p>
            <p>주&nbsp;&nbsp;&nbsp;소: 대전광역시 중구 계룡로 000</p>
            <p>전&nbsp;&nbsp;&nbsp;화: 042-000-0000</p>
            <p>의사 성명: <b>${row.doctorName ?? '-'}</b> &nbsp;(인)&nbsp;&nbsp; 면허번호: 제&nbsp;&nbsp;&nbsp;&nbsp;호</p>
            <img class="stamp-img" src="${location.origin}/stamp.png"
                onerror="this.remove(); document.getElementById('cssStamp').style.display='flex';"/>
            <div id="cssStamp" class="stamp-css" style="display:none">메디브릿지<br/>병원장인</div>
        </div>
        </div>
    </div>

    <p class="foot">※ 본 진단서는 메디브릿지 HIS에서 전자 발급되었습니다. 서류번호 ${row.receiveNumber}</p>
    <script>window.onload = () => { window.print(); }</scr` + `ipt>
    </body></html>`);
        w.document.close();
    };

    //소견서
    const printOpinion = (row: DocumentRow) => {
        const w = window.open('', '_blank', 'width=820,height=1000');
        if (!w) { alert('팝업 차단을 해제해 주세요.'); return; }
        const today = new Date().toISOString().slice(0, 10);
        const rrn = row.birthDate ? `${row.birthDate}-*******` : '-';

        w.document.write(`
        <html><head><title>소견서</title><style>
        * { box-sizing: border-box; }
        body { font-family: 'Malgun Gothic', sans-serif; padding: 36px 44px; color: #111; font-size: 12.5px; }
        .docNo { font-size: 11px; margin-bottom: 6px; }
        .frame { border: 2px solid #111; padding: 18px 20px; }
        h1 { text-align: center; letter-spacing: 24px; font-size: 30px; margin: 6px 0 18px; text-indent: 24px; }
        table.form { width: 100%; border-collapse: collapse; }
        table.form td { border: 1px solid #111; padding: 8px 10px; vertical-align: top; }
        td.h { width: 110px; background: #f3f3f3; font-weight: 700; text-align: center; vertical-align: middle; }
        .tall { height: 220px; }          /* 소견 본문은 크게 */
        .chk { font-size: 11.5px; color: #333; }
        .sign { margin-top: 22px; }
        .sign p { margin: 4px 0; }
        .stampWrap { position: relative; text-align: right; margin-top: 14px; padding-right: 30px; }
        .stamp-css { position: absolute; right: 14px; top: -18px; width: 70px; height: 70px;
                    border: 3px solid #c0392b; border-radius: 50%; color: #c0392b;
                    display: flex; align-items: center; justify-content: center; text-align: center;
                    font-weight: 800; font-size: 13px; transform: rotate(-10deg); }
        .center { text-align: center; }
        .foot { font-size: 11px; color: #444; margin-top: 10px; }
        /* 줄바꿈 보존 — 의사가 여러 줄로 쓴 소견을 그대로 */
        .opinion { white-space: pre-wrap; line-height: 1.7; }
        </style></head><body>
        <div class="docNo">발행번호: ${today.replace(/-/g, '')}-${row.receiveNumber}
            &nbsp;&nbsp;등록번호: ${row.medicalNumber}</div>

        <div class="frame">
            <h1>소 견 서</h1>
            <table class="form">
            <tr>
                <td class="h">환자 성명</td><td style="width:26%">${row.memberName}</td>
                <td class="h">주민등록번호</td><td>${rrn}</td>
            </tr>
            <tr>
                <td class="h">환자 주소</td>
                <td colspan="3">${row.address ?? '-'} &nbsp;&nbsp;<span class="chk">(연락처: ${row.phone ?? '-'})</span></td>
            </tr>
            <tr>
                <td class="h">진료과 / 담당의</td>
                <td>${row.doctorName ?? '-'}</td>
                <td class="h">발행일</td><td>${today}</td>
            </tr>
            <tr>
                <td class="h">소견 내용</td>
                <td colspan="3" class="tall opinion">${row.documentContents ?? '(소견 내용이 입력되지 않았습니다)'}</td>
            </tr>
            <tr>
                <td class="h">용 도</td><td colspan="3">${row.receiveUse ?? '-'}</td>
            </tr>
            </table>

            <div class="sign">
            <p class="center" style="font-size:15px; margin-top:18px;"><b>위와 같이 소견합니다.</b></p>
            <div class="stampWrap">
                <p>의료기관 명칭: <b>메디브릿지 병원</b></p>
                <p>주&nbsp;&nbsp;&nbsp;소: 대전광역시 중구 계룡로 000</p>
                <p>전&nbsp;&nbsp;&nbsp;화: 042-000-0000</p>
                <p>의사 성명: <b>${row.doctorName ?? '-'}</b> &nbsp;(인)&nbsp;&nbsp; 면허번호: 제&nbsp;&nbsp;&nbsp;&nbsp;호</p>
                <div class="stamp-css">메디브릿지<br/>병원장인</div>
            </div>
            </div>
        </div>

        <p class="foot">※ 본 소견서는 메디브릿지 HIS에서 전자 발급되었습니다. 서류번호 ${row.receiveNumber}</p>
        <script>window.onload = () => { window.print(); }</scr` + `ipt>
        </body></html>`);
        w.document.close();
    };


    // '접수'  '발급완료' 처리
    const handleComplete = async (row: DocumentRow) => {
        try {
            await changeDocumentState(row.receiveNumber, '발급완료');
            printDocument(row);      // 성공 후 인쇄
            loadList();
        } catch (e) {
            setError(e instanceof Error ? e.message : '상태변경 실패');
        }
    };

    const handlePay = async (row: DocumentRow, method: '현금' | '간편결제') => {
        const fee = feeOf(row.documentType);
        if(!fee) return setError("발급비가 없는 서류입니다.");
        if(!window.confirm(`${row.documentType} 수수료 ${fee.toLocaleString()}원을 ${method}(으)로 수납하시겠습니까?`)) return;
        try {
            if (method === '현금') {
                await payDocumentByCash(row.receiveNumber);            // 결제창 없이 서버 적재
            } else {
                const paymentId = await payDocumentByPortOne(row.receiveNumber, row.documentType, fee);
                await completeDocumentPayment(row.receiveNumber, paymentId);
            }
            loadList();
        } catch (e) {
            setError(e instanceof Error ? e.message : "수납 실패");
        }
    };

    // 상태 필터
    const pendingRows = rows.filter(r => r.receiveState === '접수' || r.receiveState === '수납완료'); 
    const doneRows    = rows.filter(r => r.receiveState === '발급완료');

    const threeDaysAgo = (() => {
        const d = new Date(); d.setDate(d.getDate() - 2);          // 오늘 포함 3일
        return d.toISOString().slice(0, 10);
    })();
    const recent3d = rows.filter((r) => (r.receiveDate ?? '') >= threeDaysAgo).length;
    const unpaidRows = rows.filter(r => r.receiveState === '접수');
    const pendingFee = unpaidRows.reduce((sum, r) => sum + (feeOf(r.documentType) ?? 0), 0);

    return (
        <div className={styles.page}>
            <p className={styles.notice}>
                <b>[시연용]</b> 의사가 신청한 진단서·소견서를 원무에서 수수료 수납 후 발급하는 화면입니다.
                현금·간편결제(포트원)를 지원하며, 수납 완료 시 서류를 전자 출력합니다.
            </p>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.summaryRow}>
                <div className={styles.summaryCard}>
                    <span className={styles.summaryTitle}>미처리</span>
                    <span className={`${styles.summaryValue} ${styles.colorAmber}`}>{unpaidRows.length}</span>
                </div>
                <div className={styles.summaryCard}>
                    <span className={styles.summaryTitle}>최근 3일 신청</span>
                    <span className={styles.summaryValue}>{recent3d}</span>
                </div>
                <div className={styles.summaryCard}>
                    <span className={styles.summaryTitle}>발급완료</span>
                    <span className={`${styles.summaryValue} ${styles.colorGreen}`}>{doneRows.length}</span>
                </div>
                <div className={styles.summaryCard}>
                    <span className={styles.summaryTitle}>미처리 수수료</span>
                    <span className={styles.summaryValue}>{pendingFee.toLocaleString()}원</span>
                </div>
            </div>

            <div className={styles.searchRow}>
                <Input placeholder="환자명 검색" value={keyword}
                       onChange={(e) => setKeyword(e.target.value)}
                       onKeyDown={(e) => { if (e.key === 'Enter') loadList(); }}/>
                <Button size="sm" width="auto" onClick={loadList}>검색</Button>
            </div>
            <Tab>
                <Tab.List>
                    <Tab.List.TabButton target={"접수"} default={true}>
                        처리대기{pendingRows.length > 0 && `(${pendingRows.length})`}
                    </Tab.List.TabButton>
                    <Tab.List.TabButton target={"발급완료"}>발급완료</Tab.List.TabButton>
                    <Tab.List.TabButton target={"전체"}>전체</Tab.List.TabButton>
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panels.TabPanel value={"접수"}>
                        <DocTable rows={pendingRows} onComplete={handleComplete} onReprint={printDocument} handlePay={handlePay}  feeOf={feeOf}/>
                    </Tab.Panels.TabPanel>
                    <Tab.Panels.TabPanel value={"발급완료"}>
                        <DocTable rows={doneRows} onComplete={handleComplete} onReprint={printDocument} handlePay={handlePay}  feeOf={feeOf}/>
                    </Tab.Panels.TabPanel>
                    <Tab.Panels.TabPanel value={"전체"}>
                        <DocTable rows={rows} onComplete={handleComplete} onReprint={printDocument} handlePay={handlePay} feeOf={feeOf}/>
                    </Tab.Panels.TabPanel>
                </Tab.Panels>
            </Tab>
        </div>
    );
};

function DocTable({ rows, onComplete, onReprint, handlePay, feeOf }: {
    rows: DocumentRow[];
    onComplete: (r: DocumentRow) => void;
    onReprint: (r: DocumentRow) => void; 
    handlePay: (r: DocumentRow, method: '현금' | '간편결제') => void;
    feeOf: (name: string | null) => number | undefined;
}) {
    return (
        <div className={styles.tableScroll}>   {/* 스크롤 영역 */}
            <Table widths={[10, 14, 14, 14, 12, 12, 10, 14]}>
                <Table.Header>
                    <Table.Row>
                        <Table.Cell>서류번호</Table.Cell>
                        <Table.Cell>환자명</Table.Cell>
                        <Table.Cell>서류종류</Table.Cell>
                        <Table.Cell>용도</Table.Cell>
                        <Table.Cell>접수일</Table.Cell>
                        <Table.Cell>수수료</Table.Cell>
                        <Table.Cell>상태</Table.Cell>
                        <Table.Cell>처리</Table.Cell>
                    </Table.Row>
                </Table.Header>
                <Table.Body emptyMessage="발급 내역이 없습니다.">
                    {rows.map((r) => (
                        <Table.Row key={r.receiveNumber}>
                            <Table.Cell>{r.receiveNumber}</Table.Cell>
                            <Table.Cell>{r.memberName}</Table.Cell>
                            <Table.Cell>{r.documentType}</Table.Cell>
                            <Table.Cell>{r.receiveUse ?? '-'}</Table.Cell>
                            <Table.Cell>{r.receiveDate}</Table.Cell>
                            <Table.Cell>{feeOf(r.documentType)?.toLocaleString() ?? '-'}원</Table.Cell>
                            <Table.Cell>{r.receiveState}</Table.Cell>
                            <Table.Cell>
                               {r.receiveState === '접수' && (
                                    feeOf(r.documentType) ? (
                                        // 유료 → 수납 버튼 2개
                                        <div className={styles.payBtns}>
                                            <Button size='sm' width='auto' onClick={() => handlePay(r, '현금')}>
                                                현금 수납
                                            </Button>
                                            <Button size='sm' width='auto' variant='outline' onClick={() => handlePay(r, '간편결제')}>
                                                간편결제
                                            </Button>
                                        </div>
                                    ) : (
                                        // 무료 → 바로 발급
                                        <Button size='sm' width='auto' variant='outline' onClick={() => onComplete(r)}>
                                            발급하기
                                        </Button>
                                    )
                                )}

                                {r.receiveState === '수납완료' && (
                                    <Button size='sm' width='auto' variant='outline' onClick={() => onComplete(r)}>
                                        발급하기
                                    </Button>
                                )}

                                {r.receiveState === '발급완료' && (
                                    <Button size='sm' width='auto' variant='outline' color='gray' onClick={() => onReprint(r)}>
                                        재발급
                                    </Button>
                                )}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}
