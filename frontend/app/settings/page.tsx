import GatewaySettings from "@/components/settings/GatewaySettings";
import CacheSettings from "@/components/settings/CacheSettings";
import RateLimitSettings from "@/components/settings/RateLimitSettings";
import BudgetSettings from "@/components/settings/BudgetSettings";
import ApiKeySettings from "@/components/settings/ApiKeySettings";
import AppLayout from "@/components/layouts/AppLayout";

export default function SettingsPage() {
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

                <GatewaySettings />
                <CacheSettings />
                <RateLimitSettings />
                <BudgetSettings />
                <ApiKeySettings />

            </AppLayout >
        </div>
    );
}