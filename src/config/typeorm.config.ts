import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BoardEntity } from 'src/board/board.entity';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1',
  database: 'board0208',
  entities: [__dirname + '/../**/*.entity.{js,ts}', BoardEntity],
  synchronize: true,
};
