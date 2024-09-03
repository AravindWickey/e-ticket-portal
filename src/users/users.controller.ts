import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: Partial<User>): Promise<User> {
    try {
      const savedUser = await this.usersService.createUser(createUserDto);
      console.log(savedUser, 'User created successfully');
      return savedUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error; // Re-throw the error to handle it elsewhere, like in a global error handler
    }
  }

  @Get(':id')
  getUser(@Param('id') id: number): Promise<User> {
    console.log('get')
    return this.usersService.getUser(id);
  }

  // @Get()
  // getallUser(@Param('') id: number): Promise<User[]> {
  //   console.log('get')
  //   return this.usersService.getallUser();
  // }

  @Get()
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users');
    return this.usersService.getallUser(); 
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() updateUserDto: Partial<User>): Promise<void> {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}
