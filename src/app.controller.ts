import { Body, Controller, Post, Request, UseGuards, Get } from '@nestjs/common';
import { CreateUserDto } from './users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller()
export class AppController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get()
  hello() {
    return 'Hello World!';
  }

  @ApiResponse({
    status: 201,
    description: 'Пользователь зарегистрирован',
  })
  @ApiResponse({ status: 401, description: 'Неавторизовано' })
  @Post('/auth/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Пользователь авторизован',
  })
  @ApiResponse({ status: 401, description: 'Неавторизовано' })
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
