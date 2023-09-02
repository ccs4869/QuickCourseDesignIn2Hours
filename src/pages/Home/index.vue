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
      <el-collapse-item :title="item.title" :name="index">
        <div @click="getComments(item.detail.href[0].href)">查看评论</div>
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
import $ from "../../utils/jquery"

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
      hotList.lists = formatCiText(
        res,
        ".uni-blk-list02.list-a.list-0427 li",
        "a"
      )
    })
}

const acticleList = reactive([])
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
          ".general .china>.china_ul .direction dl dt",
          "dt"
        )
        nodes.forEach((item) => {
          acticleList.push({
            href: item.href,
            title: item.innerText,
            detail: {}
          })
        })
        // acticleList.value = nodes.map(({ href, innerText: text }) => {
        //   return {
        //     href,
        //     title: text
        //   }
        // })
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
      const detail = formatCiText(
        res,
        ".article-content .article-content-left .article p",
        ""
      )

      const author = formatCiText(
        res,
        ".top-bar-wrap .top-bar .top-bar-inner .date-source .date",
        ""
      )

      const comments = {
        href: formatCiNode(
          res,
          ".top-bar-wrap .top-bar .top-bar-inner .page-tools .tool-cmt a",
          ""
        ),
        length: formatCiText(
          res,
          ".top-bar-wrap .top-bar .top-bar-inner .page-tools .tool-cmt a .num",
          ""
        )
      }

      acticleList[activeName.value].detail = comments
    })
}
function formatUrlParams(url) {
  const params = {}
  const queryString = url.split("?")[1]
  if (queryString) {
    const paramPairs = queryString.split("&")
    paramPairs.forEach((pair) => {
      const [key, value] = pair.split("=")
      params[key] = decodeURIComponent(value)
    })
  }
  return params
}

const getComments = (url) => {
  // Format url query
  const { newsid } = formatUrlParams(url)
  $http
    .get("/comments", {
      params: {
        format: "json",
        channel: "gn",
        newsid
      }
    })
    .then(({ data: res }) => {
      console.log(res)
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
