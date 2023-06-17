import express from 'express';
import cors from 'cors';
import colors from 'colors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import userRoute from './routes/userRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js'
import path from 'path';
//rest object
const app = express();


//middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())


//config
dotenv.config();
connectDB()

//routes
//user-routes
app.use('/api/v1/users', userRoute);
//transaction-routes
app.use('/api/v1/transaction', transactionRoutes)

// //static files
// app.use(express.static(path.join(__dirname, './client/build')))
// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, './client/build/index.html'));
// })

//port
const PORT = 8080 || process.env.PORT


//listen-Server
app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
})