import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { createTrainBodyDto } from './dtos/create-train-body.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Train } from './train.entity';
import { Between, FindOptionsWhere, Like, ObjectId, Repository } from 'typeorm';
import { getTrainQueryDto } from './dtos/get-train-query.dto';
import { replaceTrainBodyDto } from './dtos/replace-train-body.dto';
import { changeTrainBodyDto } from './dtos/change-train-body.dto';

@Injectable()
export class TrainService {
  constructor(
    @InjectRepository(Train) private trainRepository: Repository<Train>,
  ) {}
  async getTrains(query: getTrainQueryDto) {
    if (Object.keys(query).length === 0) {
      const result = await this.trainRepository.find();
      return result;
    }

    const queryObject: FindOptionsWhere<Train> = {};

    if (query.departure) {
      queryObject.departure = Like(`%${query.departure}%`);
    }
    if (query.arrive) {
      queryObject.arrive = Like(`%${query.arrive}%`);
    }
    if (query.departureDateStart && query.departureDateEnd) {
      queryObject.departureDate = Between(
        new Date(query.departureDateStart),
        new Date(query.departureDateEnd),
      );
    }
    const result = await this.trainRepository.find({
      where: queryObject,
    });
    if (!result.length) {
      throw new NotFoundException('Trains not found');
    }

    return result;
  }
  async getTrain(id: ObjectId) {
    const result = await this.trainRepository.findOne({ where: { id: id } });

    if (!result) {
      throw new NotFoundException('Train not found');
    }
    return result;
  }
  async addTrain(body: createTrainBodyDto) {
    return await this.trainRepository.save(body);
  }
  async replaceTrain(id: ObjectId, body: replaceTrainBodyDto) {
    const foundTrain = await this.trainRepository.findOne({ where: { id } });
    if (!foundTrain) {
      throw new BadRequestException('Train not found');
    }
    await this.trainRepository.update(id, body);
    const updatedTrain = await this.trainRepository.findOne({ where: { id } });
    return updatedTrain;
  }
  async changeTrain(id: ObjectId, body: changeTrainBodyDto) {
    const foundTrain = await this.trainRepository.findOne({ where: { id } });
    if (!foundTrain) {
      throw new BadRequestException('Train not found');
    }
    await this.trainRepository.update(id, body);
    const updatedTrain = await this.trainRepository.findOne({ where: { id } });
    return updatedTrain;
  }
  async deleteTrain(id: ObjectId) {
    const foundTrain = await this.trainRepository.findOne({ where: { id } });
    if (!foundTrain) {
      throw new BadRequestException('Train not found');
    }
    await this.trainRepository.delete({ id });
    return {};
  }
}
