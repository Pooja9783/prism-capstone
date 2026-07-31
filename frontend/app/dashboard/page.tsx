"use client";
import MetricCard from "@/components/DashboardPage/MetricCard";
import UsageChart from "@/components/DashboardPage/UsageChart";
import AppLayout from "@/components/layouts/AppLayout";
import RequestTable from "@/components/RequestPage/RequestTable";
import { useEffect, useState } from "react";


type Metrics = {
    totalRequests: number;
    totalCost: number;
    totalTokens: number;
    averageLatency: number;
    fallbackCount: number;
    cacheHits: number;
};

export default function DashboardPage() {



    const [metrics, setMetrics] = useState<Metrics | null>(null);

    useEffect(() => {
        async function fetchMetrics() {
            try {
                const response = await fetch("http://localhost:5000/v1/metrics");

                if (!response.ok) {
                    throw new Error("Failed to fetch metrics");
                }

                const data: Metrics = await response.json();
                setMetrics(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchMetrics();
    }, []);


    return (
        <AppLayout>
            <h1 className="text-4xl font-bold text-slate-900">
                Dashboard
            </h1>

            <p className="mt-2 text-slate-500">
                Monitor your Prism AI Gateway.
            </p>

            <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <MetricCard
                    title="Total Requests"
                    value={metrics?.totalRequests?.toString() ?? "Loading..."}
                    subtitle="All requests"
                />

                <MetricCard
                    title="Total Cost"
                    value={metrics ? `$${metrics.totalCost.toFixed(6)}` : "Loading..."}
                    subtitle="All requests"
                />

                <MetricCard
                    title="Total Tokens"
                    value={metrics ? metrics.totalTokens.toLocaleString() : "Loading..."}
                    subtitle="All requests"
                />

                <MetricCard
                    title="Average Latency"
                    value={metrics ? `${metrics.averageLatency} ms` : "Loading..."}
                    subtitle="Average response time"
                />

                <MetricCard
                    title="Cache Hit Rate"
                    value={metrics ? `${metrics.cacheHits}` : "Loading..."}
                    subtitle="Responses served from cache"
                />

                <MetricCard
                    title="Fallback Count"
                    value={metrics ? `${metrics.fallbackCount}` : "Loading..."}
                    subtitle="Provider failovers"
                />
            </div>

            <div className="mt-10">
                <UsageChart />
            </div>

            <div className="mt-10">
                <RequestTable />
            </div>


        </AppLayout>
    );
}