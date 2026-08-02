import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ModelAlias = {
  primary?: string;
  fallbacks?: string[];
  route_by_difficulty?: {
    simple: string;
    complex: string;
  };
};

type GatewaySettingsProps = {
  modelAliases: {
    fast: ModelAlias;
    smart: ModelAlias;
    auto: ModelAlias;
  };
};

export default function GatewaySettings({
  modelAliases,
}: GatewaySettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Routing</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-4">
          <p className="font-semibold">Fast</p>

          <p className="mt-2 text-sm">
            Primary:{" "}
            <span className="font-medium">
              {modelAliases?.fast.primary}
            </span>
          </p>

          <p className="text-sm">
            Fallback:{" "}
            <span className="font-medium">
              {modelAliases?.fast.fallbacks?.join(", ")}
            </span>
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <p className="font-semibold">Smart</p>

          <p className="mt-2 text-sm">
            Primary:{" "}
            <span className="font-medium">
              {modelAliases?.smart.primary}
            </span>
          </p>

          <p className="text-sm">
            Fallback:{" "}
            <span className="font-medium">
              {modelAliases?.smart.fallbacks?.join(", ")}
            </span>
          </p>
        </div>

        <div className="rounded-lg border p-4 md:col-span-2">
          <p className="font-semibold">Auto Routing</p>

          <p className="mt-2 text-sm">
            Simple prompts →{" "}
            <span className="font-medium">
              {modelAliases?.auto.route_by_difficulty?.simple}
            </span>
          </p>

          <p className="text-sm">
            Complex prompts →{" "}
            <span className="font-medium">
              {modelAliases?.auto.route_by_difficulty?.complex}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}