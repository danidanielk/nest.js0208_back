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

@Controller('board')
@UseGuards(AuthGuard())
export class BoardController {
  constructor(private boardService: BoardService) {}

  //게시물 작성
  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() boardDto: BoardDto, @Req() req): Promise<BoardEntity> {
    console.log(req.user);
    return this.boardService.createboard(boardDto, req);
  }

  //아이디 값과 같은 게시물 select
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id): Promise<BoardEntity> {
    return this.boardService.findById(id);
  }

  //Query Builder를 사용해서 로그인된 유저의 게시물만 select
  @Get()
  @UsePipes(ValidationPipe)
  findAllOfUser(@Req() req) {
    return this.boardService.findAllOfUser(req);
    // console.log(req.user);
  }

  //모든 게시물 select
  @Get('/이거 어떻게해야될지 알아봐야함.')
  findAll(): Promise<BoardEntity[]> {
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

  //  쿼리파라미터 사용 Post로도 안된다..
  //  세부주소 사용방법이 따로있나 찾아보자.
  //  "Validation failed (numeric string is expected)" 원인찾기.
  @Post()
  querytest(@Query('title') title) {
    console.log(title);
  }
}
