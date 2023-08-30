<template>
  <el-date-picker
    v-model="GMT"
    type="date"
    placeholder="Pick a day"
    size="default"
    format="YYYY-MM-DD"
    @change="getHots(formatDate(GMT))"
  />

  <ul>
    <li v-for="(item, index) in hotList.lists" :key="index">
      {{ item }}
    </li>
  </ul>

  <!-- <a v-for="(item, idx) in acticleList" :key="idx" :href="item">
    {{ item.innerHTML }}
  </a> -->
</template>

<script setup>
import { ref, getCurrentInstance, onMounted, reactive } from "vue"
import { formatCiText, formatDate, formatCiNode } from "../../utils/format"

onMounted(() => {
  getActicle()
})

const GMT = ref("")

const {
  ctx,
  appContext: {
    config: {
      globalProperties: { $http }
    }
  }
} = getCurrentInstance()

// const send = () => {
//   getData(formatDate(GMT.value))
// }

const hotList = reactive({
  length: 10,
  lists: []
})
const getHots = (date) => {
  $http
    .get("/data", {
      params: {
        date
      }
    })
    .then(({ data: res }) => {
      console.log(formatCiText(res, ".uni-blk-list02.list-a.list-0427 li"))
      hotList.lists = formatCiText(res, ".uni-blk-list02.list-a.list-0427 li")
    })
}

const acticleList = ref([])
const getActicle = (date) => {
  $http
    .get("/acticle", {
      params: {
        date
      }
    })
    .then(
      ({ data: res }) => {
        console.log(
          formatCiNode(res, ".general .china>.china_ul .direction dl dt")
        )
        console.log(acticleList)
        acticleList.value = formatCiNode(
          res,
          ".general .china>.china_ul .direction dl dt"
        )
      }

      // console.log(formatCi(res, ".uni-blk-list02.list-a.list-0427 li"))
    )
}
</script>
<style scoped></style>
