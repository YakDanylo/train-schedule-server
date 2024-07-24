import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { createTrainBodyDto } from './dtos/create-train-body.dto';
import { TrainService } from './train.service';
import { getTrainQueryDto } from './dtos/get-train-query.dto';
import { replaceTrainBodyDto } from './dtos/replace-train-body.dto';
import { ObjectId } from 'typeorm';
import { changeTrainBodyDto } from './dtos/change-train-body.dto';

@Controller('train')
export class TrainController {
  constructor(private trainService: TrainService) {}
  @Get()
  async getTrains(@Query() query: getTrainQueryDto) {
    const response = await this.trainService.getTrains(query);
    return response;
  }
  @Get(':id')
  async getTrain(@Param('id') id: ObjectId) {
    const response = await this.trainService.getTrain(id);
    return response;
  }
  @Post()
  @HttpCode(201)
  async addTrain(@Body() body: createTrainBodyDto) {
    const response = await this.trainService.addTrain(body);
    return response;
  }
  @Put(':id')
  async replaceTrain(
    @Param('id') id: ObjectId,
    @Body() body: replaceTrainBodyDto,
  ) {
    const response = await this.trainService.replaceTrain(id, body);
    return response;
  }
  @Patch(':id')
  async changeTrain(
    @Param('id') id: ObjectId,
    @Body() body: changeTrainBodyDto,
  ) {
    const response = await this.trainService.changeTrain(id, body);
    return response;
  }
  @Delete(':id')
  @HttpCode(204)
  async deleteTrain(@Param('id') id: ObjectId) {
    const response = await this.trainService.deleteTrain(id);
    return response;
  }
}
