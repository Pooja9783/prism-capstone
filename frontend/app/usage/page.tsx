
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UsagePage() {
    return (
        <div className="space-y-6">

            <div>
                <h1 className="text-4xl font-bold tracking-tight">
                    Usage
                </h1>

                <p className="text-muted-foreground mt-2">
                    Monitor usage, spending and gateway performance.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

                <Card>
                    <CardHeader>
                        <CardTitle>Total Cost</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="text-3xl font-bold">£142.38</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Total Tokens</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="text-3xl font-bold">2.3M</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Average Latency</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="text-3xl font-bold">214 ms</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Cache Hit Rate</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="text-3xl font-bold">61%</p>
                    </CardContent>
                </Card>

            </div>

        </div>
    );
}