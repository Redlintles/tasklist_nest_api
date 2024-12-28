import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "./user-repository/user-repository";
import { StandardResponse } from "src/utils/standard-response/standard-response";
import { UserDto } from "./dtos/user-dto/user-dto";
import { User } from "./entities/user/user";

describe("UserController", () => {
  let controller: UserController;
  let userService: UserService;

  const userDto: UserDto = {
    username: "BananaBananab",
    email: "Banana@gmail.com",
    password: "Banana@123",
    phone_number: "12345678910",
  };

  const user: User = {
    id: 1,
    username: "BananaBananab",
    email: "Banana@gmail.com",
    password: "Banana@123",
    phone_number: "12345678910",
  };
  const partialUser: Partial<User> = {
    username: "BananaBananab",
  };

  const mockUserRepository = {
    createUser: jest.fn().mockResolvedValue(user),
    findUserById: jest.fn().mockImplementation((id: number) => {
      return id === 1 ? user : null;
    }),
    deleteUserById: jest.fn().mockResolvedValue(user),
    updateUserById: jest
      .fn()
      .mockResolvedValue({ old: user, new: Object.assign(user, partialUser) }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        { provide: UserRepository, useValue: mockUserRepository },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("createUser", () => {
    it("should be defined", () => {
      expect(controller).toHaveProperty("createUser");
    });

    it("should return a createdUser successfully", async () => {
      const res: StandardResponse = await controller.createUser(userDto);

      expect(mockUserRepository.createUser).toHaveBeenCalledWith(userDto);
      expect(res.error).toBeFalsy();
      expect(res.data).toStrictEqual({ user: user });
      expect(res.message).toEqual("Usuário criado com sucesso!");
      expect(res.timestamp).toBeDefined();
    });
  });

  describe("findUserById", () => {
    it("should be defined", () => {
      expect(controller).toHaveProperty("findUserById");
    });
    it("should return a valid response", async () => {
      const res: StandardResponse = await controller.findUserById(1);

      expect(mockUserRepository.findUserById).toHaveBeenCalledWith(1);
      expect(res.error).toBeFalsy();
      expect(res.data).toStrictEqual({ user: user });
      expect(res.message).toEqual("Usuário encontrado com sucesso!");
      expect(res.timestamp).toBeDefined();
    });
  });

  describe("updateUser", () => {
    it("should be defined", () => {
      expect(controller).toHaveProperty("updateUser");
    });

    it("should update a user successfully", async () => {
      const res: StandardResponse = await controller.updateUser(1, partialUser);

      jest.spyOn(userService, "updateUser").mockResolvedValue({
        old: user,
        new: Object.assign(user, partialUser),
      });
      expect(mockUserRepository.updateUserById).toHaveBeenCalledWith(
        1,
        partialUser,
      );

      expect(res.error).toBeFalsy();
      expect(res.message).toEqual("Usuário atualizado com sucesso!");
      expect(res.data).toEqual({
        old: user,
        new: Object.assign(user, partialUser),
      });
      expect(res.timestamp).toBeDefined();
    });
  });
  describe("deleteUser", () => {
    it("should be defined", () => {
      expect(controller).toHaveProperty("deleteUser");
    });

    it("should delete a user successfully", async () => {
      const res: StandardResponse = await controller.deleteUser(1);

      expect(mockUserRepository.deleteUserById).toHaveBeenCalledWith(1);

      expect(res.data).toStrictEqual({ user: user });
      expect(res.message).toEqual("Usuário deletado com sucesso!");
      expect(res.error).toBeFalsy();
      expect(res.timestamp).toBeDefined();
    });
  });
});
