import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { StandardResponse } from "../utils/standard-response/standard-response";

describe("AuthController", () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("healthCheck", () => {
    it("should be defined", () => {
      expect(controller).toHaveProperty("healthCheck");
    });

    it("should return a success response", () => {
      const response: StandardResponse = controller.healthCheck();

      expect(response.data).toEqual([]);
      expect(response.message).toEqual("Server is up and running!");
      expect(response.error).toBeFalsy();
      expect(response.timestamp).toBeDefined();
    });
  });
});
