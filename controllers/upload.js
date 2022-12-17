import { readCSV } from '../utils/csv.js';
import multer from 'multer';
import path from 'path';

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.csv');
  },
});

const maxSize = 1 * 1000 * 1000;

var upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb) {
    // Set the filetypes
    var filetypes = /csv/;
    var mimetype = filetypes.test(file.mimetype);

    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb(
      'Error: File upload only supports the ' +
        'following filetypes - ' +
        filetypes
    );
  },
}).single('csvfile');

export const uploadfile = (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      res.send(err);
    } else {
      let fileName = req.file.filename;
      let filepath = req.file.path;
      console.log(filepath);
      readCSV(filepath);

      res.send('Success, file uploaded!');
    }
  });
};
