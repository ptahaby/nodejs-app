import { Controller, Post, Request, UseGuards} from '@nestjs/common';
import { LocalAuthGuard } from '../../auth/local-auth.guard';
import { User } from '../users/user.model';
import { AuthService, AccessToken } from '../../auth/auth.service';

@Controller('login')
export class LoginsController {

  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Request() req: {user: User}): Promise<AccessToken|undefined> {
    return this.authService.login(req.user as User)
  }
}
