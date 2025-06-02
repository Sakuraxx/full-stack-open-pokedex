import express from "express";
import path from 'path'; // 引入 path 模块
import { fileURLToPath } from 'url'; // 用于 ES modules 获取 __dirname

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// get the port from env variable
const PORT = process.env.PORT || 5000;

// 构建 dist 文件夹的绝对路径
// __dirname 是当前文件 (app.js) 所在的目录 (src)
// path.join(__dirname, '../dist') 会得到 /opt/render/project/src/../dist，即 /opt/render/project/dist/
const distPath = path.join(__dirname, 'dist');

app.use(express.static(distPath));

app.get('/health', (req, res) => {
  res.send('fine');
});

app.get('*', (req, res) => {
  // res.sendFile('index.html', { root: distPath }); // 这种方式也可以
  res.sendFile(path.join(distPath, 'index.html')); // 更明确
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});