import type { TopDiagnosisVO } from "../types";

interface TopDiagnosisListProps {
    data: TopDiagnosisVO[];
}

export function TopDiagnosisList({ data }: TopDiagnosisListProps) {
    if (data.length === 0) {
        return <p style={{ textAlign: "center", color: "#94a3b8", padding: "60px 0" }}>표시할 데이터가 없습니다.</p>;
    }

    const maxCount = data[0].diagnosisCount;

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", padding: "8px 4px" }}>
            {data.map((item, index) => (
                <div key={item.diagnosisName} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
                                {item.diagnosisName}
                            </span>
                            <span style={{ fontSize: "13px", fontWeight: 700, color: "#334155" }}>
                                {item.diagnosisCount.toLocaleString()}건
                            </span>
                        </div>
                        <div style={{ width: "100%", height: "6px", background: "#f1f5f9", borderRadius: "4px" }}>
                            <div style={{
                                width: `${(item.diagnosisCount / maxCount) * 100}%`,
                                height: "100%",
                                background: "#a3b492",
                                borderRadius: "4px",
                            }} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}