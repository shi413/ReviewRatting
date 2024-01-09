const express = require('express')
require('./Dbconnection/connection')
const { userRoutes } = require('./routes/userRoutes')
const { companyRoutes } = require('./routes/companyRoutes');
const { reviewRoutes } = require('./routes/reviewRoutes');
require('dotenv').config()
const app = express();
app.use(express.json())
app.use(express.urlencoded())


app.use('/user', userRoutes)
app.use('/company', companyRoutes)
app.use('/review', reviewRoutes)


app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`);
})