import { User } from 'src/auth/user.entity';
import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
} from 'typeorm';
import { BoardStatus } from './board.status';
@Entity()
export class BoardEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;

  @ManyToOne((type) => User, (user) => user.board, { eager: false })
  user: User;
}
