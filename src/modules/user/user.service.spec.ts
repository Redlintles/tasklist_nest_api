import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { UserRepository } from "./user-repository/user-repository";
import { User } from "./entities/user/user";
import { UserDto } from "./dtos/user-dto/user-dto";

describe("UserService", () => {
  let service: UserService;

  const user: User = {
    id: 1,
    username: "BananaBananab",
    email: "Banana@gmail.com",
    password: "Banana@123",
    phone_number: "12345678910",
  };
  const userDTO: UserDto = {
    username: "BananaBananab",
    email: "Banana@gmail.com",
    password: "Banana@123",
    phone_number: "12345678910",
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            createUser: jest.fn().mockResolvedValue(user),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("createUser", () => {
    it("should be defined", () => {
      expect(service).toHaveProperty("createUser");
    });
    it("should create a user successfully", async () => {
      const savedUser = await service.createUser(userDTO);
      expect(savedUser).toStrictEqual(user);
    });
  });
});
