// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountsService } from '../accounts/accounts.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private accountsService: AccountsService,
    private jwtService: JwtService,
  ) {}

  async validateAccount(username: string, pass: string): Promise<any> {
    const account = await this.accountsService.findAccountByUsername(username);
    console.log(account,"account")
    if (account && await bcrypt.compare(pass, account.password)) {
        console.log("inside if stae")
      const { password, ...result } = account;
      console.log(result,"result")

      return result;
    }
    return null;
  }

  async login(account: any) {
    const payload = { username: account.username, sub: account.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(username: string, password: string, secret: string) {
    return this.accountsService.createAccount(username, password, secret);
  }
}
