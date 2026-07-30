import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { TreatmentRevenueVO } from "../types";

interface TreatmentRevenueChartProps {
    data: TreatmentRevenueVO[];
}

const CATEGORY_COLORS: Record<string, string> = {
    "약물처방": "#a08fb9",
    "주사": "#547e7a",
    "물리치료": "#bba08c",
};

function formatWon(value: number) {
    return `${Math.round(value).toLocaleString()}원`;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: { payload: TreatmentRevenueVO }[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
    if (!active || !payload || payload.length === 0) return null;
    const item = payload[0].payload;
    return (
        <div style={{
            background: "#1e293b", color: "#fff", padding: "8px 14px",
            borderRadius: "8px", fontSize: "13px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}>
            <strong>{item.category}</strong> · {formatWon(item.amount)}
        </div>
    );
}

function renderPercentLabel({ percent }: { percent?: number }) {
    if (!percent || percent === 0) return null;
    return `${(percent * 100).toFixed(0)}%`;
}

export function TreatmentRevenueChart({ data }: TreatmentRevenueChartProps) {

    const filteredData = data.filter((item) => item.amount > 0);
    const total = data.reduce((sum, item) => sum + item.amount, 0);

    if (filteredData.length === 0) {
        return <p style={{ textAlign: "center", color: "#94a3b8", padding: "60px 0" }}>표시할 데이터가 없습니다.</p>;
    }

    return (
        <div style={{ position: "relative" }}>
            <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                    <Pie
                        data={filteredData}
                        dataKey="amount"
                        nameKey="category"
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={90}
                        paddingAngle={2}
                        label={renderPercentLabel}
                        labelLine={false}
                    >
                        {filteredData.map((entry) => (
                            <Cell key={entry.category} fill={CATEGORY_COLORS[entry.category]} stroke="#fff" strokeWidth={2} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        verticalAlign="bottom"
                        wrapperStyle={{ fontSize: "12.5px", paddingTop: "12px" }}
                        formatter={(value) => <span style={{ color: "#475569" }}>{value}</span>}
                    />
                </PieChart>
            </ResponsiveContainer>

            <div style={{
                position: "absolute", top: "45%", left: "50%",
                transform: "translate(-50%, -50%)", textAlign: "center", pointerEvents: "none",
            }}>
                <div style={{ fontSize: "11px", color: "#94a3b8" }}>총 매출</div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "#1e293b" }}>
                    {Math.round(total).toLocaleString()}원
                </div>
            </div>
        </div>
    );
}