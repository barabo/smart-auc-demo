const express = require('express');

const app = express();
const port = process.env.PORT || '8123';

app.get('/', (req, res) => {
  res.status(200).send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
