import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { TimeOfDayRevenueVO } from "../types";
import { CHART_PALETTE } from "../chartColors";

interface TimeOfDayRevenueChartProps {
    data: TimeOfDayRevenueVO[];
    todayRevenue: number;   // 도넛 가운데에 표시할 "오늘 매출" 값
}

const TIME_SLOT_ORDER = ["오전", "오후"];
const TIME_SLOT_COLORS: Record<string, string> = {
    "오전": CHART_PALETTE[0],
    "오후": CHART_PALETTE[1],
};

interface CustomTooltipProps {
    active?: boolean;
    payload?: { payload: TimeOfDayRevenueVO }[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
    if (!active || !payload || payload.length === 0) return null;
    const item = payload[0].payload;
    return (
        <div style={{
            background: "#1e293b", color: "#fff", padding: "8px 14px",
            borderRadius: "8px", fontSize: "13px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}>
            <strong>{item.timeSlot}</strong> · {Math.round(item.revenue).toLocaleString()}원
        </div>
    );
}

function renderPercentLabel({ percent }: { percent?: number }) {
    if (!percent || percent === 0) return null;
    return `${(percent * 100).toFixed(0)}%`;
}

export function TimeOfDayRevenueChart({ data, todayRevenue }: TimeOfDayRevenueChartProps) {
    const sortedData = TIME_SLOT_ORDER
        .map((slot) => {
            const found = data.find((d) => d.timeSlot === slot);
            return { timeSlot: slot, revenue: found ? found.revenue : 0 };
        })
        .filter((item) => item.revenue > 0);

    if (sortedData.length === 0) {
        return <p style={{ textAlign: "center", color: "#94a3b8", padding: "60px 0", fontSize: 13 }}>데이터 없음</p>;
    }

    return (
        <div style={{ position: "relative" }}>
            <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                    <Pie
                        data={sortedData}
                        dataKey="revenue"
                        nameKey="timeSlot"
                        cx="50%"
                        cy="50%"              
                        innerRadius={55}        
                        outerRadius={90}       
                        paddingAngle={2}
                        label={renderPercentLabel}
                        labelLine={false}
                    >
                        {sortedData.map((entry) => (
                            <Cell key={entry.timeSlot} fill={TIME_SLOT_COLORS[entry.timeSlot]} stroke="#fff" strokeWidth={2} />
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

            {/* 도넛 가운데 - 이 차트 자체의 합계가 아니라, 별도로 받은 "오늘 매출" 값을 표시 */}
            <div style={{
                position: "absolute", top: "45%", left: "50%",
                transform: "translate(-50%, -50%)", textAlign: "center", pointerEvents: "none",
            }}>
                <div style={{ fontSize: "11px", color: "#94a3b8" }}>금일 매출</div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "#1e293b" }}>
                    {Math.round(todayRevenue).toLocaleString()}원
                </div>
            </div>
        </div>
    );
}