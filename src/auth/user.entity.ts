import { BoardEntity } from 'src/board/board.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['userid'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  userid: string;

  @Column()
  password: string;

  @OneToMany((type) => BoardEntity, (board) => board.user, { eager: true })
  board: BoardEntity[];
}
