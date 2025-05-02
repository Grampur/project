// seedUsers.js
import db from '../config/db.js';

async function seedUsers() {
  const users = [
    {
      name: 'Gagan Rampur',
      email: 'grampur123@gmail.com',
      admin: 1,
      password: 'PASSWORD'
    },
    {
      name: 'Test test',
      email: 'test@gmail.com',
      admin: 0,
      password: 'PASSWORD'
    },
  ];

  for (const user of users) {
    try {
        await db.query(
            `INSERT INTO users (name, admin, email, password) VALUES ($1, $2, $3, $4)`,
            [user.name, user.admin, user.email, user.password]
          );          
      console.log(`Inserted user: ${user.name}`);
    } catch (error) {
      console.error(`Error inserting ${user.name}:`, error);
    }
  }

  process.exit();
}

seedUsers();
