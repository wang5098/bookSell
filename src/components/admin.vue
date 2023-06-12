<template>
  <div style="margin: 2rem">
    <h3>
      管理员：
      <text style="color: red; font-size: large; text-decoration: underline">{{ username }}</text>
      <router-link to="/" style="margin-left: 2rem; font-size: medium">退出登录</router-link>
    </h3>
    <h4>用户表单</h4>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>用户名</th>
          <th>密码</th>
          <th>删除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="admin in adminData" :key="admin.id">
          <td>{{ admin.id }}</td>
          <td>{{ admin.username }}</td>
          <td>{{ admin.password }}</td>
          <td><button class="btn" @click="delUser(admin.username)">删除</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

// 数据响应式
const adminData = ref([])
const username = ref('')

// 获取users表单数据
const admin = () => {
  axios
    .get('/api/admin')
    .then((response) => {
      adminData.value = response.data.data
    })
    .catch((error) => {
      console.error(error)
    })
}

const delUser = (user) => {
  axios
    .post('/api/adminDel', { user }) // 传入一个对象或者数组( req.body.user | req.body[0] )
    .then((res) => {
      if (res.data.status === 0) {
        alert(res.data.msg)
        history.go(0)
      } else alert('error')
    })
    .catch((error) => {
      console.error(error)
    })
}
// 在组件挂载后，获取users数据
onMounted(() => {
  admin()
  const route = useRoute()
  username.value = route.params.username
})
</script>

<style scoped>
.table {
  border-collapse: collapse;
  text-align: center;
}

.table th,
.table td {
  border: 1px solid #ccc;
  padding: 8px;
  width: 15%;
}

.btn {
  padding: 10px 20px;
  font-size: 12px;
  background-color: #ff0000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.btn:hover {
  background-color: #b30006;
}
</style>
