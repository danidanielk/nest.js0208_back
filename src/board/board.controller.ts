import {
  Body,
  Controller,
  Post,
  Get,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { Delete, Param, Patch } from '@nestjs/common/decorators';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { BoardDto } from './board.dto';
import { BoardEntity } from './board.entity';
import { BoardService } from './board.service';
import { BoardStatus } from './board.status';
import { AuthGuard } from '@nestjs/passport';
import { request } from 'http';
// import { Query } from 'typeorm/driver/Query';

@Controller('board')
@UseGuards(AuthGuard())
export class BoardController {
  constructor(private boardService: BoardService) {}

  //게시물 작성
  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() boardDto: BoardDto, @Req() req): Promise<BoardEntity> {
    return this.boardService.createboard(boardDto, req);
  }

  //아이디 값과 같은 게시물 select
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id): Promise<BoardEntity> {
    return this.boardService.findById(id);
  }

  //모든 게시물 select
  @Get()
  fidAll(): Promise<BoardEntity[]> {
    return this.boardService.findAll();
  }

  //아이디 값과 같은 게시물 update
  @Patch(':id')
  updateBoard(
    @Param('id', ParseIntPipe) id,
    @Body('status') status: BoardStatus,
  ): Promise<BoardEntity> {
    return this.boardService.ubdateBoard(id, status);
  }

  //아이디 값과 같은 게시물 delete
  @Delete(':id')
  deleteBoard(@Param('id', ParseIntPipe) id): Promise<void> {
    return this.boardService.deleteBoard(id);
  }

  //쿼리파라미터 사용 "Validation failed (numeric string is expected)" 원인찾기.
}
