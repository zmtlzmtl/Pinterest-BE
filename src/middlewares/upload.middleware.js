const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
const S3storage = multerS3({
  s3: s3,
  bucket: process.env.AWS_S3_BUCKET_NAME,
  acl: 'public-read-write',
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: (_req, file, cb) => {
    // 파일 이름 형식 : 오늘날짜_원래이름
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage: S3storage,
  // 파일 허용 조건 : 확장자 이미지 타입만 업로드
  fileFilter: function (_req, file, cb) {
    const typed = String(file.mimetype)?.split('/')[0] ?? 'null';
    if (typed !== 'image') {
      cb(new Error('Not IMAGE TYPE!'), null);
    }
    cb(null, true);
  },
}).single('image');

module.exports = upload;
