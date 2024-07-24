import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class createTrainBodyDto {
  @IsString()
  @IsNotEmpty()
  departure: string;
  @IsString()
  @IsNotEmpty()
  arrive: string;
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  departureDate: Date;
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  arriveDate: Date;
}
