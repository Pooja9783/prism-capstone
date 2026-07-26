function classifyPrompt(prompt) {
    const text = prompt.toLowerCase().trim();

    // Keywords that usually require deep reasoning
    const smartKeywords = [
        "prove",
        "disprove",
        "design",
        "architecture",
        "trade-off",
        "tradeoff",
        "justify",
        "compare",
        "recommend",
        "algorithm",
        "complexity",
        "distributed",
        "database schema",
        "migration",
        "rollback",
        "consistency",
        "quorum",
        "leaderless",
        "estimate",
        "reasoning",
        "explain how",
        "why",
        "debug",
        "latency",
        "p95",
        "p99",
        "anomaly",
        "fintech"
    ];

    // If any smart keyword exists
    if (smartKeywords.some(keyword => text.includes(keyword))) {
        return "smart";
    }

    // Simple tasks
    const fastKeywords = [
        "translate",
        "extract",
        "capital",
        "convert",
        "commit message",
        "404",
        "rewrite",
        "email address",
        "divisible",
        "what is",
        "who is on call"
    ];

    if (fastKeywords.some(keyword => text.includes(keyword))) {
        return "fast";
    }

    // Long prompts are NOT automatically smart.
    // Default to fast.
    return "fast";
}

module.exports = {
    classifyPrompt
};