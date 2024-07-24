import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class changeTrainBodyDto {
  @IsString()
  @IsOptional()
  departure: string;
  @IsString()
  @IsOptional()
  arrive: string;
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  departureDate: Date;
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  arriveDate: Date;
}
