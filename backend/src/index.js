const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const path = require('path')
const cors = require('cors')


const userRoute = require('./routes/user')
const adminRoute = require('./routes/admin/user')
const categoryRoute = require('./routes/category')
const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const initData = require('./routes/admin/initData');
const pageRoute = require('./routes/admin/page');


mongoose.connect("mongodb://localhost:27017/jumia", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
    console.log('database connected');
});
env.config();

app.use(cors())
app.use(express.json());
app.use('/public',express.static(path.join(__dirname, 'uploads')))
app.use('/api', userRoute)
app.use('/api', adminRoute)
app.use('/api', categoryRoute)
app.use('/api', productRoute)
app.use('/api', cartRoute)
app.use('/api', initData)
app.use('/api', pageRoute)




app.listen(process.env.PORT, () => {
  console.log(`running on port ${process.env.PORT}`);
});
