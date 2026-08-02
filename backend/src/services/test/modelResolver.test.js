

jest.mock("../configLoader", () => ({
    loadConfig: jest.fn(),
    getConfig: jest.fn(),
}));

jest.mock("../routingService", () => ({
    classifyPrompt: jest.fn(),
}));



const { loadConfig, getConfig } = require("../configLoader");
const { classifyPrompt } = require("../routingService");
const { resolveModel } = require("../modelResolver");

describe("resolveModel", () => {
    beforeEach(() => {
        jest.clearAllMocks();

        getConfig.mockReturnValue({
            gatewayConfig: {
                model_aliases: {
                    fast: {
                        primary: "alpha-small",
                        fallbacks: ["beta-small"],
                    },
                    smart: {
                        primary: "alpha-large",
                        fallbacks: ["beta-large"],
                    },
                },
            },
        });
    });

    test("resolves fast alias", () => {
        const result = resolveModel("fast", "Hello");

        expect(result).toEqual({
            primary: "alpha-small",
            fallbacks: ["beta-small"],
        });

        expect(loadConfig).toHaveBeenCalledTimes(1);
        expect(classifyPrompt).not.toHaveBeenCalled();
    });

    test("resolves smart alias", () => {
        const result = resolveModel(
            "smart",
            "Design a distributed database"
        );

        expect(result).toEqual({
            primary: "alpha-large",
            fallbacks: ["beta-large"],
        });

        expect(loadConfig).toHaveBeenCalledTimes(1);
        expect(classifyPrompt).not.toHaveBeenCalled();
    });

    test("routes auto to fast for a simple prompt", () => {
        classifyPrompt.mockReturnValue("fast");

        const result = resolveModel(
            "auto",
            "What is the capital of France?"
        );

        expect(classifyPrompt).toHaveBeenCalledWith(
            "What is the capital of France?"
        );

        expect(result).toEqual({
            primary: "alpha-small",
            fallbacks: ["beta-small"],
        });
    });

    test("routes auto to smart for a complex prompt", () => {
        classifyPrompt.mockReturnValue("smart");

        const result = resolveModel(
            "auto",
            "Design a multi-tenant billing system"
        );

        expect(classifyPrompt).toHaveBeenCalledWith(
            "Design a multi-tenant billing system"
        );

        expect(result).toEqual({
            primary: "alpha-large",
            fallbacks: ["beta-large"],
        });
    });
});