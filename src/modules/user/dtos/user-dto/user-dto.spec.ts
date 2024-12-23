import { validate } from "class-validator";
import { UserDto } from "./user-dto";

describe("UserDto", () => {
  it("should be defined", () => {
    expect(new UserDto()).toBeDefined();
  });

  it("should pass validation for valid data", async () => {
    const dto = new UserDto();

    dto.username = "John Doe";
    dto.email = "Banana@gmail.com";
    dto.password = "Banana@123";
    dto.phone_number = "1234567891011";

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it("should fail validation for invalid username", async () => {
    const dto = new UserDto();

    dto.email = "Banana@gmail.com";
    dto.password = "Banana@123";
    dto.phone_number = "1234567891011";

    dto.username = "1a2b3c4d";
    let errors = await validate(dto);
    expect(errors.length).toBe(1);

    dto.username = "bab";
    errors = await validate(dto);
    expect(errors.length).toBe(1);

    dto.username = "bab19348t93gbf9h5g98jhp9q8ehf981g9p813hp9g8-9508g";
    errors = await validate(dto);
    expect(errors.length).toBe(1);

    dto.username = "";
    errors = await validate(dto);
    expect(errors.length).toBeGreaterThanOrEqual(1);
  });

  it("should fail validation for invalid email", async () => {
    const dto = new UserDto();

    dto.username = "John Doe";
    dto.password = "Banana@123";
    dto.phone_number = "1234567891011";

    dto.email = "Banana_gmail.com";
    let errors = await validate(dto);
    expect(errors.length).toBe(1);

    dto.email = "";
    errors = await validate(dto);
    expect(errors.length).toBeGreaterThanOrEqual(1);
  });

  it("should fail validation for invalid password", async () => {
    const dto = new UserDto();

    dto.username = "John Doe";
    dto.email = "Banana@gmail.com";
    dto.phone_number = "1234567891011";

    dto.password = "banana@123";
    let errors = await validate(dto);
    expect(errors.length).toBe(1);

    dto.password = "BANANA@123";
    errors = await validate(dto);
    expect(errors.length).toBe(1);

    dto.password = "Banana@Aab";
    errors = await validate(dto);
    expect(errors.length).toBe(1);

    dto.password = "BANANAa123";
    errors = await validate(dto);
    expect(errors.length).toBe(1);

    dto.password = "";
    errors = await validate(dto);
    expect(errors.length).toBeGreaterThanOrEqual(1);
  });

  it("should fail validation for invalid phone_number", async () => {
    const dto = new UserDto();

    dto.username = "John Doe";
    dto.email = "Banana@gmail.com";
    dto.password = "Banana@123";

    dto.phone_number = "ananabbanananab";
    let errors = await validate(dto);
    expect(errors.length).toBe(1);

    dto.phone_number = "123456789";
    errors = await validate(dto);
    expect(errors.length).toBe(1);

    dto.phone_number = "123456789101112131415";
    errors = await validate(dto);
    expect(errors.length).toBe(1);

    dto.phone_number = "";
    errors = await validate(dto);
    expect(errors.length).toBeGreaterThanOrEqual(1);
  });
});
