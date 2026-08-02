"use client";
import { useEffect, useState } from "react";
import GatewaySettings from "@/components/settings/GatewaySettings";
import CacheSettings from "@/components/settings/CacheSettings";
import RateLimitSettings from "@/components/settings/RateLimitSettings";
import BudgetSettings from "@/components/settings/BudgetSettings";
import ApiKeySettings from "@/components/settings/ApiKeySettings";
import AppLayout from "@/components/layouts/AppLayout";
import ProviderSettings from "@/components/RequestPage/ProviderSettings";
import RetrySettings from "@/components/RequestPage/RetrySettings";
import DegradationSettings from "@/components/RequestPage/DegradationSettings";


type Provider = {
    name: string;
    base_url: string;
};

type ModelAlias = {
    primary?: string;
    fallbacks?: string[];
    route_by_difficulty?: {
        simple: string;
        complex: string;
    };
};

type SettingsData = {
    providers: Provider[];
    model_aliases: {
        fast: ModelAlias;
        smart: ModelAlias;
        auto: ModelAlias;
    };
    retry: {
        max_attempts: number;
        initial_backoff_ms: number;
        backoff_multiplier: number;
    };
    degradation: {
        error_rate_threshold: number;
        window_seconds: number;
        p95_latency_ms: number;
    };
};


export default function SettingsPage() {

    const [settings, setSettings] = useState<SettingsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchSettings() {
            try {
                const response = await fetch(
                    "https://prism-capstone.onrender.com/v1/settings",
                    {
                        cache: "no-store",
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch settings");
                }

                const data: SettingsData = await response.json();
                setSettings(data);
            } catch (error) {
                console.error(error);
                setError("Unable to load settings");
            } finally {
                setLoading(false);
            }
        }

        fetchSettings();
    }, []);

    return (

        <div className="space-y-6">
            <AppLayout>
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">
                        Settings
                    </h1>

                    <p className="text-muted-foreground mt-2">
                        Configure your Prism Gateway.
                    </p>
                </div>


                <GatewaySettings modelAliases={settings!?.model_aliases} />
                <ProviderSettings providers={settings!?.providers} />
                <RetrySettings retry={settings!?.retry} />
                <DegradationSettings degradation={settings!?.degradation} />

            </AppLayout >
        </div>
    );
}