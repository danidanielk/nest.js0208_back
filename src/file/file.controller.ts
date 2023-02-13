import {
  Controller,
  Get,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/utils/multer.options';
import { FileService } from './file.service';
// import { multerOptions } from './multer.options';

@Controller('file')
@UseGuards(AuthGuard())
export class FileController {
  constructor(private fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('image', 5, multerOptions('folder2'))) //키값
  uploadCatImg(@UploadedFiles() files: Array<Express.Multer.File>, @Req() req) {
    console.log(files);
    // return 'uploadImg';
    return { image: `http://localhost:3000/media/cats/${files[0].filename} ` };
    return this.fileService.uploadFile(req, files);
  }
  @Get('/test')
  testhandle() {
    console.log('aa');
  }
}
