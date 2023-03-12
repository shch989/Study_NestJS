# NodeJS Express.js 1

## Express.js 설치 과정

```
$ npm init -y
```

```
$ npm install --save express
```

```
$ npm install -D nodemon
```

```
$ npm install --save body-parser
```

## Express.js 기본 템플릿

```
const express = require('express')
const app = express()
const port = 3000

app.use('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/`)
})
```

## Express.js의 요청 4가지

| 이름   | 기능   |
| ------ | ------ |
| GET    | Read   |
| POST   | Create |
| PUT    | Update |
| DELETE | DELETE |

## 미들웨어 추가 및 작동 방식

JS코드는 위에서 아래로 읽는 방식이기 때문에<br/>
미들웨어 또한 코드가 위에서 아래로 실행된다.<br/>
아래의 코드에서 첫 번째 미들웨어가 실행되고<br/>
next( ) 함수를 사용하므로서 다음 요청이 실행된다.<br/>

```
const express = require('express')
...
app.use((req, res, next) => {
  console.log('In the middleware!')
  next()
})

app.use('/', (req, res) => {
  res.send('Hello World!')
})
...
```

## 다른 라우트 사용법

```
const express = require('express')
...
app.use('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/express', (req, res) => {
  res.send('Hello from Express!')
})
...
```

## Body-Parser 실행

```
const express = require('express')
const bodyParser = require('body-parser')

...

app.use(bodyParser.json())

...

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/`)
})
```

## Route 생성 및 관리

routes 폴더 생성 및 관리할 router 파일 생성<br/>
router 코드는 아래와 같이 작성<br/>

```
const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  ...
})

router.post('/product', (req, res) => {
  ...
})

module.exports = router
```

app.js에서 router 파일 불러오기<br/>

```
const express = require('express')
...
const app = express()
...
const adminRoutes = require('./routes/admin')
...
app.use('/', adminRoutes)
...
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/`)
})
```

## cors 오류 해결

```
$ npm install --save cors
```

```
const express = require('express')
const cors = require('cors')
const app = express()
...
app.use(cors())
...
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/`)
})
```
