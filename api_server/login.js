import express from 'express';
const router = express.Router()//路由模块实例

//连接数据库
import mysql from 'mysql';
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'booksell_keshe'
});

//注册
router.post('/register', function (req, res) {
    const userinfo = req.body
    const sqlStr = 'select * from users where username=?'
    db.query(sqlStr, userinfo.username, (err, results) => {
        if (err) {
            return res.send({
                status: 1, msg: err
            })
        }
        if (results.length > 0) {
            return res.send({
                status: 2, msg: '用户名被占用，请更换其他用户名！'
            })
        }
        const sql = 'insert into users set ?'
        db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            console.log((results));
            if (err) {
                return res.send({
                    status: 1, msg: err
                })
            }
            if (results.affectedRows !== 1) {
                return res.send({
                    status: 1,
                    msg: '注册用户失败，请稍后再试！'
                })
            }
            res.send({
                status: 0,
                msg: '注册成功'
            })
        })
    })
})

//登录
router.post('/login', function (req, res) {
    const userinfo = req.body
    const sql = `select * from users where username=? and password=?`
    //根据登录表单的username和password对比数据库
    console.log('post-login:', userinfo);
    db.query(sql, [userinfo.username, userinfo.password], (err, results) => {
        if (err) {
            return res.send({
                status: 1, msg: err
            })
        }
        if (results.length !== 1) {
            return res.send({
                status: 2, msg: '登录失败'
            })
        } else {
            return res.send({
                status: 0,
                msg: "login ok",
            })
        }
    })
})

// 管理登录获取全部users
router.get('/admin', function (req, res) {
    const sql = `select * from users`
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            return res.send({
                data: results
            })
        }
    })
})


//导出router
export default router
