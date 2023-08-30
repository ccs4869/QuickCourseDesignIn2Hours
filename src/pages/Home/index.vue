<template>
  <el-card class="hot" v-if="false">
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
  </el-card>

  <el-card>
    <el-collapse
      v-model="activeName"
      accordion
      v-for="(item, index) in acticleList"
      :key="index"
      @change="getActicleDetail(item.href)"
    >
      <el-collapse-item :title="item.text" :name="index">
        <div>
          Consistent with real life: in line with the process and logic of real
          life, and comply with languages and habits that the users are used to;
        </div>
        <div>
          Consistent within interface: all elements should be consistent, such
          as: design style, icons and texts, position of elements, etc.
        </div>
      </el-collapse-item>
    </el-collapse>
  </el-card>

  <!-- <a v-for="(item, idx) in acticleList" :key="idx" :href="item">
    {{ item.innerHTML }}
  </a> -->
</template>

<script setup>
import { ref, getCurrentInstance, onMounted, reactive, watchEffect } from "vue"
import { formatCiText, formatDate, formatCiNode } from "../../utils/format"

onMounted(() => {
  getActicle()
})

// watchEffect(() => {
//   getActicleDetail
// })

const activeName = ref(0)

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
      console.log(formatCiText(res, ".uni-blk-list02.list-a.list-0427 li", "a"))
      hotList.lists = formatCiText(
        res,
        ".uni-blk-list02.list-a.list-0427 li",
        "a"
      )
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
        const nodes = formatCiNode(
          res,
          ".general .china>.china_ul .direction dl dt"
        )
        nodes.forEach((item) => console.log(item.innerText))
        acticleList.value = nodes.map(({ href, innerText: text }) => {
          return {
            href,
            text
          }
        })
        console.log(acticleList.value)
      }

      // console.log(formatCi(res, ".uni-blk-list02.list-a.list-0427 li"))
    )
}

const getActicleDetail = (url) => {
  $http
    .get("/detail", {
      params: { url }
    })
    .then(({ data: res }) => {
      console.log(
        formatCiText(
          res,
          ".article-content .article-content-left .article p",
          ""
        )
      )
    })
}
</script>
<style scoped>
.hot {
  width: 500px;
  border: 10px;
}

.el-date-picker {
  margin-bottom: 20px;
}
</style>
