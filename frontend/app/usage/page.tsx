"use client"
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    BarChart,
    Bar,
} from "recharts";
import {
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";
import AppLayout from "@/components/layouts/AppLayout";
import { useEffect, useState } from "react";



type ProviderData = {
    name: string;
    value: number;
};

const COLORS = [
    "#7c3aed",
    "#a855f7",
    "#c084fc",
    "#ddd6fe",
];

type Metrics = {
    totalRequests: number;
    totalCost: number;
    totalTokens: number;
    averageLatency: number;
    fallbackCount: number;
    cacheHits: number;
};

type UsageDetail = {
    date: string;
    cost: number;
    tokens: number;
};

type ModelUsage = {
    model: string;
    requests: number;
    tokens: number;
    cost: number;
};

export default function UsagePage() {

    const [metrics, setMetrics] = useState<Metrics | null>(null);
    const [usageData, setUsageData] = useState<UsageDetail[]>([]);
    const [providerData, setProviderData] = useState<ProviderData[]>([]);
    const [models, setModels] = useState<ModelUsage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");




    useEffect(() => {
        async function fetchMetrics() {
            try {
                const response = await fetch(
                    "http://localhost:5000/v1/metrics",
                    {
                        cache: "no-store",
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch usage metrics");
                }

                const data: Metrics = await response.json();
                setMetrics(data);
            } catch (error) {
                console.error(error);
                setError("Unable to load usage metrics");
            } finally {
                setLoading(false);
            }
        }

        fetchMetrics();
    }, []);

    useEffect(() => {
        async function fetchUsageDetails() {
            try {
                const response = await fetch(
                    "http://localhost:5000/v1/metrics/usage-details",
                    {
                        cache: "no-store",
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch usage details");
                }

                const data: UsageDetail[] = await response.json();
                setUsageData(data);
            } catch (error) {
                console.error("Usage details error:", error);
            }
        }

        fetchUsageDetails();
    }, []);

    useEffect(() => {
        async function fetchProviderDistribution() {
            try {
                const response = await fetch(
                    "http://localhost:5000/v1/metrics/providers",
                    {
                        cache: "no-store",
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch provider distribution");
                }

                const data: ProviderData[] = await response.json();
                setProviderData(data);
            } catch (error) {
                console.error("Provider distribution error:", error);
            }
        }

        fetchProviderDistribution();
    }, []);

    useEffect(() => {
        async function fetchModels() {
            try {
                const response = await fetch(
                    "http://localhost:5000/v1/metrics/models",
                    {
                        cache: "no-store",
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch models");
                }

                const data: ModelUsage[] = await response.json();
                setModels(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchModels();
    }, []);

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <AppLayout>
                <div className="mb-4">
                    <h1 className="text-4xl font-bold tracking-tight">
                        Usage
                    </h1>

                    <p className="text-muted-foreground mt-2">
                        Monitor usage, spending and gateway performance.
                    </p>
                </div>

                {/* KPI Cards */}
                <div className="mb-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">

                    <Card >
                        <CardHeader>
                            <CardTitle>Total Cost</CardTitle>
                        </CardHeader>

                        <p className="text-3xl font-bold">
                            {loading
                                ? "Loading..."
                                : error
                                    ? "Error"
                                    : `$${metrics?.totalCost.toFixed(8) ?? "0.00000000"}`}
                        </p>

                        <p className="text-sm text-muted-foreground">
                            Across all requests
                        </p>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Total Tokens</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <p className="text-3xl font-bold">
                                {loading
                                    ? "Loading..."
                                    : error
                                        ? "Error"
                                        : (metrics?.totalTokens ?? 0).toLocaleString()}
                            </p>

                            <p className="text-sm text-muted-foreground">
                                Across all providers
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Average Latency</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <p className="text-3xl font-bold">
                                {loading
                                    ? "Loading..."
                                    : error
                                        ? "Error"
                                        : `${metrics?.averageLatency ?? 0} ms`}
                            </p>

                            <p className="text-sm text-muted-foreground">
                                Average response time
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Cache Hit Rate</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <p className="text-3xl font-bold">
                                {loading
                                    ? "Loading..."
                                    : error
                                        ? "Error"
                                        : metrics && metrics.totalRequests > 0
                                            ? `${(
                                                (metrics.cacheHits / metrics.totalRequests) *
                                                100
                                            ).toFixed(1)}%`
                                            : "0%"}
                            </p>

                            <p className="text-sm text-muted-foreground">
                                {metrics?.cacheHits ?? 0} cached responses
                            </p>
                        </CardContent>
                    </Card>


                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    <Card className="mb-4 ">
                        <CardHeader>
                            <CardTitle>Daily Cost</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                        data={usageData}
                                        margin={{ top: 4, right: 4, left: 4, bottom: 4 }}
                                    >
                                        <XAxis dataKey="date" />

                                        <YAxis
                                            width={80}
                                            tickFormatter={(value: number) => `$${value.toFixed(6)}`}
                                        />

                                        <Tooltip />

                                        <Area
                                            type="monotone"
                                            dataKey="cost"
                                            stroke="#7c3aed"
                                            fill="#c4b5fd"
                                            fillOpacity={0.4}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="mb-4">
                        <CardHeader>
                            <CardTitle>Token Usage</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={usageData}>
                                        <XAxis dataKey="date" />
                                        <YAxis allowDecimals={false} />
                                        <Tooltip />

                                        <Bar
                                            dataKey="tokens"
                                            fill="#7c3aed"
                                            radius={[6, 6, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle>Provider Distribution</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>

                                    <Pie
                                        data={providerData}
                                        dataKey="value"
                                        nameKey="name"
                                        outerRadius={100}
                                        label
                                    >
                                        {providerData.map((provider, index) => (
                                            <Cell
                                                key={provider.name}
                                                fill={COLORS[index % COLORS.length]}
                                            />
                                        ))}
                                    </Pie>

                                    <Tooltip />
                                    <Legend />

                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>



                <CardContent className="mb-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Top Models Usage</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <Table>

                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Model</TableHead>
                                        <TableHead>Requests</TableHead>
                                        <TableHead>Tokens</TableHead>
                                        <TableHead>Cost</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {models.map((model) => (
                                        <TableRow key={model.model}>
                                            <TableCell>{model.model}</TableCell>
                                            <TableCell>{model.requests}</TableCell>
                                            <TableCell>{model.tokens.toLocaleString()}</TableCell>
                                            <TableCell>${model.cost.toFixed(8)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>

                            </Table>
                        </CardContent>
                    </Card>

                </CardContent>
            </AppLayout>
        </div>
    );
}