<template>
  <div class="login-container">
    <el-card shadow="always" class="login-card">
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="formLabelAlign"
        style="max-width: 460px"
      >
        <el-form-item label="Name">
          <el-input v-model="formLabelAlign.name" />
        </el-form-item>
        <el-form-item label="password">
          <el-input v-model="formLabelAlign.region" />
        </el-form-item>
        <el-form-item label="Activity form">
          <el-input v-model="formLabelAlign.type" />
        </el-form-item>
      </el-form>
      <div class="bottom-button">
        <el-button>注册</el-button>
        <el-button @click="toHome">登录</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
const router = useRouter()
const labelPosition = ref("right")

const formLabelAlign = reactive({
  name: "",
  region: "",
  type: ""
})

const toHome = () => {
  router.push("/home")
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
  margin: 100px auto;
}

.bottom-button {
  text-align: center;
}
</style>
