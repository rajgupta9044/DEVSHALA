const { createClient } =  require('redis');

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_CONNECT_STRING,
    socket: {
        host: 'redis-15281.crce217.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 15281
    }
});

module.exports =redisClient;