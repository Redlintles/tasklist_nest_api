import { HttpStatus } from "@nestjs/common";
import { StandardErrorResponse } from "./standard-error-response";

describe("StandardErrorResponse", () => {
  it("should be defined", () => {
    expect(
      new StandardErrorResponse(HttpStatus.CONFLICT, "", ""),
    ).toBeDefined();
  });
  it("should match debug structure", () => {
    const errorResponse = new StandardErrorResponse(
      HttpStatus.CONFLICT,
      "",
      "",
    );
    expect(errorResponse).toHaveProperty("statusCode", HttpStatus.CONFLICT);
    expect(errorResponse).toHaveProperty("message", "");
    expect(errorResponse).toHaveProperty("detail", "");
    expect(errorResponse.timestamp).toBeDefined();
  });

  it("should return a valid client response", () => {
    const errorResponse = new StandardErrorResponse(
      HttpStatus.CONFLICT,
      "",
      "",
    ).toClient();

    expect(errorResponse).toHaveProperty("statusCode", HttpStatus.CONFLICT);
    expect(errorResponse).toHaveProperty("message", "");
    expect(errorResponse.error).toBeTruthy();
    expect(errorResponse.timestamp).toBeDefined();
  });
});
