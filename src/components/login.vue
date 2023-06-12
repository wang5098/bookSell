<template>
  <div class="container">
    <h2>登录</h2>
    <form @submit.prevent="login">
      <label>
        用户名:
        <input type="text" v-model="username" required />
      </label>
      <label>
        密&emsp;码:
        <input type="password" v-model="password" required />
      </label>
      <button type="submit" @click="change = 1" class="btn">用户登录</button>
      <button type="submit" @click="change = 2" class="btn">商家登录</button>
      <button type="submit" @click="change = 3" class="btn">管理员</button>
    </form>
    <hr style="margin-top: 1rem"/>
    <h2>注册</h2>
    <form @submit.prevent="register">
      <label>
        用户名:
        <input type="text" v-model="newUsername" required />
      </label>
      <label>
        密&emsp;码:
        <input type="password" v-model="newPassword" required />
      </label>
      <button type="submit" class="btn">注册</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

// 数据响应式
const change = ref(1)
const username = ref('')
const password = ref('')
const newUsername = ref('')
const newPassword = ref('')

// Vue Router 实例
const router = useRouter()
// 登录函数
const login = () => {
  // 发起登录请求
  // 替换为您实际的登录 API 端点和请求方式
  axios
    .post('/api/login', {
      username: username.value,
      password: password.value,
    })
    .then(function (res) {
      // 登录成功，跳转到表单展示页面
      console.log('login:', res.data)
      if (res.data.status === 0 && change.value === 1) {
        router.push({ path: `/userBuy/${username.value}` })
      } else if (res.data.status === 0 && change.value === 2) {
        router.push({ path: `/form/${username.value}` })
      } else if (res.data.status === 0 && change.value === 3) {
        router.push({ path: `/admin/${username.value}` })
      } else {
        alert('登录失败，请检查用户名或密码')
      }
    })
    .catch((error) => {
      console.error(error)
    })
}

// 注册函数
const register = () => {
  // 发起注册请求
  // 替换为您实际的注册 API 端点和请求方式
  axios
    .post('/api/register', {
      username: newUsername.value,
      password: newPassword.value,
    })
    .then((res) => {
      // 注册成功，清空表单
      if (res.data.status === 0) {
        alert('注册完成，请自行登录！')
      } else if (res.data.status === 2) {
        alert(`用户 ${newUsername.value} 已存在！`)
      } else {
        alert('注册失败！')
      }
      newUsername.value = ''
      newPassword.value = ''
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 4px;
  opacity: 0.8;
}
label {
  display: block;
  margin-bottom: 10px;
  margin-top: 10px;
}
input {
  height: 25px;
}
.btn {
  margin-left: 1rem;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.btn:hover {
  background-color: #0056b3;
}
</style>
