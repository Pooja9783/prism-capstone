jest.mock("../../services/configLoader", () => ({
  getConfig: jest.fn(),
}));

const { getConfig } = require("../../services/configLoader");
const {
  authenticateApiKey,
} = require("../../middlewares/authenticateApiKey");

describe("authenticateApiKey", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      headers: {},
      body: {
        model: "fast",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();

    getConfig.mockReturnValue({
      seedKeys: {
        tenants: [
          {
            team: "search",
            virtual_key: "demo-key",
            model_allowlist: ["fast", "smart"],
          },
        ],
      },
    });
  });

  test("returns 401 when authorization header is missing", () => {
    authenticateApiKey(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "unAuthorization",
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("returns 401 when API key is invalid", () => {
    req.headers.authorization = "Bearer wrong-key";

    authenticateApiKey(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalid Api key",
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("returns 403 when model is not in allowlist", () => {
    req.headers.authorization = "Bearer demo-key";
    req.body.model = "auto";

    authenticateApiKey(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: "This Model is not allowed for API Key",
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("attaches tenant and calls next for valid key and allowed model", () => {
    req.headers.authorization = "Bearer demo-key";
    req.body.model = "fast";

    authenticateApiKey(req, res, next);

    expect(req.tenant).toEqual({
      team: "search",
      virtual_key: "demo-key",
      model_allowlist: ["fast", "smart"],
    });

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });
});