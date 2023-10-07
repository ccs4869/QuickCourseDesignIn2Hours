<template>
  <div class="login-container">
    <el-card shadow="always" class="login-card" v-if="isLogin">
      <h1 style="text-align: center">Login</h1>
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="loginForm"
        style="max-width: 460px"
      >
        <el-form-item label="username">
          <el-input v-model="loginForm.username" />
        </el-form-item>
        <el-form-item label="password">
          <el-input v-model="loginForm.password" />
        </el-form-item>
      </el-form>
      <div class="bottom-button">
        <el-button @click="toRegister">没有账号，去注册</el-button>
        <el-button @click="toHome">确认登录</el-button>
      </div>
    </el-card>
    <el-card shadow="always" class="login-card" v-else>
      <h1 style="text-align: center">Register</h1>
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="registerForm"
        style="max-width: 460px"
      >
        <el-form-item label="username">
          <el-input v-model="registerForm.username" />
        </el-form-item>
        <el-form-item label="password">
          <el-input v-model="registerForm.password" />
        </el-form-item>
        <el-form-item label="confirm pwd">
          <el-input v-model="registerForm.verfity" />
        </el-form-item>
      </el-form>
      <div class="bottom-button">
        <el-button @click="toLogin">已有账号，去登陆</el-button>
        <el-button @click="toHome">确认注册</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
const router = useRouter()
const labelPosition = ref("right")

const isLogin = ref(true)
const loginForm = reactive({
  username: "",
  password: ""
})
const registerForm = reactive({
  username: "",
  password: "",
  verfity: ""
})

const toHome = () => {
  router.push("/home")
}

const toRegister = () => {
  isLogin.value = false
}

const toLogin = () => {
  isLogin.value = true
}
</script>

<style scoped>
.login-container {
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-card {
  width: 50%;
  height: 50%;
}

.el-form {
  margin: 60px auto;
  /* margin-top: 60px; */
}

.bottom-button {
  text-align: center;
}
</style>
