import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { File } from './file.entity';

@Injectable()
export class FileRepository extends Repository<File> {
  constructor(private dataSource: DataSource) {
    super(File, dataSource.createEntityManager());
  }

  //   findByIdAndUpdateImg(userid, fileName) {
  // const cat =
  // console.log('aa');
  //   }
}
