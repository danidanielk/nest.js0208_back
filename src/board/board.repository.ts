import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { DataSource, Repository } from 'typeorm';
import { BoardDto } from './board.dto';
import { BoardEntity } from './board.entity';
import { BoardStatus } from './board.status';

@Injectable()
export class BoardRepository extends Repository<BoardEntity> {
  constructor(private dataSource: DataSource) {
    super(BoardEntity, dataSource.createEntityManager());
  }

  async createBoard(boardDto: BoardDto): Promise<BoardEntity> {
    const board = this.create({
      title: boardDto.title,
      description: boardDto.description,
      status: BoardStatus.public,
    });
    await this.save(board);
    return board;
  }

  async findById(id): Promise<BoardEntity> {
    const board = await this.findOneBy({ id });
    if (!board) {
      throw new HttpException(`Not found > ${id}`, 404);
    }
    return board;
  }

  async findAll(): Promise<BoardEntity[]> {
    const board = await this.find();

    return board;
  }

  async updateBoard(id, status: BoardStatus): Promise<BoardEntity> {
    const board = await this.findById(id);
    board.status = status;
    await this.save(board);
    const aa = [BoardStatus.private, BoardStatus.public];
    const bb = aa.indexOf(status);
    if (bb === -1) {
      throw new HttpException('please insert PUBLIC or PRIVATE', 404);
    }
    return board;
  }

  async deleteBoard(id): Promise<void> {
    const board = await this.delete(id);
    if (board.affected === 0) {
      throw new HttpException(`Not found your id :${id}`, 404);
    } else {
      throw new HttpException(`delete success of id:${id}`, 200);
    }
  }
}
