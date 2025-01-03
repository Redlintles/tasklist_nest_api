import { StandardResponse } from "./standard-response";

describe("StandardResponse", () => {
  it("should be defined", () => {
    expect(new StandardResponse({}, "")).toBeDefined();
  });

  it("should match the structure", () => {
    const stdRes = new StandardResponse({}, "");

    expect(stdRes).toHaveProperty("data");
    expect(stdRes).toHaveProperty("message");
    expect(stdRes).toHaveProperty("error");
    expect(stdRes).toHaveProperty("timestamp");
  });
});
