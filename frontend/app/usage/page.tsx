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


const usageData = [
    { day: "Mon", cost: 18, tokens: 120000 },
    { day: "Tue", cost: 25, tokens: 180000 },
    { day: "Wed", cost: 20, tokens: 150000 },
    { day: "Thu", cost: 32, tokens: 250000 },
    { day: "Fri", cost: 28, tokens: 220000 },
    { day: "Sat", cost: 16, tokens: 100000 },
    { day: "Sun", cost: 22, tokens: 170000 },
];

const providerData = [
    { name: "OpenAI", value: 48 },
    { name: "Anthropic", value: 27 },
    { name: "Google", value: 15 },
    { name: "Others", value: 10 },
];

const COLORS = [
    "#7c3aed",
    "#a855f7",
    "#c084fc",
    "#ddd6fe",
];

export default function UsagePage() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <AppLayout>
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">
                        Usage
                    </h1>

                    <p className="text-muted-foreground mt-2">
                        Monitor usage, spending and gateway performance.
                    </p>
                </div>

                {/* KPI Cards */}
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

                    <Card>
                        <CardHeader>
                            <CardTitle>Total Cost</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <p className="text-3xl font-bold">£142.38</p>
                            <p className="text-sm text-muted-foreground">
                                +8% this week
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Total Tokens</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <p className="text-3xl font-bold">2.3M</p>
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
                            <p className="text-3xl font-bold">214 ms</p>
                            <p className="text-sm text-muted-foreground">
                                Last 24 hours
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Cache Hit Rate</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <p className="text-3xl font-bold">61%</p>
                            <p className="text-sm text-muted-foreground">
                                Semantic cache
                            </p>
                        </CardContent>
                    </Card>


                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Daily Cost</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={usageData}>
                                        <XAxis dataKey="day" />
                                        <YAxis />
                                        <Tooltip />

                                        <Area
                                            type="monotone"
                                            dataKey="cost"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Token Usage</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={usageData}>
                                        <XAxis dataKey="day" />
                                        <YAxis />
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
                <Card>
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
                                        {providerData.map((entry, index) => (
                                            <Cell
                                                key={index}
                                                fill={COLORS[index]}
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

                                <TableRow>
                                    <TableCell>GPT-4o-mini</TableCell>
                                    <TableCell>3,248</TableCell>
                                    <TableCell>1.2M</TableCell>
                                    <TableCell>£42.18</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>Claude Sonnet</TableCell>
                                    <TableCell>2,112</TableCell>
                                    <TableCell>860K</TableCell>
                                    <TableCell>£31.40</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>Gemini Flash</TableCell>
                                    <TableCell>1,620</TableCell>
                                    <TableCell>640K</TableCell>
                                    <TableCell>£18.72</TableCell>
                                </TableRow>

                            </TableBody>

                        </Table>

                    </CardContent>
                </Card>
            </AppLayout>
        </div>
    );
}