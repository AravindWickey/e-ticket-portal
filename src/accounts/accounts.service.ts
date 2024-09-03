// src/accounts/accounts.service.ts
import { Injectable,ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
  ) {}

  async createAccount(username: string, password: string, secret: string): Promise<Account> {
    if(secret!="NMSsecret"){
      throw new ConflictException('User already exists');
    }
    const duplicateUser = await this.accountsRepository.findOne({ where: { username } });
    if (duplicateUser) {
        throw new ConflictException('User already exists');
      }
    const hashedPassword = await bcrypt.hash(password, 10);
    const account = this.accountsRepository.create({ username, password: hashedPassword });
    
    console.log(account,"account in register")
    return this.accountsRepository.save(account);
  }

  async findAccountByUsername(username: string): Promise<Account | undefined> {
    return this.accountsRepository.findOne({ where: { username } });
  }
}
