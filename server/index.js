const express = require('express');
const path = require('path');

const app = express();
app.listen(3000, console.log('listening on port 3000'));

app.use(express.static('./'));
app.get('/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/../dist/bundle.js'));
});
app.get('/styles/index.css', (req, res) => {
  res.sendFile(path.join(__dirname, '/../styles/index.css'));
});
