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
  origin: 'https://splendorous-gecko-55b2d1.netlify.app',
  credentials: true,
}));*/

const allowedOrigins = ['https://meek-kashata-f904a4.netlify.app'];

app.use(cors({
  origin: function (origin, callback) {
   
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));


/*app.use(cors({
  origin: 'https://meek-kashata-f904a4.netlify.app',
  credentials: true,
})); */


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