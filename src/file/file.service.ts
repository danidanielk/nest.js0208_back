import { Injectable } from '@nestjs/common';
import { FileRepository } from './file.repository';

@Injectable()
export class FileService {
  constructor(private fileRepository: FileRepository) {}
  async uploadFile(files: Express.Multer.File[], req) {
    // const fileName = `cats/${files[0].filename}`;
    // console.log(fileName);
    // const newCat = await this.fileRepository.findByIdAndUpdateImg(
    //   req.uesr.userid,
    //   fileName,
    // );
    // console.log(newCat);
    // return newCat;
  }
}
