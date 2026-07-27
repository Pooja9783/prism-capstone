import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,

} from "@/components/ui/select";
export default function GatewaySettings() {
    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Gateway Configuration
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">

                <div className="grid gap-6 md:grid-cols-3">

                    <div className="space-y-2">
                        <Label>Default Model</Label>

                        <Select defaultValue="gpt-4o-mini">
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="gpt-4o-mini">
                                    GPT-4o-mini
                                </SelectItem>

                                <SelectItem value="claude-sonnet">
                                    Claude Sonnet
                                </SelectItem>

                                <SelectItem value="gemini-flash">
                                    Gemini Flash
                                </SelectItem>
                            </SelectContent>

                        </Select>

                    </div>

                    <div className="space-y-2">

                        <Label>Temperature</Label>

                        <Input
                            defaultValue="0.7"
                            type="number"
                        />

                    </div>

                    <div className="space-y-2">

                        <Label>Max Tokens</Label>

                        <Input
                            defaultValue="4096"
                            type="number"
                        />

                    </div>

                </div>

            </CardContent>

        </Card>
    );
}