import {  Request as RequestEx } from 'express';
import { Controller, Post, Request, UseGuards} from '@nestjs/common';
import { LocalAuthGuard } from '../../auth/local-auth.guard';
import { User } from '../users/user.model';
import { AuthService, AccessToken } from '../../auth/auth.service';

@Controller('login')
export class LoginsExpressController {

  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Request() req: RequestEx): Promise<AccessToken|undefined> {
    return this.authService.login(req.user as User)
  }
}
