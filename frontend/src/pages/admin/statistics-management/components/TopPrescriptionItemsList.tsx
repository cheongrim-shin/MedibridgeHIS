import type { TopPrescriptionItemVO } from "../types";

interface TopPrescriptionItemsListProps {
    data: TopPrescriptionItemVO[];
}

// 처방 유형별로 다른 색 배지를 붙여서, 순위만 봐도 어떤 종류인지 바로 구분되게 함
const CATEGORY_COLORS: Record<string, string> = {
    "의약품": "#a08fb9",
    "주사": "#547e7a",
    "물리치료": "#bba08c",
};

export function TopPrescriptionItemsList({ data }: TopPrescriptionItemsListProps) {
    if (data.length === 0) {
        return <p style={{ textAlign: "center", color: "#94a3b8", padding: "60px 0" }}>표시할 데이터가 없습니다.</p>;
    }

    // 1등 항목의 건수를 기준(100%)으로 삼아서, 각 막대의 길이를 상대적으로 계산
    const maxCount = data[0].itemCount;

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", padding: "8px 4px" }}>
            {data.map((item, index) => (
                <div key={`${item.category}-${item.itemName}`} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{
                        width: "22px", height: "22px", borderRadius: "50%",
                        background: index === 0 ? "#e2ab7f" : "#e2e8f0",
                        color: index === 0 ? "#fff" : "#64748b",
                        fontSize: "12px", fontWeight: 700,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                    }}>
                        {index + 1}
                    </span>

                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                            <span style={{ fontSize: "13px", fontWeight: 600, color: "#1e293b" }}>
                                {item.itemName}
                                <span style={{ marginLeft: "6px", fontSize: "11px", color: CATEGORY_COLORS[item.category] }}>
                                    {item.category}
                                </span>
                            </span>
                            <span style={{ fontSize: "13px", fontWeight: 700, color: "#334155" }}>
                                {item.itemCount.toLocaleString()}건
                            </span>
                        </div>
                        <div style={{ width: "100%", height: "6px", background: "#f1f5f9", borderRadius: "4px" }}>
                            <div style={{
                                width: `${(item.itemCount / maxCount) * 100}%`,
                                height: "100%",
                                background: CATEGORY_COLORS[item.category],
                                borderRadius: "4px",
                            }} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}