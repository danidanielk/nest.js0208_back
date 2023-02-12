import multer from 'multer';
import path from 'path';
import * as fs from 'fs';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const createFolder = (folder: string) => {
  try {
    console.log('Create a root uploads folder...');
    fs.mkdirSync(path.join(__dirname, '..', `uploads`));
  } catch (error) {
    console.log('the folder already exists...');
  }
  try {
    console.log(`Create a ${folder} uploads folder...`);
    fs.mkdirSync(path.join(__dirname, '..', `uploads/${folder}`));
  } catch (error) {
    console.log(`The ${folder} folder already exists...`);
  }
};

const storage = (folder: string): multer.StorageEngine => {
  createFolder(folder);
  return multer.diskStorage({
    destination(req, file, cd) {
      //어디에 저장할 지
      const folederName = path.join(__dirname, '..', `uploads/${folder}`);
      cd(null, folederName);
    },
    filename(req, file, cd) {
      //어떤 이름으로 저장 할 지
      const ext = path.extname(file.originalname);
      const fileName = `${path.basename(
        file.originalname,
        ext,
      )}${Date.now()}${ext}`;
      cd(null, fileName);
    },
  });
};

export const multerOptions = (folder: string) => {
  const result: MulterOptions = {
    storage: storage(folder),
  };
  return result;
};
