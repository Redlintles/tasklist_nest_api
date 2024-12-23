import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsStrongPassword,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export class UserDto {
  @IsNotEmpty({ message: "Username Cannot be Empty" })
  @MinLength(8, {
    message: "O Nome de usuário deve conter no mínimo 8 caracteres",
  })
  @MaxLength(30, {
    message: "O nome de usuário deve conter no máximo 30 caracteres",
  })
  @Matches(/^[^0-9]/, {
    message: "O nome de usuário não pode começar com um número",
  })
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  @IsNotEmpty({ message: "A senha não pode estar vazia" })
  password: string;

  @IsNumberString()
  @MinLength(11, {
    message: "O número de telefone deve conter ao menos 11 dígitos",
  })
  @MaxLength(15, {
    message: "O número de telefone deve conter no máximo 15 dígitos",
  })
  phone_number: string;
}
