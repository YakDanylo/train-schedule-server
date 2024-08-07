import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class loginBodyDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
