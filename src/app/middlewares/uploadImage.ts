import multer from 'multer';
import path from 'path';

const UPLOADS_FOLDER = './uploads';

// var upload = multer({ dest: UPLOADS_FOLDER });

// define the storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_FOLDER);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, '')
        .toLowerCase()
        .split(' ')
        .join('-') +
      '-' +
      Date.now();

    cb(null, fileName + fileExt);
  },
});

// preapre the final multer upload object
export const imageUpload = multer({
  storage: storage,
  limits: {
    fileSize: 200000000, // 200MB
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'images' || file.fieldname === 'image') {
      if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
      ) {
        cb(null, true);
      } else {
        cb(new Error('Only .jpg, .png or .jpeg format allowed!'));
      }
    } else if (file.fieldname === 'videos') {
      if (
        file.mimetype === 'video/mp4' ||
        file.mimetype === 'video/mpeg' ||
        file.mimetype === 'video/quicktime'
      ) {
        cb(null, true);
      } else {
        cb(new Error('Only .mp4, .mpeg or .quicktime format allowed!'));
      }
    } else {
      cb(new Error('There was an unknown error!'));
    }
  },
});

// export const videoUpload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 200000000, // 1MB
//   },
//   fileFilter: (req, file, cb) => {
//     if (file.fieldname === 'videos') {
//       if (
//         file.mimetype === 'video/mp4' ||
//         file.mimetype === 'video/mpeg' ||
//         file.mimetype === 'video/quicktime'
//       ) {
//         cb(null, true);
//       } else {
//         cb(new Error('Only .mp4, .mpeg or .quicktime format allowed!'));
//       }
//     } else {
//       cb(new Error('There was an unknown error!'));
//     }
//   },
// });
