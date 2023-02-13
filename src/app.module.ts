import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { BoardModule } from './board/board.module';
import { typeORMConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    BoardModule,
    TypeOrmModule.forRoot(typeORMConfig),
    AuthModule,
    ConfigModule.forRoot(),
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
