import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from 'src/auth/auth.module';
import { FileController } from './file.controller';
import { FileRepository } from './file.repository';
import { FileService } from './file.service';
@Module({
  imports: [
    MulterModule.register({
      dest: './upload2',
    }),
    AuthModule,
  ],
  controllers: [FileController],
  providers: [FileService, FileRepository],
})
export class FileModule {}
