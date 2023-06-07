import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express()

app.use(cors())

// 用urllencoded解析表单数据
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json());

// 路由是指客户端的请求与服务器处理函数之间的映射关系
import loginRouter from './login.js';
import bookRouter from './book.js';
app.use('/api', loginRouter)//使用router，添加前缀 /api
app.use('/api', bookRouter)//使用router，添加前缀 /api

//发生错误
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.send({
      status: 1, msg: '身份认证失败！'
    })
  }
  res.send({
    status: 1, msg: '未知错误'
  })
})

//启动服务器
var port = 8085
app.listen(port, () => {
  console.log('api server running at http://127.0.0.1:' + port)
})
