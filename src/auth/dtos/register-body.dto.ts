import { IsNotEmpty, IsString } from 'class-validator';

export class registerBodyDto {
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
