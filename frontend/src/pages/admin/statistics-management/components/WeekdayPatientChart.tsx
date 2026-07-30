import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { WeekdayPatientCountVO } from "../types";

interface WeekdayPatientChartProps {
    data: WeekdayPatientCountVO[];
    compact?: boolean;
}

const WEEKDAY_ORDER = ["월", "화", "수", "목", "금", "토", "일"];
const WEEKDAY_COLORS: Record<string, string> = {
    "월": "#7f9ead", "화": "#479992", "수": "#76964d", "목": "#c5ad99",
    "금": "#c595a1", "토": "#b0a3c5", "일": "#e6b7cb",
};

interface CustomTooltipProps {
    active?: boolean;
    payload?: { payload: WeekdayPatientCountVO }[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
    if (!active || !payload || payload.length === 0) return null;
    const item = payload[0].payload;
    return (
        <div style={{
            background: "#1e293b", color: "#fff", padding: "8px 14px",
            borderRadius: "8px", fontSize: "13px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}>
            <strong>{item.dayOfWeek}요일</strong> · {item.patientCount.toLocaleString()}명
        </div>
    );
}

function renderPercentLabel({ percent }: { percent?: number }) {
    if (!percent || percent < 0.03) return null;
    return `${(percent * 100).toFixed(0)}%`;
}

export function WeekdayPatientChart({ data, compact = false }: WeekdayPatientChartProps) {

    const sortedData = WEEKDAY_ORDER
        .map((day) => {
            const found = data.find((d) => d.dayOfWeek === day);
            return { dayOfWeek: day, patientCount: found ? found.patientCount : 0 };
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
                nameKey="dayOfWeek"
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius={compact ? 45 : 95} 
                label={compact ? undefined : renderPercentLabel}
                labelLine={false}
            >
                {sortedData.map((entry) => (
                    <Cell key={entry.dayOfWeek} fill={WEEKDAY_COLORS[entry.dayOfWeek]} stroke="#fff" strokeWidth={2} />
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