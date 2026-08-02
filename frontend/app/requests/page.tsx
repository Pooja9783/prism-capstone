"use client";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layouts/AppLayout";
import { useEffect, useState } from "react";
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


export default function RequestsPage() {
    const [requests, setRequests] = useState<RequestItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function fetchRequests() {
            try {
                const response = await fetch(
                    "https://prism-capstone.onrender.com/v1/requests",
                    {
                        cache: "no-store",
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch requests");
                }

                const data: RequestItem[] = await response.json();
                setRequests(data);
            } catch (error) {
                console.error(error);
                setError("Unable to load requests");
            } finally {
                setLoading(false);
            }
        }

        fetchRequests();
    }, []);

    const filteredRequests = requests.filter((request) => {
        const searchValue = search.toLowerCase();

        return (
            request.team.toLowerCase().includes(searchValue) ||
            request.provider.toLowerCase().includes(searchValue) ||
            request.model.toLowerCase().includes(searchValue) ||
            request.status.toLowerCase().includes(searchValue)
        );
    });


    return (
        <div className="space-y-6">


            <AppLayout>
                {/* Heading */}
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">
                        Requests
                    </h1>

                    <p className="text-muted-foreground mt-2">
                        Inspect and debug all Prism gateway requests.
                    </p>
                </div>

                <div className="rounded-xl border p-5">

                    <div className="grid gap-4 md:grid-cols-4">

                        <Input
                            placeholder="Search requests..."
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />

                        {/* future implementation */}
                        {/* <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Provider" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="all">All Providers</SelectItem>
                                <SelectItem value="openai">OpenAI</SelectItem>
                                <SelectItem value="anthropic">Anthropic</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Cache" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="hit">Hit</SelectItem>
                                <SelectItem value="miss">Miss</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Fallback" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                            </SelectContent>
                        </Select> */}

                    </div>

                </div>

                {/* Table */}
                <div className="rounded-xl border p-4">
                    <div className="rounded-xl border">

                        {loading ? (
                            <div className="py-16 text-center text-sm text-muted-foreground">
                                Loading requests...
                            </div>
                        ) : error ? (
                            <div className="py-16 text-center text-sm text-red-600">
                                {error}
                            </div>
                        ) : filteredRequests.length === 0 ? (
                            <div className="py-16 text-center">
                                <h3 className="font-semibold">No requests found</h3>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Send a request through the chat completions API.
                                </p>
                            </div>
                        ) : (
                            <Table>

                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Time</TableHead>
                                        <TableHead>Team</TableHead>
                                        <TableHead>Provider</TableHead>
                                        <TableHead>Model</TableHead>
                                        <TableHead>Success</TableHead>
                                        <TableHead>Tokens</TableHead>
                                        <TableHead>Cost</TableHead>
                                        <TableHead>Cache</TableHead>
                                        <TableHead>Fallback</TableHead>
                                        <TableHead>Latency</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>

                                    {filteredRequests?.map((request) => (

                                        <TableRow key={request.id}>
                                            <TableCell className="whitespace-nowrap">
                                                {new Date(request.createdAt).toLocaleString("en-IN", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </TableCell>

                                            <TableCell>{request.team}</TableCell>
                                            <TableCell>{request.provider}</TableCell>

                                            <TableCell className="max-w-56 truncate text-muted-foreground">
                                                {request.model}
                                            </TableCell>

                                            <TableCell>
                                                <Badge variant="outline">{request.status}</Badge>
                                            </TableCell>

                                            <TableCell className="text-left">
                                                {request.totalTokens}
                                            </TableCell>

                                            <TableCell className="text-left">
                                                ${request.cost.toFixed(8)}
                                            </TableCell>

                                            <TableCell>
                                                {request.cacheHit ? (
                                                    <Badge>Hit</Badge>
                                                ) : (
                                                    <Badge variant="secondary">Miss</Badge>
                                                )}
                                            </TableCell>

                                            <TableCell>
                                                {request.fallback ? (
                                                    <Badge variant="destructive">Yes</Badge>
                                                ) : (
                                                    <Badge variant="outline">No</Badge>
                                                )}
                                            </TableCell>




                                            <TableCell className="text-left">
                                                {request.latency} ms
                                            </TableCell>

                                        </TableRow>

                                    ))}

                                </TableBody>

                            </Table>
                        )}


                        {!loading && !error && filteredRequests.length > 0 && (
                            <div className="mt-6 flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">
                                    Showing {filteredRequests.length} requests
                                </p>

                                <div className="flex gap-2">
                                    <Button variant="outline">Previous</Button>
                                    <Button variant="default">1</Button>
                                    <Button variant="outline">Next</Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </AppLayout>
        </div >
    );
}