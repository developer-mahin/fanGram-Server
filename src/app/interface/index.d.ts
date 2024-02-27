import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    // interface MulterFile {
    //   [fieldname: string]: Express.Multer.File[];
    //   images?: Express.Multer.Files[];
    //   videos?: Express.Multer.Files[];
    // }

    interface Request {
      user?: JwtPayload;
      // files?: MulterFile;
    }
  }
}
