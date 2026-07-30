import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { SeasonalPatientCountVO } from "../types";

interface SeasonalPatientChartProps {
    data: SeasonalPatientCountVO[];
    compact?: boolean;
}

const SEASON_ORDER = ["봄", "여름", "가을", "겨울"];
const SEASON_COLORS: Record<string, string> = {
    "봄": "#eb9bbc",
    "여름": "#83b3ca",
    "가을": "#bb9a81",
    "겨울": "#b19fce",
};

interface CustomTooltipProps {
    active?: boolean;
    payload?: { payload: SeasonalPatientCountVO }[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
    if (!active || !payload || payload.length === 0) return null;
    const item = payload[0].payload;
    return (
        <div style={{
            background: "#1e293b", color: "#fff", padding: "8px 14px",
            borderRadius: "8px", fontSize: "13px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}>
            <strong>{item.season}</strong> · {item.patientCount.toLocaleString()}명
        </div>
    );
}

function renderPercentLabel({ percent }: { percent?: number }) {
    if (!percent || percent < 0.03) return null;
    return `${(percent * 100).toFixed(0)}%`;
}

export function SeasonalPatientChart({ data, compact = false }: SeasonalPatientChartProps) {

    const sortedData = SEASON_ORDER
        .map((season) => {
            const found = data.find((d) => d.season === season);
            return { season, patientCount: found ? found.patientCount : 0 };
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
                    nameKey="season"
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={compact ? 45 : 95} 
                    label={compact ? undefined : renderPercentLabel}
                    labelLine={false}
                >
                    {sortedData.map((entry) => (
                        <Cell key={entry.season} fill={SEASON_COLORS[entry.season]} stroke="#fff" strokeWidth={2} />
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