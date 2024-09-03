import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AccountsModule } from './accounts/accounts.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'e_ticket_portal',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    CategoryModule,
    MoviesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
