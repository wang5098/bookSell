<template>
  <div class="container">
    <h2>
      欢迎用户：
      <text style="color: red; text-decoration: underline">{{ username }}</text>
      <router-link to="/" style="float: right; font-size: medium">退出登录</router-link>
    </h2>
    <h2 class="title">图书销售页面</h2>
    <input class="input" type="text" v-model="book" placeholder="搜索图书名称" />
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>图书编号</th>
          <th>图书名称</th>
          <th>单价</th>
          <th>剩余数量</th>
          <th>备注</th>
          <th>数量</th>
          <th>购买</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(book, i) in books" :key="book.id" class="book-row">
          <td>{{ book.id }}</td>
          <td>{{ book.book_number }}</td>
          <td>{{ book.book_name }}</td>
          <td>{{ book.purchase_price }}</td>
          <td>{{ book.purchase_quantity }}</td>
          <td>{{ book.remark }}</td>
          <td><input type="text" placeholder="请输入数量（整数）" v-model="num[i]" /></td>
          <td>
            <button @click="buyBook(book, i)" class="buy-button">购买</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div style="display: flex; align-items: center">
      <input type="text" class="input" placeholder="请输入你的留言" v-model="msg" />
      <button @click="addText" style="width: 4rem; height: 2rem; margin-left: 10px">确定</button>
    </div>
    <div class="text"></div>
  </div>
</template>
<script>
import axios from 'axios'
import { useRoute } from 'vue-router'

export default {
  data() {
    return {
      username: '',
      num: [],
      books: [], // 存储purchaseinventory表的图书数据
      book: '',
      msg: '',
    }
  },
  // 搜索功能：监听输入框 book
  watch: {
    book() {
      for (let i = 0; i < this.books.length; i++) {
        const elements = document.querySelectorAll('.book-row')
        const element = elements[i]
        if (this.books[i].book_name == this.book) {
          element.style.backgroundColor = 'red'
        } else {
          element.style.backgroundColor = ''
        }
      }
    },
  },
  mounted() {
    // 获取purchaseinventory表的图书数据
    this.getBooks()
    const route = useRoute()
    this.username = route.params.username
  },
  methods: {
    getBooks() {
      // 发起请求，从后端获取purchaseinventory表的数据
      axios
        .get('/api/purchase')
        .then((response) => {
          this.books = response.data.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    buyBook(book, i) {
      // 发起请求，将图书添加到salesinventory表
      if (Number(this.num[i]) <= 0 || isNaN(this.num[i])) {
        alert('请输入正整数！！！')
      } else {
        axios
          .post('/api/sales', [book, this.num[i]])
          .then((response) => {
            console.log('购买成功')
            this.books[i].purchase_quantity -= this.num[i]
            this.num = []
          })
          .catch((error) => {
            console.error(error)
          })
      }
    },
    addText(btn) {
      const msgs = document.querySelector('.text')
      let i = msgs.children.length + 1
      let t = document.createElement('p')
      t.textContent = `留言 ${i}：` + this.msg + '。'
      this.msg = ''
      msgs.appendChild(t)
      msgs.style.border = '1px solid gray'
      msgs.style.padding = '5px'
    },
  },
}
</script>
<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.book-row {
  transition: background-color 0.3s ease;
}

.book-row:hover {
  background-color: #f1f1f1;
}

.buy-button {
  padding: 6px 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.buy-button:hover {
  background-color: #0056b3;
}

.table {
  border-collapse: collapse;
}

.table th,
.table td {
  border: 1px solid #ccc;
  padding: 8px;
}
.input {
  width: 100%;
  line-height: 2rem;
  margin-bottom: 15px;
  margin-top: 15px;
}
.route {
  margin: 10px;
  float: right;
}
</style>
