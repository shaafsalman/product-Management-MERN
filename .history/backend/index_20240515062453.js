const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');


const app = express();

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());
// app.use(helmet());
// app.use(compression());

app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    res.status(400).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Something went wrong' });
  }
});



// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
