import express from 'express';
import session from 'express-session';
import pgSession from 'connect-pg-simple';
import accountRoutes from './routes/accountRoutes.js';
import userInteractionRoutes from './routes/userInteractionsRoutes.js'; 
import pool from './config/db.js';
import cors from 'cors';



const app = express()
const PORT = process.env.PORT || 3000;
const PostgresqlStore = pgSession(session);

app.use(cors({

  origin: ['http://localhost:8081', 'http://192.168.1.66:8081', 'http://192.168.1.66:3001'],
  credentials: true

}));

const sessionStore = new PostgresqlStore({

  pool: pool,
  tableName: 'sessions'

});

app.use(express.json()) 
app.use(session({

  // 
  store: sessionStore,
  secret: process.env.SESSION_SECRET || 'secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: 'none'
  }

}));

app.get('/', (req, res) => {
  res.send('Welcome to SwipeDish/Trip')
})

app.use('/accounts', accountRoutes)
app.use('/api/interactions', userInteractionRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})