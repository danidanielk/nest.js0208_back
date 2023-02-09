import {
  Body,
  Controller,
  Post,
  Get,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Delete, Param, Patch } from '@nestjs/common/decorators';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { BoardDto } from './board.dto';
import { BoardEntity } from './board.entity';
import { BoardService } from './board.service';
import { BoardStatus } from './board.status';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() boardDto: BoardDto): Promise<BoardEntity> {
    return this.boardService.createboard(boardDto);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id): Promise<BoardEntity> {
    return this.boardService.findById(id);
  }

  @Get()
  fidAll(boardDto: BoardDto): Promise<BoardEntity[]> {
    return this.boardService.findAll(boardDto);
  }

  @Patch(':id')
  updateBoard(
    @Param('id', ParseIntPipe) id,
    @Body('status') status: BoardStatus,
  ): Promise<BoardEntity> {
    return this.boardService.ubdateBoard(id, status);
  }

  @Delete(':id')
  deleteBoard(@Param('id', ParseIntPipe) id): Promise<void> {
    return this.boardService.deleteBoard(id);
  }

  @Get(':title')
  test(@Param('title') title): Promise<BoardEntity> {
    return this.boardService.test(title);
  }
}
