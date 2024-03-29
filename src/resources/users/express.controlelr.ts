import { Response, Request } from 'express';
import { Controller, Get, Post, Body, Param, Delete, Put, Res, Request as RequestNest, UseGuards } from '@nestjs/common';
import User, { UserData } from './user.model';
import { UsersService } from './user.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../roles/role.guard';
import { Roles } from '../../roles/roles.decorator';
import { Role } from '../../roles/role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersExpressController {
  private usersService: UsersService;

  constructor(usersService: UsersService){
    this.usersService = usersService;
  }

  @Get()
  async findAll(@RequestNest()_ : Request, @Res() res: Response): Promise<void> {
    const users = await this.usersService.getAll();
    res.json(users.map(User.toResponse));
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response): Promise<void> {
    
    const user = await this.usersService.getById(id);
    if(user) {
      res.json(User.toResponse(user));
    } else {
      res.send(404).send();
    }
  }

  @Roles(Role.Admin)
  @Post()
  async create(@Body() createUser: UserData, @Res() res: Response): Promise<void> {
    try{
      const { name, login, password } = createUser;
        const user = await this.usersService.create(new User({name, login, password}));
      res.status(201).json(User.toResponse(user));
    } catch(e) {
      console.log(e)
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUser: UserData, @Res() res: Response): Promise<void> {
    const user = await this.usersService.update(id, updateUser);
    if(user) {
      res.json(User.toResponse(user));
    } else {
      res.send(404).send();
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response): Promise<void> {
    const isDeleted = await this.usersService.deleteUser(id);
    if(isDeleted) {
      res.status(204).send('The user has been deleted');
    } else {
      res.status(404).send('User not found');
    } 
  }
}
