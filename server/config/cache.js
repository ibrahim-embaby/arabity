const mongoose = require("mongoose");
const { createClient } = require("redis");
const util = require("util");

const client = createClient({
  legacyMode: true,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: 16574,
  },
});

client.connect().catch(console.error);

client.get = util.promisify(client.get);
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function () {
  this.useCache = true;
  return this;
};

mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
    })
  );

  try {
    // see if we have a value for 'key' in redis
    const cacheValue = await client.get(key);

    // if we do, return that
    if (cacheValue) {
      const doc = JSON.parse(cacheValue);
      const value = Array.isArray(doc)
        ? doc.map((d) => new this.model(d))
        : new this.model(doc);
      return value;
    }

    // otherwise, issue the query and store the result in redis
    const result = await exec.apply(this, arguments);
    client.set(key, JSON.stringify(result));

    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = client;
