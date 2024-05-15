const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const offlineProductRoutes = require('./routes/offlineProductRoutes');
const offlineUserRoutes = require('./routes/offlineAuthRoutes');
const connection = require("./db");

const app = express();

console.log(`Server is active`);



// Database connection
connection();

// Middleware
app.use(express.json());
app.use(cors());




// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/offlineProducts', offlineProductRoutes);
app.use('/api/offlineUser',offlineUserRoutes);



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
