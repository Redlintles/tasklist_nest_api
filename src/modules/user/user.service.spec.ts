import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { UserRepository } from "./user-repository/user-repository";
import { User } from "./entities/user/user";
import { UserDto } from "./dtos/user-dto/user-dto";

describe("UserService", () => {
  let service: UserService;
  let userRepository: UserRepository;

  const user: User = {
    id: 1,
    username: "BananaBananab",
    email: "Banana@gmail.com",
    password: "Banana@123",
    phone_number: "12345678910",
  };
  const partialUser: Partial<User> = {
    username: "Jane doe",
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
            findUserById: jest.fn().mockResolvedValue(user),
            deleteUserById: jest.fn().mockResolvedValue(user),
            updateUserById: jest.fn().mockResolvedValue(user),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
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

  describe("findOneById", () => {
    it("should be defined", () => {
      expect(service).toHaveProperty("findOneById");
    });

    it("should return a user successfully", async () => {
      const foundUser = await service.findOneById(1);

      expect(foundUser).toEqual(user);
    });

    it("Should throw an error for a invalid id", async () => {
      await expect(service.findOneById(-1)).rejects.toThrow(
        "Invalid Id, it must be a positive integer!",
      );
      await expect(service.findOneById(NaN)).rejects.toThrow(
        "Invalid Id, it must be a positive integer!",
      );
    });
  });
  describe("updateUser", () => {
    it("should be defined", () => {
      expect(service).toHaveProperty("updateUser");
    });
    it("should update a user successfully", async () => {
      const updatedUser = await service.updateUser(1, partialUser);

      expect(userRepository.updateUserById).toHaveBeenCalledWith(
        1,
        partialUser,
      );

      expect(updatedUser).toStrictEqual(Object.assign(user, partialUser));
    });

    it("should throw an error for an invalid id", async () => {
      await expect(service.updateUser(-1, partialUser)).rejects.toThrow(
        "Invalid Id, it must be a positive integer!",
      );
      await expect(service.updateUser(NaN, partialUser)).rejects.toThrow(
        "Invalid Id, it must be a positive integer!",
      );
    });
  });

  describe("deleteUser", () => {
    it("should be defined", () => {
      expect(service).toHaveProperty("deleteUser");
    });
    it("should delete a user successfully", async () => {
      const deletedUser = await service.deleteUser(1);

      expect(userRepository.deleteUserById).toHaveBeenCalledWith(1);

      expect(deletedUser).toEqual(user);
    });
    it("should throw an error for an invalid id", async () => {
      await expect(service.deleteUser(-1)).rejects.toThrow(
        "Invalid Id, it must be a positive integer!",
      );
      await expect(service.deleteUser(NaN)).rejects.toThrow(
        "Invalid Id, it must be a positive integer!",
      );
    });
  });
});
