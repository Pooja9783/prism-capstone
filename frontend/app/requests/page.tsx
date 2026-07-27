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


const requests = [
    {
        id: 1,
        time: "09:32",
        team: "Frontend",
        provider: "OpenAI",
        model: "GPT-4o-mini",
        tokens: 1350,
        cost: "£0.0023",
        cache: true,
        fallback: false,
        latency: "182 ms",
    },
    {
        id: 2,
        time: "09:30",
        team: "Backend",
        provider: "Anthropic",
        model: "Claude Sonnet",
        tokens: 2480,
        cost: "£0.0051",
        cache: false,
        fallback: true,
        latency: "412 ms",
    },
    {
        id: 3,
        time: "09:28",
        team: "AI Team",
        provider: "OpenAI",
        model: "GPT-4.1",
        tokens: 1890,
        cost: "£0.0037",
        cache: false,
        fallback: false,
        latency: "241 ms",
    },
];


export default function RequestsPage() {
    return (
        <div className="space-y-6">

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
                    />

                    <Select>
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
                    </Select>

                </div>

            </div>

            {/* Table */}
            <div className="rounded-xl border p-4">
                <div className="rounded-xl border">

                    <Table>

                        <TableHeader>
                            <TableRow>
                                <TableHead>Time</TableHead>
                                <TableHead>Team</TableHead>
                                <TableHead>Provider</TableHead>
                                <TableHead>Model</TableHead>
                                <TableHead>Tokens</TableHead>
                                <TableHead>Cost</TableHead>
                                <TableHead>Cache</TableHead>
                                <TableHead>Fallback</TableHead>
                                <TableHead>Latency</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>

                            {requests.map((request) => (

                                <TableRow key={request.id}>

                                    <TableCell>{request.time}</TableCell>

                                    <TableCell>{request.team}</TableCell>

                                    <TableCell className="font-medium">
                                        {request.provider}
                                    </TableCell>

                                    <TableCell className="text-muted-foreground">
                                        {request.model}
                                    </TableCell>

                                    <TableCell>{request.tokens}</TableCell>

                                    <TableCell className="font-medium">
                                        {request.cost}
                                    </TableCell>
                                    <TableCell>
                                        {request.cache ? "Yes" : "No"}
                                    </TableCell>

                                    <TableCell>
                                        {request.fallback ? "Yes" : "No"}
                                    </TableCell>

                                    <TableCell>{request.latency}</TableCell>

                                </TableRow>

                            ))}

                        </TableBody>

                    </Table>

                </div>
            </div>

        </div >
    );
}