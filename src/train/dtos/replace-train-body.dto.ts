import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class replaceTrainBodyDto {
  @IsString()
  departure: string;
  @IsString()
  arrive: string;
  @IsDate()
  @Type(() => Date)
  departureDate: Date;
  @IsDate()
  @Type(() => Date)
  arriveDate: Date;
}
