const { Client } = require('pg');

async function connect(config) 
{
  const client = new Client(config);
  await client.connect();
  return client;
}

async function query(client, sql) 
{
  const result = await client.query(sql);
  return result.rows;
}

async function close(client) 
{
  await client.end();
}

module.exports = { connect, query, close };
