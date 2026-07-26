const { loadConfig, getConfig } = require("../src/services/configLoader");
const { classifyPrompt } = require("../src/services/routingService");

loadConfig();

const config = getConfig();

const testCases = config.routingEval;

let correct = 0;

for (const test of testCases) {

    const predicted = classifyPrompt(test.prompt);

    const passed = predicted === test.expected_tier;

    if (passed) correct++;

    console.log(
        `${passed ? "✅" : "❌"} ${test.id}
Expected: ${test.expected_tier}
Predicted: ${predicted}
`
    );
}

const accuracy = ((correct / testCases.length) * 100).toFixed(2);

console.log("--------------------------------");
console.log(`Correct : ${correct}/${testCases.length}`);
console.log(`Accuracy: ${accuracy}%`);