import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { registerBodyDto } from './dtos/register-body.dto';
import { loginBodyDto } from './dtos/login-body.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async sign_up(body: registerBodyDto) {
    const user = await this.userService.create(body);
    return user;
  }
  async login(body: loginBodyDto) {
    const response = await this.userService.findOne(body.email);
    if (!response) {
      throw new NotFoundException('User not found');
    }
    const isMatch = await bcrypt.compare(body.password, response.password);
    if (!isMatch) {
      throw new UnauthorizedException('Incorrect password');
    }
    const payload = { email: body.email };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_TOKEN_SECRET,
      }),
      refresh_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        expiresIn: '7d',
      }),
    };
  }
  async refreshToken(user) {
    const payload = {
      email: user.email,
    };

    return {
      access_token: await this.jwtService.sign(payload, {
        secret: process.env.JWT_TOKEN_SECRET,
      }),
    };
  }
}
