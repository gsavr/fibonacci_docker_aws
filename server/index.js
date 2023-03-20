const keys = require("./keys");

/* // Express App Setup */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

/* // Postgres Client Setup */
const { Pool } = require("pg");
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
});

pgClient.on("connect", (client) => {
  client
    .query("CREATE TABLE IF NOT EXISTS values (number INT)")
    .catch((err) => console.error(err));
});

/* // Redis Client Setup */
const redis = require("redis");
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  //if connection is lost, retry every second
  retry_strategy: () => 1000,
});
// each redis client needs to be either listening or publishing - so we make a duplicate
const redisPublisher = redisClient.duplicate();

/* // Express route handlers */
app.get("/", (req, res) => {
  res.send("Hi");
});

app.get("/values/all", async (req, res) => {
  const values = await pgClient.query("SELECT * from values");

  res.send(values.rows);
});

app.get("/values/current", async (req, res) => {
  //hgetall - means hash get all - and we will get all info from it
  redisClient.hgetall("values", (err, values) => {
    res.send(values);
  });
});

app.post("/values", async (req, res) => {
  const index = req.body.index;

  //fib recursive would take too long past 40
  if (parseInt(index) > 40) {
    return res.status(422).send("Index too high");
  }

  // set the index into the redis db, but no answer yet from worker
  redisClient.hset("values", index, "...");
  //send message to worker to wake it up and find value for index
  redisPublisher.publish("insert", index);
  // look at pg client and add index that was submitted - permanantly stored
  pgClient.query("INSERT INTO values(number) VALUES($1)", [index]);

  //response to show worker is on it
  setTimeout(() => {
    res.send({ working: true });
  }, 1000);
});

app.post("/reset", async (req, res) => {
  //delete all rown from seen indexes PG table
  // pgClient.query("TRUNCATE values");
  //delete all from redis table with ALL values seen
  redisClient.del("values");

  setTimeout(() => {
    res.send({ cleared: true });
  }, 3000);
});

app.listen(5000, (err) => {
  console.log("listening on port 5000");
});
