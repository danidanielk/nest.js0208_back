import * as multer from 'multer';

import * as path from 'path';

import * as fs from 'fs';

import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const createFolder = (folder: string) => {
  try {
    console.log('๐พ Create a root uploads folder...');

    fs.mkdirSync(path.join(__dirname, '..', `uploads`)); //ํด๋๋ฅผ ๋ง๋๋ ๋ช๋ น์ด
  } catch (error) {
    console.log('The folder already exists...');
  }

  try {
    console.log(`๐พ Create a ${folder} uploads folder...`);

    fs.mkdirSync(path.join(__dirname, '..', `uploads/${folder}`)); //ํด๋ ์์ฑ
  } catch (error) {
    console.log(`The ${folder} folder already exists...`);
  }
};

const storage = (folder: string): multer.StorageEngine => {
  createFolder(folder); // ํด๋ ๋ง๋ค๊ณ 

  return multer.diskStorage({
    //์ต์์ ์จ์ค๋ค.
    destination(req, file, cb) {
      //* ์ด๋์ ์ ์ฅํ  ์ง

      const folderName = path.join(__dirname, '..', `uploads/${folder}`);

      cb(null, folderName); //cb์ ๋๋ฒ์งธ ์ธ์๊ฐ ์ด๋์ ์ ์ฅํ ์ง๋ค.
    },

    filename(req, file, cb) {
      //* ์ด๋ค ์ด๋ฆ์ผ๋ก ์ฌ๋ฆด ์ง

      const ext = path.extname(file.originalname); //ํ์ผ์ ์ฌ๋ ค์ ํ์ฅ์๋ฅผ ์ถ์ถํ๋ค.

      const fileName = `${path.basename(
        file.originalname,

        ext,
      )}${Date.now()}${ext}`;

      cb(null, fileName);
    },
  });
};
//multerOptions์ ์ปจํธ๋กค๋ฌ์์ ์ฌ์ฉํด์ ์๋ก๋ ํ๋ค.
export const multerOptions = (folder: string) => {
  const result: MulterOptions = {
    storage: storage(folder),
  };

  return result;
};
