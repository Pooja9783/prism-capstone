import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type Provider = {
    name: string;
    base_url: string;
};

type ProviderSettingsProps = {
    providers: Provider[];
};

export default function ProviderSettings({
    providers,
}: ProviderSettingsProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Providers</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                {providers?.map((provider) => (
                    <div
                        key={provider?.name}
                        className="rounded-lg border p-4"
                    >
                        <p className="font-semibold">
                            {provider?.name}
                        </p>

                        <p className="mt-1 text-sm text-muted-foreground">
                            {provider?.base_url}
                        </p>


                    </div>
                ))}
            </CardContent>
        </Card>
    );
}