import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { AgeGroupPatientCountVO } from "../types";
import { CHART_PALETTE } from "../chartColors";

interface AgeGroupPatientChartProps {
    data: AgeGroupPatientCountVO[];
    compact?: boolean;
}

const AGE_GROUP_ORDER = ["0대", "10대", "20대", "30대", "40대", "50대", "60대", "70대", "80대", "90대"];
const AGE_GROUP_COLORS = [
    CHART_PALETTE[0], CHART_PALETTE[1], CHART_PALETTE[2], CHART_PALETTE[3],
    CHART_PALETTE[4], CHART_PALETTE[5], CHART_PALETTE[6], CHART_PALETTE[7],
    CHART_PALETTE[0], CHART_PALETTE[1],
];

function getColor(ageGroup: string) {
    const index = AGE_GROUP_ORDER.indexOf(ageGroup);
    return AGE_GROUP_COLORS[index] ?? "#94a3b8";
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: { payload: AgeGroupPatientCountVO }[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
    if (!active || !payload || payload.length === 0) return null;
    const item = payload[0].payload;
    return (
        <div style={{
            background: "#1e293b", color: "#fff", padding: "8px 14px",
            borderRadius: "8px", fontSize: "13px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}>
            <strong>{item.ageGroup}</strong> · {item.patientCount.toLocaleString()}건
        </div>
    );
}

function renderPercentLabel({ percent }: { percent?: number }) {
    if (!percent || percent < 0.03) return null;
    return `${(percent * 100).toFixed(0)}%`;
}

export function AgeGroupPatientChart({ data, compact = false }: AgeGroupPatientChartProps) {

    const sortedData = AGE_GROUP_ORDER
        .map((ageGroup) => data.find((d) => d.ageGroup === ageGroup))
        .filter((item): item is AgeGroupPatientCountVO => item !== undefined && item.patientCount > 0);

    if (sortedData.length === 0) {
        return <p style={{ textAlign: "center", color: "#94a3b8", padding: compact ? "20px 0" : "60px 0", fontSize: 13 }}>데이터 없음</p>;
    }

    return (
        <ResponsiveContainer width="100%" height={compact ? 250 : 300}>
            <PieChart>
                <Pie
                    data={sortedData}
                    dataKey="patientCount"
                    nameKey="ageGroup"
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={compact ? 45 : 95}
                    label={compact ? undefined : renderPercentLabel}
                    labelLine={false}
                >
                    {sortedData.map((entry) => (
                        <Cell key={entry.ageGroup} fill={getColor(entry.ageGroup)} stroke="#fff" strokeWidth={2} />
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