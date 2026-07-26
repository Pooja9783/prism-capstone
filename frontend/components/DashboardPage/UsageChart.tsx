"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { day: "Mon", requests: 120 },
    { day: "Tue", requests: 180 },
    { day: "Wed", requests: 240 },
    { day: "Thu", requests: 210 },
    { day: "Fri", requests: 320 },
    { day: "Sat", requests: 280 },
    { day: "Sun", requests: 390 },
];

export default function UsageChart() {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">
                Usage Overview
            </h2>
            <p className="mb-6 text-m font-semibold">Requests served during the last 7 days</p>

            <div className="h-80">
                <div className="mt-6 h-80">

                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid
                                vertical={false}
                                strokeDasharray="3 3"
                            />
                            <XAxis dataKey="day" />

                            <YAxis />

                            <Tooltip />

                            <Line
                                type="monotone"
                                dataKey="requests"
                                stroke="#1e293b"
                                strokeWidth={3}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}