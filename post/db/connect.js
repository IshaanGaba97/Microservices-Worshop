const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI).then(()=>{
  console.log('MongoDB Connected')
}).catch((err)=>{
  console.log(err);
});
