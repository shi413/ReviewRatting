const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/testing')
.then(() => console.log('Connected!')).catch(()=>{console.log("Not Connected")});