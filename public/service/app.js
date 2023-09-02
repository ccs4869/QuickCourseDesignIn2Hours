import Ep from 'express'
import cors from 'cors'
import axios from 'axios'
const app = new Ep()


app.use(cors())

app.get('/test', (req, res) => { 
  console.log("test");
  res.send('ok')
})

app.get('/data', async (req, res) => {
  const {date} = req.query
  try {
    const response = await axios.get(`https://news.sina.com.cn/head/news${date}am.shtml`);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.get('/acticle', async (req, res) => { 
  const {date} = req.query
  const response = await axios.get(`http://gov.sina.com.cn/`);
  res.send(response.data);
})

app.get('/detail', async (req, res) => { 
  const { url } = req.query
  const response = await axios.get(url);
  res.send(response.data);
})

// 获取文章评论
app.get('/comments', async (req, res) => { 
  const { format, channel, newsid } = req.query
  const params = {
    format,
    channel,
    newsid
  }
  const response = await axios.get('https://comment5.news.sina.com.cn/page/info', { params });
  res.send(response.data);
})

app.listen(3333, () => { 
  console.log("begin----------------------------")
})