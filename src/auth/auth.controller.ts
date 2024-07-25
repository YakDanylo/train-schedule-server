import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { registerBodyDto } from './dtos/register-body.dto';
import { loginBodyDto } from './dtos/login-body.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Public } from 'src/decorators/Public';
import { RefreshJwtGuard } from './refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @Post('sign_up')
  async register(@Body() body: registerBodyDto) {
    const response = await this.authService.sign_up(body);
    return response;
  }
  @Public()
  @Post('login')
  async login(@Body() body: loginBodyDto) {
    const response = await this.authService.login(body);
    return response;
  }
  @Public()
  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refresh(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
}
