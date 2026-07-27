import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RateLimitSettings() {
    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Rate Limiting
                </CardTitle>
            </CardHeader>

            <CardContent>

                <div className="grid gap-6 md:grid-cols-3">

                    <div className="space-y-2">
                        <Label>Requests / Minute</Label>

                        <Input
                            type="number"
                            defaultValue="100"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Burst Limit</Label>

                        <Input
                            type="number"
                            defaultValue="20"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Concurrent Requests</Label>

                        <Input
                            type="number"
                            defaultValue="10"
                        />
                    </div>

                </div>

            </CardContent>

        </Card>
    );
}