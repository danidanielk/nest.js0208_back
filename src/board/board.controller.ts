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
import { Logger } from '@nestjs/common/services';

@Controller('board')
@UseGuards(AuthGuard())
export class BoardController {
  private logger = new Logger('BoardController');
  constructor(private boardService: BoardService) {}

  //게시물 작성
  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() boardDto: BoardDto, @Req() req): Promise<BoardEntity> {
    const user = req.user;
    this.logger.verbose(`${JSON.stringify(user)}`);
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
    const user = req.user.username;
    this.logger.verbose(`User : ${user} trying to get all board`);
    return this.boardService.findAllOfUser(req);
    // console.log(req.user);
  }

  //모든 게시물 select
  @Get('/what')
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
  deleteBoard(@Param('id', ParseIntPipe) id, @Req() req): Promise<void> {
    return this.boardService.deleteBoard(id, req);
  }

  //  쿼리파라미터 사용 Post로도 안된다..
  //  세부주소 사용방법이 따로있나 찾아보자.
  //  "Validation failed (numeric string is expected)" 원인찾기.
  @Post()
  querytest(@Query('title') title) {
    console.log(title);
  }
}
