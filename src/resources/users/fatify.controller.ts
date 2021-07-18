import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import User, { UserData, UserResponse } from './user.model';
import { UsersService } from './user.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../roles/role.guard';
import { Roles } from '../../roles/roles.decorator';
import { Role } from '../../roles/role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersFastifyController {
  private usersService: UsersService;

  constructor(usersService: UsersService){
    this.usersService = usersService;
  }

  @Get()
  async findAll(): Promise<Array<UserResponse>> {
    const users = await this.usersService.getAll();
    return users.map(User.toResponse);
  }

  @Get(':id')
  async findOne(@Param('id') id: string,): Promise<UserResponse| null> {
    
    const user = await this.usersService.getById(id);
    if(user) {
      return User.toResponse(user);
    } 
      return null;
  }

  @Roles(Role.Admin)
  @Post()
  async create(@Body() createUser: UserData): Promise<UserResponse|null> {
    try{
      const { name, login, password } = createUser;
        const user = await this.usersService.create(new User({name, login, password}));
      return User.toResponse(user);
    } catch(e) {
      console.log(e);
      return null
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUser: UserData): Promise<UserResponse|null> {
    const user = await this.usersService.update(id, updateUser);
    if(user) {
      return User.toResponse(user);
    } 
      return null;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<string> {
    const isDeleted = await this.usersService.deleteUser(id);
    if(isDeleted) {
      return 'The user has been deleted';
    } 
    return 'User not found'; 
  }
}
