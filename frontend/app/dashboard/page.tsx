import MetricCard from "@/components/DashboardPage/MetricCard";
import UsageChart from "@/components/DashboardPage/UsageChart";
import AppLayout from "@/components/layouts/AppLayout";
import RequestTable from "@/components/RequestPage/RequestTable";

export default function DashboardPage() {
    return (
        <AppLayout>
            <h1 className="text-4xl font-bold text-slate-900">
                Dashboard
            </h1>

            <p className="mt-2 text-slate-500">
                Monitor your Prism AI Gateway.
            </p>

            <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <MetricCard
                    title="Total Requests"
                    value="12,540"
                    subtitle="Last 30 days"
                />

                <MetricCard
                    title="Monthly Cost"
                    value="$48.20"
                    subtitle="Current billing period"
                />

                <MetricCard
                    title="Cache Hit Rate"
                    value="71%"
                    subtitle="Semantic cache"
                />

                <MetricCard
                    title="Fallback Rate"
                    value="2%"
                    subtitle="Provider failovers"
                />
            </div>

            <div className="mt-10">
                <UsageChart />
            </div>

            <div className="mt-10">
                <RequestTable />
            </div>


        </AppLayout>
    );
}