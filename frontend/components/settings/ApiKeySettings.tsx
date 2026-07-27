
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useState } from "react";

import { Eye, EyeOff, Copy } from "lucide-react";


const providers = [
    {
        name: "OpenAI",
        value: "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    },
    {
        name: "Anthropic",
        value: "sk-ant-xxxxxxxxxxxxxxxxxxxxxxxx",
    },
    {
        name: "Gemini",
        value: "AIzaxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    },
];

export default function ApiKeySettings() {
    const [visible, setVisible] = useState<Record<string, boolean>>({});
    return (
        <div className="space-y-6">
            {providers.map((provider) => (
                <div key={provider.name} className="space-y-2">

                    <Label>{provider.name} API Key</Label>

                    <div className="flex gap-2">

                        <Input
                            type={visible[provider.name] ? "text" : "password"}
                            value={provider.value}
                            readOnly
                        />

                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() =>
                                setVisible((prev) => ({
                                    ...prev,
                                    [provider.name]: !prev[provider.name],
                                }))
                            }
                        >
                            {visible[provider.name] ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => navigator.clipboard.writeText(provider.value)}
                        >
                            <Copy className="h-4 w-4" />
                        </Button>

                    </div>

                </div>
            ))}

            <div className="flex justify-end">
                <Button>Save Settings</Button>
            </div>
        </div>
    );
}