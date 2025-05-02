import express from 'express';
import reminderRoutes from './routes/accountRoutes.js';

const app = express()
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Welcome to SwipeDish/Trip')
})

app.use(express.json()) 
app.use('/reminders', reminderRoutes)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})