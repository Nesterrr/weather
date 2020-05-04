import express = require('express');
import bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
  res.send('api test');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server is up!');
});
