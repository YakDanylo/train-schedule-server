import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const foundUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (foundUser) {
      throw new BadRequestException('User already exists');
    }
    const user = new User();
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    user.email = createUserDto.email;
    user.password = hashedPassword;
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }
}
