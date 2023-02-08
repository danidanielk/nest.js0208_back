import { Injectable } from '@nestjs/common';
import { BoardDto } from './board.dto';
import { BoardEntity } from './board.entity';
import { BoardRepository } from './board.repository';
import { BoardStatus } from './board.status';

@Injectable()
export class BoardService {
  constructor(private boardRepository: BoardRepository) {}

  createboard(boardDto: BoardDto): Promise<BoardEntity> {
    return this.boardRepository.createBoard(boardDto);
  }

  findById(id): Promise<BoardEntity> {
    const board = this.boardRepository.findById(id);

    return board;
  }
  findAll(): Promise<BoardEntity[]> {
    const board = this.boardRepository.findAll();

    return board;
  }
  ubdateBoard(id, status: BoardStatus): Promise<BoardEntity> {
    const board = this.boardRepository.updateBoard(id, status);
    return board;
  }

  deleteBoard(id: number): Promise<void> {
    return this.boardRepository.deleteBoard(id);
  }
}
