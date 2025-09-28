const express = require('express');
const app = express();
const PORT =  4000;

// ******** connect to redis ********

const redis = require('redis');
const redis_PORT = 6379; // Default Redis port
const redis_HOST = 'redis'; // اسم السيرفس بتاع الـ redis في docker-compose.yml لازم يبقى "redis" مثلاً
const redisClient =  redis.createClient({
  url: `redis://${redis_HOST}:${redis_PORT}`
});
redisClient.on("error", (err) => console.log("Redis Client Error", err))
redisClient.on("connect", (err) => console.log("connected to Redis..."))
redisClient.connect();

// ****** connect to postgresql ******** 

// const { Client } = require('pg');
// const DB_USER = 'root';
// const DB_PASSWORD =  'example';
// const DB_PORT =  5432;
// // اسم السيرفس بتاع الـ postgres في docker-compose.yml لازم يبقى "postgres"  مثلاً
// const DB_HOST =  'postgres';

// Connection URI
// const URI = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
// const client = new Client({
//   connectionString: URI,
// });
// client
//   .connect()
//   .then(() => console.log('✅ Connected to pstgres db...'))
//   .catch((err) => console.error('❌ Failed to connect to postgres db:', err));



//  **** conected to mongoDB ****

const mongoose = require('mongoose');
const DB_USER = 'root';
const DB_PASSWORD =  'example';
const DB_PORT =  27017;
// اسم السيرفس بتاع الـ mongo في docker-compose.yml لازم يبقى "mongo" مثلاً
const DB_HOST =  'mongo';

// Connection URI
const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

// Connect to MongoDB
mongoose.connect(URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ Failed to connect to MongoDB:', err));

app.get('/', (req, res) => {
  redisClient.set('product', 'Sample Product...');
  res.send('👋HI,New Update, Hello from Express App running on Docker!');
});
app.get('/data',  async (req, res) => {
 const product = await redisClient.get('product');
 res.send(`<h1> Hello </h1> <h2> Here is the product from Redis: ${product} </h2>`);
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});