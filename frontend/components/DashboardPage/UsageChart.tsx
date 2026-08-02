"use client";

import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";



export default function UsageChart() {

    type UsagePoint = {
        date: string;
        requests: number;
    };

    const [data, setData] = useState<UsagePoint[]>([]);

    useEffect(() => {
        async function fetchMetrics() {
            try {
                const response = await fetch(
                    "http://localhost:5000/v1/metrics/usage"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch metrics");
                }

                const result: UsagePoint[] = await response.json();
                setData(result);
            } catch (error) {
                console.error(error);
            }
        }

        fetchMetrics();
    }, []);


    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">
                Usage Overview
            </h2>
            <p className="mb-6 text-sm font-semibold">Requests served during the last 7 days</p>

            <div className="h-80">
                <div className="mt-6 h-80">

                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" />

                            <XAxis dataKey="date" />

                            <YAxis allowDecimals={false} />

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