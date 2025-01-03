import { Test, TestingModule } from "@nestjs/testing";
import { UtilsService } from "./utils.service";

describe("UtilsService", () => {
  let service: UtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtilsService],
    }).compile();

    service = module.get<UtilsService>(UtilsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("response", () => {
    it("should be defined", () => {
      expect(service).toHaveProperty("response");
    });

    it("should return a valid response object", () => {
      const response = service.response({ user: {} }, "Success!", false);

      expect(response.data).toStrictEqual({ user: {} });
      expect(response.message).toEqual("Success!");
      expect(response.error).toBeFalsy();
    });
  });
});
