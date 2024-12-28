import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { UserRepository } from "./user-repository";
import { User } from "../entities/user/user";
import { UserDto } from "../dtos/user-dto/user-dto";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { HttpException, HttpStatus } from "@nestjs/common";

describe("UserRepository", () => {
  let userRepository: UserRepository;
  let repository: Repository<User>;

  const mockUserDto: UserDto = {
    username: "John Doe",
    email: "Banana@gmail.com",
    password: "Banana@123",
    phone_number: "12345678910",
  };

  const mockedUser: User = {
    id: 1,
    username: "John Doe",
    email: "Banana@gmail.com",
    password: "Banana@123",
    phone_number: "12345678910",
  };
  const mockedPartialUser: Partial<User> = {
    username: "Jane Doe",
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it("should be defined", () => {
    expect(userRepository).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe("createUser", () => {
    it("should be defined", () => {
      expect(userRepository).toHaveProperty("createUser");
    });
    it("Should create and save a user", async () => {
      const mockUser = new User();
      mockUser.username = mockUserDto.username;
      mockUser.email = mockUserDto.email;
      mockUser.password = mockUserDto.password;
      mockUser.phone_number = mockUserDto.phone_number;

      jest.spyOn(repository, "create").mockReturnValue(mockUser);
      jest.spyOn(repository, "save").mockResolvedValue(mockUser);

      const result = await userRepository.createUser(mockUserDto);

      expect(result).toEqual(mockUser);
      expect(repository.create).toHaveBeenCalledWith(mockUserDto);
      expect(repository.save).toHaveBeenCalledWith(mockUserDto);
    });
    it("should throw an error if the user could not be created due to unique key constraint violation", async () => {
      jest.spyOn(repository, "save").mockRejectedValue(new Error("Conflict"));

      await expect(userRepository.createUser(mockUserDto)).rejects.toThrow(
        new HttpException(
          "Unique key constraint violation",
          HttpStatus.CONFLICT,
        ),
      );
    });
  });

  describe("findUserById", () => {
    it("should be defined", () => {
      expect(userRepository).toHaveProperty("findUserById");
    });

    it("should find a user successfully", async () => {
      jest
        .spyOn(repository, "findOneByOrFail")
        .mockReturnValue(new Promise((resolve) => resolve(mockedUser)));

      const user = await userRepository.findUserById(1);

      expect(repository.findOneByOrFail).toHaveBeenCalledWith({ id: 1 });
      expect(user).toEqual(mockedUser);
    });

    it("should throw an error if it could not find the user", async () => {
      jest
        .spyOn(repository, "findOneByOrFail")
        .mockRejectedValue(new Error("Not found"));

      await expect(userRepository.findUserById(10000)).rejects.toThrow(
        new HttpException("EntityNotFound", HttpStatus.NOT_FOUND),
      );
    });
  });
  describe("deleteUserById", () => {
    it("should be defined", () => {
      expect(userRepository).toHaveProperty("deleteUserById");
    });

    it("should delete a user successfully", async () => {
      jest.spyOn(repository, "findOneByOrFail").mockResolvedValue(mockedUser);
      jest.spyOn(repository, "delete").mockResolvedValue(new DeleteResult());
      jest.spyOn(repository, "existsBy").mockResolvedValue(true);
      const user = await userRepository.deleteUserById(1);

      expect(repository.delete).toHaveBeenCalled();

      expect(user).toBeDefined();
    });

    it("should throw an error if it could not find the user to be deleted", async () => {
      jest
        .spyOn(repository, "findOneByOrFail")
        .mockRejectedValue(new Error("NOT FOUND"));

      await expect(userRepository.deleteUserById(1000)).rejects.toThrow(
        new HttpException("EntityNotFound", HttpStatus.NOT_FOUND),
      );
    });

    it("should throw an error if it could not delete the user", async () => {
      jest.spyOn(repository, "findOneByOrFail").mockResolvedValue(mockedUser);
      jest
        .spyOn(repository, "delete")
        .mockRejectedValue(new Error("could not delete"));
      jest.spyOn(repository, "existsBy").mockResolvedValue(true);

      await expect(userRepository.deleteUserById(1)).rejects.toThrow(
        new HttpException(
          "An unexpected error ocurred, try again later",
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });

  describe("updateUserById", () => {
    it("should be defined", () => {
      expect(userRepository).toHaveProperty("updateUserById");
    });

    it("should update a user successfully", async () => {
      const updateResultObj = new UpdateResult();
      updateResultObj.affected = 1;
      jest.spyOn(repository, "findOneBy").mockResolvedValue(mockedUser);
      jest.spyOn(repository, "findOneByOrFail").mockResolvedValue(mockedUser);
      jest.spyOn(repository, "update").mockResolvedValue(updateResultObj);

      const result = await userRepository.updateUserById(1, mockedPartialUser);

      expect(repository.update).toHaveBeenCalledWith(
        { id: 1 },
        mockedPartialUser,
      );

      expect(result).toStrictEqual({
        old: mockedUser,
        new: Object.assign(mockedUser, mockedPartialUser),
      });
    });

    it("should not throw an error if the user object and the partial update object are identical", async () => {
      const updateResultObj = new UpdateResult();
      updateResultObj.affected = 0;
      jest.spyOn(repository, "findOneBy").mockResolvedValue(mockedUser);
      jest.spyOn(repository, "findOneByOrFail").mockResolvedValue(mockedUser);
      jest.spyOn(repository, "update").mockResolvedValue(updateResultObj);

      const result = await userRepository.updateUserById(1, mockedPartialUser);

      expect(repository.update).toHaveBeenCalledWith(
        { id: 1 },
        mockedPartialUser,
      );

      expect(result).toStrictEqual({
        old: mockedUser,
        new: Object.assign(mockedUser, mockedPartialUser),
      });
    });
    it("should throw an error if it could not find the user to be updated", async () => {
      jest
        .spyOn(repository, "findOneByOrFail")
        .mockRejectedValue(new Error("Entity not found!"));

      await expect(
        userRepository.updateUserById(1000, mockedPartialUser),
      ).rejects.toThrow(
        new HttpException("EntityNotFound", HttpStatus.NOT_FOUND),
      );
    });
    it("should throw an error if the update fails", async () => {
      jest.spyOn(repository, "findOneByOrFail").mockResolvedValue(mockedUser);
      jest.spyOn(repository, "update").mockRejectedValue(new Error("Error"));

      await expect(
        userRepository.updateUserById(1, mockedPartialUser),
      ).rejects.toThrow(
        new HttpException(
          "An unexpected error ocurred, try again later",
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });
});
