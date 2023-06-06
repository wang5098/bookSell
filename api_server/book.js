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

// POST请求：图书购入入库
router.post('/purchase', (req, res) => {
    // console.log('api/purchase', req.body);
    // 在这里执行入库操作，将入库信息插入到图书购入入库表单中
    const query = `INSERT INTO PurchaseInventory (book_number, book_name, purchase_price, purchase_quantity, remark) VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [req.body[0], req.body[1], req.body[2], req.body[3], req.body[4]], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error occurred during purchase operation' });
        }
        res.status(201).json({ message: 'Purchase operation successful' });
    });
});

// POST请求：图书销售出库
router.post('/sales', (req, res) => {
    const book = req.body[0];
    // 在这里执行出库操作，将出库信息插入到图书销售出库表单中
    const query = `INSERT INTO SalesInventory (book_number, book_name, sale_price, sale_quantity, remark) VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [book.book_number, book.book_name, book.purchase_price, req.body[1], book.remark], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error occurred during sales operation' });
        }
        db.query(`update PurchaseInventory set purchase_quantity=? where id=?`, [book.purchase_quantity - req.body[1], book.id], (err, data) => {
            if (err) console.error(err);
        })
        res.status(201).json({ message: 'Sales operation successful' });
    });
});

// 查询图书销售出库表单数据
router.get('/sales', (req, res) => {
    const querySales = `SELECT * FROM salesinventory`;
    db.query(querySales, (errSales, data) => {
        if (errSales) {
            console.error(errSales);
            return res.status(500).json({ error: 'Error retrieving sales data' });
        } else {
            res.send({
                data: data
            })
        }
    })
})

// 查询图书购入入库表单数据
router.get('/purchase', (req, res) => {
    const queryPurchase = `SELECT * FROM purchaseinventory`;
    db.query(queryPurchase, (errPurchase, data) => {
        if (errPurchase) {
            console.error(errPurchase);
            return res.status(500).json({ error: 'Error retrieving purchase data' });
        } else {
            res.send({
                data: data
            })
        }
    })
})

//导出router
export default router
