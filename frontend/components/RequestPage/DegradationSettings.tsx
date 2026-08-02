import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type DegradationSettingsProps = {
  degradation: {
    error_rate_threshold: number;
    window_seconds: number;
    p95_latency_ms: number;
  };
};

export default function DegradationSettings({
  degradation,
}: DegradationSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Provider Degradation</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">
            Error Rate Threshold
          </p>

          <p className="mt-2 text-2xl font-semibold">
            {(degradation?.error_rate_threshold * 100).toFixed(0)}%
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">
            Monitoring Window
          </p>

          <p className="mt-2 text-2xl font-semibold">
            {degradation?.window_seconds} sec
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">
            P95 Latency Threshold
          </p>

          <p className="mt-2 text-2xl font-semibold">
            {degradation?.p95_latency_ms} ms
          </p>
        </div>
      </CardContent>
    </Card>
  );
}