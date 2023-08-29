<template>
  <el-date-picker
    v-model="GMT"
    type="date"
    placeholder="Pick a day"
    size="default"
    format="YYYY-MM-DD"
  />

  <el-button @click="send">send</el-button>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue"
import { formatCi, formatDate } from "../../utils/format"

const GMT = ref("")

const {
  ctx,
  appContext: {
    config: {
      globalProperties: { $http }
    }
  }
} = getCurrentInstance()

const send = () => {
  getData(formatDate(GMT.value))
  // getData
}

const getData = (date) => {
  $http
    .get("/data", {
      params: {
        date
      }
    })
    .then(({ data: res }) =>
      console.log(formatCi(res, ".uni-blk-list02.list-a.list-0427 li"))
    )
}
</script>
<style scoped></style>
