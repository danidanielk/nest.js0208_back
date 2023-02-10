import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BoardDto } from './board.dto';
import { BoardEntity } from './board.entity';
import { BoardStatus } from './board.status';

@Injectable()
export class BoardRepository extends Repository<BoardEntity> {
  constructor(private dataSource: DataSource) {
    super(BoardEntity, dataSource.createEntityManager());
  }

  async createBoard(boardDto: BoardDto, req): Promise<BoardEntity> {
    const board = this.create({
      title: boardDto.title,
      description: boardDto.description,
      status: BoardStatus.public,
      user: req.user,
    });
    // console.log(req.user);
    await this.save(board);
    return board;
  }

  async findById(id): Promise<BoardEntity> {
    console.log(typeof id);
    return await this.findOneBy({ id });
  }

  async findAll(): Promise<BoardEntity[]> {
    return await this.find();
  }

  async updateBoard(id): Promise<BoardEntity> {
    return await this.findById(id);
  }

  async deleteBoard(id): Promise<any> {
    const oneOfAffected = await this.delete(id);
    return oneOfAffected;
  }
}
