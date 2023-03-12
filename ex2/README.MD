# NodeJS Express.js 2

## 서버측 유효성 검사 모듈 사용

```
$ npm install --save express-validator
```

### routes에서 유효성 검사 설정

```
...
const { body } = require('express-validator/check')
...
router.post(
  '/post',
  [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 }),
  ],
  feedController.createPost
)
...
```

### controllers에서 에러처리

```
const { validationResult } = require('express-validator/check')
...
exports.createPost = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({
        message: 'Validation failed, entered data is incorrect.',
        errors: errors.array(),
      })
  }
  ...
}
...
```

## 몽구스를 이용한 Post 모델 설정

```
$ npm install --save mongoose
```

### app.js에서 mongoose 임포트

```
const express = require('express')
...
const mongoose = require('mongoose)
...
mongoose
  .connect(
    'MONGODB_URI'
  )
  .then((result) => {
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}/`)
    })
  })
  .catch((err) => console.log(err))
```

### models 폴더에서 스키마 생성(예시)

VSC 확장 모듈에서 Mongo Snippets for Node-js 설치 추천<br/>

```
const mongoose = require('mongoose')

var postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imgaeUrl: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
  },
  { timeStamp: true }
)

module.exports = mongoose.model('Post', postSchema)
```

### MongoDB에 데이터 저장

```
...
const Post = require('../models/post')
...
  const post = new Post({
    title: title,
    content: content,
    imageUrl: '../images/image.jpg',
    creator: {
      name: 'semi',
    },
  })
  post
    .save()
    .then((result) => {
      console.log(result)
      res.status(201).json({
        message: 'Post created successfully',
        post: result,
      })
    })
    .catch((err) => console.log(err))
...
```

## Error를 처리한는 방법

### Error Middleware 생성

```
app.use((error, req, res, next) => {
  console.log(error)
  const status = error.statusCode || 500
  const message = error.message
  res.status(status).json({ message })
})
```

### new Error( ) 사용

```
const error = new Error('404 Not Found.')
error.statusCode = 404
throw error
```

## multer
```
$ npm install --save multer
```
### 이미지를 업로드하는 간단 예시
```
...
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
...
const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images')
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4())
  },
})

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}
...
app.use(bodyParser.json())
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
)
app.use('/images', express.static(path.join(__dirname, 'images')))
...
```
```
exports.postImage = (req, res, next) => {
  ...
  const imageUrl = req.file.path.replace("\\", "/");
  ...
}
```