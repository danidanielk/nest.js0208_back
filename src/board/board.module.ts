import { Module } from '@nestjs/common';
// import { MulterModule } from '@nestjs/platform-express/multer';
import { AuthModule } from 'src/auth/auth.module';
import { BoardController } from './board.controller';
import { BoardRepository } from './board.repository';
import { BoardService } from './board.service';

@Module({
  imports: [
    AuthModule,
    // MulterModule.register({
    //   dest: './upload',
    // }),
  ],
  controllers: [BoardController],
  providers: [BoardService, BoardRepository],
})
export class BoardModule {}
