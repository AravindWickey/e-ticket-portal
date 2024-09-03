import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(user: Partial<User>): Promise<User> {
    const savedResult = await this.usersRepository.save(user);
    console.log('2222222222',savedResult)
    return savedResult
  }

  // @Post()
  // async createUser(@Body() createUserDto: Partial<User>): Promise<User> {
  //   try {
  //     const savedUser = await this.usersService.createUser(createUserDto);
  //     console.log(savedUser, 'User created successfully');
  //     return savedUser;
  //   } catch (error) {
  //     console.error('Error creating user:', error);
  //     throw error; // Re-throw the error to handle it elsewhere, like in a global error handler
  //   }
  // }

  getUser(id: number): Promise<User> {
    console.log('get in ser')
    return this.usersRepository.findOne({ where: { id } });
  }
  

  async getallUser(): Promise<User[]> {
    const allUsers = await this.usersRepository.find();
    console.log(allUsers,'Fetching all users');
    return allUsers
  }

  updateUser(id: number, user: Partial<User>): Promise<void> {
    return this.usersRepository.update(id, user).then(() => undefined);
  }

  deleteUser(id: number): Promise<void> {
    return this.usersRepository.delete(id).then(() => undefined);
  }
}
