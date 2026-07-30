import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { TimeOfDayPatientCountVO } from "../types";
import { CHART_PALETTE } from "../chartColors";

interface TimeOfDayPatientChartProps {
    data: TimeOfDayPatientCountVO[];
    compact?: boolean;
}

const TIME_SLOT_ORDER = ["오전", "오후"];
const TIME_SLOT_COLORS: Record<string, string> = {
    "오전": CHART_PALETTE[0],
    "오후": CHART_PALETTE[1],
};
interface CustomTooltipProps {
    active?: boolean;
    payload?: { payload: TimeOfDayPatientCountVO }[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
    if (!active || !payload || payload.length === 0) return null;
    const item = payload[0].payload;
    return (
        <div style={{
            background: "#1e293b", color: "#fff", padding: "8px 14px",
            borderRadius: "8px", fontSize: "13px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}>
            <strong>{item.timeSlot}</strong> · {item.patientCount.toLocaleString()}명
        </div>
    );
}

function renderPercentLabel({ percent }: { percent?: number }) {
    if (!percent || percent === 0) return null;
    return `${(percent * 100).toFixed(0)}%`;
}

export function TimeOfDayPatientChart({ data, compact = false }: TimeOfDayPatientChartProps) {

    const sortedData = TIME_SLOT_ORDER
        .map((slot) => {
            const found = data.find((d) => d.timeSlot === slot);
            return { timeSlot: slot, patientCount: found ? found.patientCount : 0 };
        })
        .filter((item) => item.patientCount > 0);

    if (sortedData.length === 0) {
        return <p style={{ textAlign: "center", color: "#94a3b8", padding: compact ? "20px 0" : "60px 0", fontSize: 13 }}>데이터 없음</p>;
    }

    return (
        <ResponsiveContainer width="100%" height={compact ? 250 : 300}>
            <PieChart>
                <Pie
                    data={sortedData}
                    dataKey="patientCount"
                    nameKey="timeSlot"
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={compact ? 45 : 95} 
                    label={compact ? undefined : renderPercentLabel}
                    labelLine={false}
                >
                    {sortedData.map((entry) => (
                        <Cell key={entry.timeSlot} fill={TIME_SLOT_COLORS[entry.timeSlot]} stroke="#fff" strokeWidth={2} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    iconSize={compact ? 6 : 10}
                    wrapperStyle={{
                        fontSize: compact ? "9px" : "12.5px",
                        paddingTop: compact ? "4px" : "12px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                    formatter={(value) => <span style={{ color: "#475569" }}>{value}</span>}
                />
            </PieChart>
        </ResponsiveContainer>
    );
}