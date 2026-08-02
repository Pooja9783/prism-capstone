import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type RetrySettingsProps = {
  retry: {
    max_attempts: number;
    initial_backoff_ms: number;
    backoff_multiplier: number;
  };
};

export default function RetrySettings({
  retry,
}: RetrySettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Retry Configuration</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">
            Max Attempts
          </p>

          <p className="mt-2 text-2xl font-semibold">
            {retry?.max_attempts}
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">
            Initial Backoff
          </p>

          <p className="mt-2 text-2xl font-semibold">
            {retry?.initial_backoff_ms} ms
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">
            Backoff Multiplier
          </p>

          <p className="mt-2 text-2xl font-semibold">
            {retry?.backoff_multiplier}×
          </p>
        </div>
      </CardContent>
    </Card>
  );
}