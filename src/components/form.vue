<template>
  <div style="margin: 2rem">
    <h2 style="text-align: center">商家管理页面</h2>
    <h3>
      欢迎商家：
      <text style="color: red; font-size: large; text-decoration: underline">{{ username }}</text>
      <router-link to="/" style="margin-left: 2rem; font-size: medium">退出登录</router-link>
    </h3>
    <h4 class="formH">图书购入入库表单</h4>
    <table class="table">
      <!-- 表格头部 -->
      <thead>
        <tr>
          <th>ID</th>
          <th>图书编号</th>
          <th>图书名称</th>
          <th>购入单价</th>
          <th>购入数量</th>
          <th>备注</th>
        </tr>
      </thead>
      <!-- 表格内容 -->
      <tbody>
        <tr v-for="purchaseItem in purchaseData" :key="purchaseItem.id">
          <td>{{ purchaseItem.id }}</td>
          <td>{{ purchaseItem.book_number }}</td>
          <td>{{ purchaseItem.book_name }}</td>
          <td>{{ purchaseItem.purchase_price }}</td>
          <td>{{ purchaseItem.purchase_quantity }}</td>
          <td>{{ purchaseItem.remark }}</td>
        </tr>
        <tr>
          <td><button @click="buy">点击入库</button></td>
          <td>
            <input type="text" v-model="buyBook[0]" />
          </td>
          <td>
            <input type="text" v-model="buyBook[1]" />
          </td>
          <td>
            <input type="text" v-model="buyBook[2]" />
          </td>
          <td>
            <input type="text" v-model="buyBook[3]" />
          </td>
          <td>
            <input type="text" v-model="buyBook[4]" />
          </td>
        </tr>
      </tbody>
    </table>
    <hr style="margin: 2rem 1rem" />
    <h4 class="formH">图书销售出库表单</h4>
    <table class="table">
      <!-- 表格头部 -->
      <thead>
        <tr>
          <th>ID</th>
          <th>图书编号</th>
          <th>图书名称</th>
          <th>销售单价</th>
          <th>销售数量</th>
          <th>备注</th>
        </tr>
      </thead>
      <!-- 表格内容 -->
      <tbody>
        <tr v-for="salesItem in salesData" :key="salesItem.id">
          <td>{{ salesItem.id }}</td>
          <td>{{ salesItem.book_number }}</td>
          <td>{{ salesItem.book_name }}</td>
          <td>{{ salesItem.sale_price }}</td>
          <td>{{ salesItem.sale_quantity }}</td>
          <td>{{ salesItem.remark }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div><br /><br /><br /></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

// 数据响应式
const salesData = ref([])
const purchaseData = ref([])
const buyBook = ref([])
const username = ref('')

// 获取图书销售出库数据
const fetchSalesData = () => {
  axios
    .get('/api/sales')
    .then((response) => {
      salesData.value = response.data.data
    })
    .catch((error) => {
      console.error(error)
    })
}

// 获取图书购入入库数据
const fetchPurchaseData = () => {
  axios
    .get('/api/purchase')
    .then((response) => {
      purchaseData.value = response.data.data
    })
    .catch((error) => {
      console.error(error)
    })
}

// 入库
const buy = () => {
  axios
    .post('/api/purchase', buyBook.value)
    .then((response) => {
      alert('入库完成')
      purchaseData.value.push = buyBook.value
      history.go(0)
    })
    .catch((error) => {
      console.error(error)
    })
}

// 在组件挂载后，获取图书销售出库和图书购入入库数据
onMounted(() => {
  fetchSalesData()
  fetchPurchaseData()
  const route = useRoute()
  username.value = route.params.username
})
</script>

<style scoped>
.table {
  border-collapse: collapse;
  text-align: center;
  width: 100%;
}

.table th,
.table td {
  border: 1px solid #ccc;
  padding: 8px;
  width: 15%;
}
.formH {
  float: left;
  margin: 1rem;
}
</style>
