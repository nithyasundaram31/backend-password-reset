import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import logger from './utils/logger.js';

dotenv.config();
const app = express();


/*app.use(cors({
origin: "https://6819a21cba11b05832a97256--soft-sunshine-020931.netlify.app",
credentials: true, 
}));*/

/*const allowedOrigins = [
  'http://localhost:5173',
  //'https://6819a21cba11b05832a97256--soft-sunshine-020931.netlify.app'
  'https://681b62b63ee14a0008e5a887--soft-sunshine-020931.netlify.app'
];*/

app.use(cors({
  origin: 'https://curious-puffpuff-49dc22.netlify.app',
  credentials: true,
}));



app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
res.send('Password reset API is live');
});

//Middleware to log requests
app.use(logger);

app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
console.log('✅ Connected to MongoDB');
app.listen(process.env.PORT || 4000, '0.0.0.0', () =>
console.log(`🚀 Server running on port ${process.env.PORT || 4000}`)
);

})
.catch(err => console.error('❌ MongoDB connection error:', err));