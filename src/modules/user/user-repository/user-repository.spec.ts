import { Repository } from "typeorm";
import { UserRepository } from "./user-repository";
import { User } from "../entities/user/user";
import { UserDto } from "../dtos/user-dto/user-dto";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

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
  });
});
