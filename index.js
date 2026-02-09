const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = 8080;

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/hola', (req, res) => {
  res.send('prueba API REST');
});

app.listen(PORT, () => {
  console.log(`API REST ejecutándose en http://localhost:${PORT}`);
});
