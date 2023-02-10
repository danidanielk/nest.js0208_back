import { Injectable, HttpException } from '@nestjs/common';
import { BoardDto } from './board.dto';
import { BoardEntity } from './board.entity';
import { BoardRepository } from './board.repository';
import { BoardStatus } from './board.status';

@Injectable()
export class BoardService {
  constructor(private boardRepository: BoardRepository) {}

  createboard(boardDto: BoardDto, req): Promise<BoardEntity> {
    return this.boardRepository.createBoard(boardDto, req);
  }

  findById(id): Promise<BoardEntity> {
    const board = this.boardRepository.findById(id);
    if (!board) {
      throw new HttpException(`Not found > ${id}`, 404);
    }
    return board;
  }

  findAll(): Promise<BoardEntity[]> {
    const board = this.boardRepository.findAll();

    return board;
  }
  async ubdateBoard(id, status: BoardStatus): Promise<BoardEntity> {
    const board = await this.boardRepository.updateBoard(id);
    // const inputstatus = status.toUpperCase(); //타입을 BoardStatus 로 바꾸는법 찾아보기..
    board.status = status;
    await this.boardRepository.save(board);
    const enumType = [BoardStatus.private, BoardStatus.public];
    const enumTypeCheck = enumType.indexOf(status);
    if (enumTypeCheck === -1) {
      throw new HttpException('please insert PUBLIC or PRIVATE', 404);
    }
    return board;
  }

  async deleteBoard(id: number): Promise<void> {
    const getAffected = await this.boardRepository.deleteBoard(id);
    if (getAffected.affected === 0) {
      throw new HttpException(`Not found your id :${id}`, 404);
    } else {
      throw new HttpException(`delete success of id:${id}`, 200);
    }
  }
}
