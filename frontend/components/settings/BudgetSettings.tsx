import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function BudgetSettings() {
    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Budget Protection
                </CardTitle>
            </CardHeader>

            <CardContent>

                <div className="grid gap-6 md:grid-cols-3">

                    <div className="space-y-2">

                        <Label>Monthly Budget (£)</Label>

                        <Input
                            type="number"
                            defaultValue="100"
                        />

                    </div>

                    <div className="space-y-2">

                        <Label>Alert Threshold (%)</Label>

                        <Input
                            type="number"
                            defaultValue="80"
                        />

                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-4">

                        <div>

                            <Label>Block Requests</Label>

                            <p className="text-sm text-muted-foreground">
                                Stop requests after budget is exhausted.
                            </p>

                        </div>

                        <Switch />

                    </div>

                </div>

            </CardContent>

        </Card>
    );
}