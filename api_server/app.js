import express from 'express';
const app = express()
app.use(express.json()) // 中间件：解析 JSON 数据

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
var port = 8848
app.listen(port, () => {
  console.log('api server running at http://127.0.0.1:' + port)
})
