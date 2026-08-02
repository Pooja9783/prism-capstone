jest.mock("../../models/semanticCache", () => ({
  semanticCacheModel: {
    find: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock("../../utils/cosineSimilarity", () => ({
  cosineSimilarity: jest.fn(),
}));

const {
  semanticCacheModel,
} = require("../../models/semanticCache");

const {
  cosineSimilarity,
} = require("../../utils/cosineSimilarity");

const {
  findSimilarPrompt,
  saveCache,
} = require("../semanticCacheService");

describe("semanticCacheService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns the best matching cache entry when similarity is above threshold", async () => {
    const firstEntry = {
      prompt: "What is Node.js?",
      embedding: [0.1, 0.2],
      response: "Node.js is a JavaScript runtime.",
    };

    const secondEntry = {
      prompt: "Explain event loop",
      embedding: [0.3, 0.4],
      response: "The event loop handles asynchronous tasks.",
    };

    semanticCacheModel.find.mockResolvedValue([
      firstEntry,
      secondEntry,
    ]);

    cosineSimilarity
      .mockReturnValueOnce(0.85)
      .mockReturnValueOnce(0.95);

    const result = await findSimilarPrompt(
      "search",
      [0.5, 0.6]
    );

    expect(semanticCacheModel.find).toHaveBeenCalledWith({
      team: "search",
    });

    expect(result).toEqual(secondEntry);
  });

  test("returns null when no cache entry reaches the similarity threshold", async () => {
    semanticCacheModel.find.mockResolvedValue([
      {
        prompt: "Prompt one",
        embedding: [0.1, 0.2],
      },
      {
        prompt: "Prompt two",
        embedding: [0.3, 0.4],
      },
    ]);

    cosineSimilarity
      .mockReturnValueOnce(0.7)
      .mockReturnValueOnce(0.91);

    const result = await findSimilarPrompt(
      "search",
      [0.5, 0.6]
    );

    expect(result).toBeNull();
  });

  test("returns null when there are no cache entries", async () => {
    semanticCacheModel.find.mockResolvedValue([]);

    const result = await findSimilarPrompt(
      "search",
      [0.5, 0.6]
    );

    expect(result).toBeNull();
    expect(cosineSimilarity).not.toHaveBeenCalled();
  });

  test("saves a cache entry", async () => {
    const savedEntry = {
      team: "search",
      prompt: "What is Express?",
      embedding: [0.1, 0.2],
      response: {
        content: "Express is a Node.js web framework.",
      },
    };

    semanticCacheModel.create.mockResolvedValue(savedEntry);

    const result = await saveCache(
      savedEntry.team,
      savedEntry.prompt,
      savedEntry.embedding,
      savedEntry.response
    );

    expect(semanticCacheModel.create).toHaveBeenCalledWith({
      team: "search",
      prompt: "What is Express?",
      embedding: [0.1, 0.2],
      response: {
        content: "Express is a Node.js web framework.",
      },
    });

    expect(result).toEqual(savedEntry);
  });
});