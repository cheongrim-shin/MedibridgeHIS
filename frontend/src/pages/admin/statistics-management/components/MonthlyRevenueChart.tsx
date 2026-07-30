import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { MonthlyRevenueVO } from "../types";

interface MonthlyRevenueChartProps {
    data: MonthlyRevenueVO[];
}

const MONTH_ORDER = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));

function formatWon(value: number) {
    return `${value.toLocaleString()}원`;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: { payload: { month: string; revenue: number } }[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
    if (!active || !payload || payload.length === 0) return null;
    const item = payload[0].payload;
    return (
        <div style={{
            background: "#1e293b", color: "#fff", padding: "8px 14px",
            borderRadius: "8px", fontSize: "13px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}>
            <strong>{item.month}</strong> · {formatWon(item.revenue)}
        </div>
    );
}

export function MonthlyRevenueChart({ data }: MonthlyRevenueChartProps) {

    const sortedData = MONTH_ORDER.map((month) => {
        const found = data.find((d) => d.month === month);
        return {
            month: `${Number(month)}월`,
            revenue: found ? found.revenue : 0,
        };
    });

    return (
        <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={sortedData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#475569" }} axisLine={{ stroke: "#e2e8f0" }} tickLine={false} />
                <YAxis
                    tick={{ fontSize: 11, fill: "#94a3b8" }}
                    axisLine={false}
                    tickLine={false}
                    width={50}
                    tickFormatter={(value: number) => `${(value / 10000).toLocaleString()}만`}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#e2e8f0", strokeWidth: 1 }} />
                <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#0f766e"
                    strokeWidth={3}
                    fill="#0f766e"
                    fillOpacity={0.12}
                    dot={{ r: 4, fill: "#0f766e", strokeWidth: 2, stroke: "#fff" }}
                    activeDot={{ r: 7, fill: "#0f766e", strokeWidth: 2, stroke: "#fff" }}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}