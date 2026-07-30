import type { PrescriptionTypeRatioVO } from "../types";

interface PrescriptionTypeRatioListProps {
    data: PrescriptionTypeRatioVO[];
}

const CATEGORY_COLORS: Record<string, string> = {
    "의약품": "#a08fb9",
    "주사": "#547e7a",
    "물리치료": "#bba08c",
};

export function PrescriptionTypeRatioList({ data }: PrescriptionTypeRatioListProps) {
    if (data.length === 0 || data.every((item) => item.orderCount === 0)) {
        return <p style={{ textAlign: "center", color: "#94a3b8", padding: "60px 0" }}>표시할 데이터가 없습니다.</p>;
    }

    // 건수 많은 순으로 정렬 (백엔드에서 CATEGORY 순서 그대로 오니까, 프론트에서 한 번 더 정렬해줌)
    const sortedData = [...data].sort((a, b) => b.orderCount - a.orderCount);
    const total = sortedData.reduce((sum, item) => sum + item.orderCount, 0);
    const maxCount = sortedData[0].orderCount;

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", padding: "8px 4px" }}>
            {sortedData.map((item, index) => {
                const percent = total > 0 ? (item.orderCount / total) * 100 : 0;
                return (
                    <div key={item.category} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
                                    {item.category}
                                </span>
                                <span style={{ fontSize: "13px", fontWeight: 700, color: "#334155" }}>
                                    {item.orderCount.toLocaleString()}건 · {percent.toFixed(1)}%
                                </span>
                            </div>
                            <div style={{ width: "100%", height: "6px", background: "#f1f5f9", borderRadius: "4px" }}>
                                <div style={{
                                    width: `${(item.orderCount / maxCount) * 100}%`,
                                    height: "100%",
                                    background: CATEGORY_COLORS[item.category],
                                    borderRadius: "4px",
                                }} />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}