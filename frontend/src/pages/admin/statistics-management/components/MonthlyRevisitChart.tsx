import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { MonthlyRevisitVO } from "../types";

interface MonthlyRevisitChartProps {
    data: MonthlyRevisitVO[];
}

const MONTH_ORDER = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));

interface CustomTooltipProps {
    active?: boolean;
    payload?: { name: string; value: number; color: string }[];
    label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
    if (!active || !payload || payload.length === 0) return null;
    return (
        <div style={{
            background: "#1e293b", color: "#fff", padding: "10px 14px",
            borderRadius: "8px", fontSize: "13px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}>
            <div style={{ marginBottom: "4px", fontWeight: 700 }}>{Number(label)}월</div>
            {payload.map((item) => (
                <div key={item.name} style={{ color: item.color }}>
                    {item.name} · {item.value.toLocaleString()}명
                </div>
            ))}
        </div>
    );
}

export function MonthlyRevisitChart({ data }: MonthlyRevisitChartProps) {

    const sortedData = MONTH_ORDER.map((month) => {
        const found = data.find((d) => d.month === month);
        return {
            month: String(Number(month)),
            totalPatients: found ? found.totalPatients : 0,
            revisitPatients: found ? found.revisitPatients : 0,
        };
    });

    return (
        <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={sortedData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                    dataKey="month"
                    tickFormatter={(value: string) => `${value}월`}
                    tick={{ fontSize: 12, fill: "#475569" }}
                    axisLine={{ stroke: "#e2e8f0" }}
                    tickLine={false}
                />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={30} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(148, 163, 184, 0.08)" }} />
                <Legend
                    wrapperStyle={{ fontSize: "12.5px", paddingTop: "8px" }}
                    formatter={(value) => <span style={{ color: "#475569" }}>{value}</span>}
                />
                <Bar dataKey="totalPatients" name="전체 환자" fill="#81a7bb" radius={[6, 6, 0, 0]} maxBarSize={36} />
                <Line
                    type="monotone"
                    dataKey="revisitPatients"
                    name="재방문 환자"
                    stroke="#854b59"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: "#cc748a", strokeWidth: 2, stroke: "#fff" }}
                    activeDot={{ r: 6 }}
                />
            </ComposedChart>
        </ResponsiveContainer>
    );
}