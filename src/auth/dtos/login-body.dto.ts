import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class loginBodyDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail() // check this later
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
