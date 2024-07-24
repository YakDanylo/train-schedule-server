import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class getTrainQueryDto {
  @IsString()
  @IsOptional()
  departure: string;
  @IsString()
  @IsOptional()
  arrive: string;
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  departureDateStart?: Date | string;
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  departureDateEnd?: Date | string;
}
