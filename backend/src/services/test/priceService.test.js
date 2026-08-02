
const { getConfig } = require("../configLoader");
const { calculateCost } = require("../priceService");

jest.mock("../configLoader", () => ({
    getConfig: jest.fn(),
}));


describe("calculateCost", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("calculates cost correctly", () => {
        getConfig.mockReturnValue({
            modelPricing: {
                "alpha-small": {
                    input_per_1m: 0.15,
                    output_per_1m: 0.6,
                },
            },
        });

        const usage = {
            prompt_tokens: 1_000_000,
            completion_tokens: 500_000,
        };

        const result = calculateCost("alpha-small", usage);

        // Input: 1M × 0.15 = 0.15
        // Output: 0.5M × 0.60 = 0.30
        // Total = 0.45
        expect(result).toBeCloseTo(0.45);
    });

    test("throws an error when pricing is missing", () => {
        getConfig.mockReturnValue({
            modelPricing: {},
        });

        const usage = {
            prompt_tokens: 100,
            completion_tokens: 50,
        };

        expect(() => {
            calculateCost("unknown-model", usage);
        }).toThrow("Pricing not found for model: unknown-model");
    });
});