jest.mock("../../models/requestLog", () => ({
  RequestLogModel: {
    countDocuments: jest.fn(),
  },
}));

const { RequestLogModel } = require("../../models/requestLog");
const { checkRateLimit } = require("../rateLimitService");

describe("checkRateLimit", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns the number of requests made by the tenant in the last minute", async () => {
    RequestLogModel.countDocuments.mockResolvedValue(3);

    const tenant = {
      team: "search",
    };

    const result = await checkRateLimit(tenant);

    expect(result).toBe(3);
    expect(RequestLogModel.countDocuments).toHaveBeenCalledTimes(1);
  });

  test("queries requests using the tenant team and one-minute time window", async () => {
    RequestLogModel.countDocuments.mockResolvedValue(1);

    const tenant = {
      team: "backend",
    };

    await checkRateLimit(tenant);

    expect(RequestLogModel.countDocuments).toHaveBeenCalledWith({
      team: "backend",
      createdAt: {
        $gte: expect.any(Date),
      },
    });
  });

  test("returns zero when the tenant has no recent requests", async () => {
    RequestLogModel.countDocuments.mockResolvedValue(0);

    const result = await checkRateLimit({
      team: "frontend",
    });

    expect(result).toBe(0);
  });
});