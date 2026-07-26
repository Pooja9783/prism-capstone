

const requests = [
    {
        id: 1,
        provider: "OpenAI",
        model: "GPT-4.1",
        cost: "$0.02",
        cache: "No",
        latency: "420 ms",
    },
    {
        id: 2,
        provider: "Anthropic",
        model: "Claude Sonnet",
        cost: "$0.04",
        cache: "Yes",
        latency: "190 ms",
    },
    {
        id: 3,
        provider: "Google",
        model: "Gemini Flash",
        cost: "$0.01",
        cache: "No",
        latency: "150 ms",
    },
];

export default function RequestTable() {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">
                Recent Requests
            </h2>
        </div>
    )
}