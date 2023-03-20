const keys = require("./keys");
const redis = require("redis");

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  //if connection is lost, retry every second
  retry_strategy: () => 1000,
});
//duplicate of client
const sub = redisClient.duplicate();

//using recursive on purpose to make application go slower
function fib(index) {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

sub.on("message", (channel, message) => {
  redisClient.hset("values", message, fib(parseInt(message)));
});
sub.subscribe("insert");
