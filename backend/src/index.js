import express from 'express';
import session from 'express-session';
import pgSession from 'connect-pg-simple';
import accountRoutes from './routes/accountRoutes.js'; 
import pool from './config/db.js';

const app = express()
const PORT = process.env.PORT || 3000;
const PostgresqlStore = pgSession(session);

const sessionStore = new PostgresqlStore({

  pool: pool,
  tableName: 'sessions'

});

app.use(express.json()) 
app.use(session({

  store: sessionStore,
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }

}));

app.get('/', (req, res) => {
  res.send('Welcome to SwipeDish/Trip')
})

app.use('/accounts', accountRoutes)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})