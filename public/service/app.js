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
  console.log("req-------->",date);
  try {
    const response = await axios.get(`https://news.sina.com.cn/head/news${date}am.shtml`);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.listen(3333, () => { 
  console.log("begin----------------------------")
})