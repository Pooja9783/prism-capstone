import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function CacheSettings() {
    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Semantic Cache
                </CardTitle>
            </CardHeader>

            <CardContent>

                <div className="grid gap-6 md:grid-cols-3">

                    <div className="flex items-center justify-between rounded-lg border p-4">

                        <div>
                            <Label>Enable Cache</Label>

                            <p className="text-sm text-muted-foreground">
                                Cache semantically similar prompts.
                            </p>
                        </div>

                        <Switch defaultChecked />

                    </div>

                    <div className="space-y-2">

                        <Label>Cache TTL (minutes)</Label>

                        <Input
                            type="number"
                            defaultValue="30"
                        />

                    </div>

                    <div className="space-y-2">

                        <Label>Similarity Threshold</Label>

                        <Input
                            type="number"
                            defaultValue="0.90"
                        />

                    </div>

                </div>

            </CardContent>

        </Card>
    )
}