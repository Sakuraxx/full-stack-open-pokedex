import express from "express";
const app = express();

// get the port from env variable
const PORT = process.env.PORT || 5000;

app.use(express.static("dist"));

app.get('/health', (req, res) => {
  res.send('ok');
});

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: 'dist' });
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
