"use client";

import { useEffect, useState } from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

type RequestItem = {
    id: string;
    team: string;
    provider: string;
    model: string;
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    cost: number;
    status: string;
    cacheHit: boolean;
    fallback: boolean;
    latency: number;
    createdAt: string;
};

export default function RequestTable() {
    const [requests, setRequests] = useState<RequestItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRequests() {
            try {
                const response = await fetch(
                    "http://localhost:5000/v1/requests?limit=5",
                    {
                        cache: "no-store",
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch recent requests");
                }

                const data: RequestItem[] = await response.json();
                setRequests(data);
            } catch (error) {
                console.error("Recent requests error:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchRequests();
    }, []);

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
                <h2 className="text-xl font-semibold">Recent Requests</h2>
                <p className="mt-1 text-sm text-slate-500">
                    Latest requests processed by the gateway
                </p>
            </div>

            {loading ? (
                <p className="py-10 text-center text-sm text-slate-500">
                    Loading recent requests...
                </p>
            ) : requests.length === 0 ? (
                <p className="py-10 text-center text-sm text-slate-500">
                    No requests found.
                </p>
            ) : (
                <div className="overflow-x-auto rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Time</TableHead>
                                <TableHead>Team</TableHead>
                                <TableHead>Provider</TableHead>
                                <TableHead>Model</TableHead>
                                <TableHead className="text-right">Tokens</TableHead>
                                <TableHead className="text-right">Cost</TableHead>
                                <TableHead>Cache</TableHead>
                                <TableHead>Fallback</TableHead>
                                <TableHead className="text-right">Latency</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {requests.map((request) => (
                                <TableRow key={request.id}>
                                    <TableCell className="whitespace-nowrap text-sm text-slate-500">
                                        {new Date(request.createdAt).toLocaleString("en-IN", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </TableCell>

                                    <TableCell className="font-medium">
                                        {request.team}
                                    </TableCell>

                                    <TableCell>{request.provider}</TableCell>

                                    <TableCell className="max-w-56 truncate text-slate-500">
                                        {request.model}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        {request.totalTokens}
                                    </TableCell>

                                    <TableCell className="text-right font-medium">
                                        ${request.cost.toFixed(6)}
                                    </TableCell>

                                    <TableCell>
                                        {request.cacheHit ? (
                                            <Badge variant="default">🟢 Hit</Badge>
                                        ) : (
                                            <Badge variant="secondary">⚪ Miss</Badge>
                                        )}
                                    </TableCell>

                                    <TableCell>
                                        {request.fallback ? (
                                            <Badge variant="destructive">🔴 Yes</Badge>
                                        ) : (
                                            <Badge variant="outline">🟢 No</Badge>
                                        )}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        {request.latency} ms
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}