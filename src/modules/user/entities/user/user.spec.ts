import { User } from "./user";

describe("User", () => {
  it("should be defined", () => {
    expect(new User()).toBeDefined();
  });

  it("should have username property", () => {
    const user = new User();
    user.username = "banana";
    expect(user).toHaveProperty("username", "banana");
  });
  it("should have email property", () => {
    const user = new User();
    user.email = "banana@gmail.com";
    expect(user).toHaveProperty("email", "banana@gmail.com");
  });
  it("should have password property", () => {
    const user = new User();
    user.password = "Banana@123";
    expect(user).toHaveProperty("password", "Banana@123");
  });
  it("should have phone_number property", () => {
    const user = new User();
    user.phone_number = "1234567891011";
    expect(user).toHaveProperty("phone_number", "1234567891011");
  });
});
