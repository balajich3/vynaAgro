const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const productRoutes = require("./routes/products");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);

app.use("/api/contact", require("./routes/contact"));


app.use("/api/products", require("./routes/products"));

app.use('/api/auth', require('./routes/auth'));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB Connected');
  app.listen(5000, () => console.log('Server running on http://localhost:5000'));
}).catch(err => console.log(err));
