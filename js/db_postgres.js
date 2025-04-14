/**
 * @module js/postgres
 * @name Provider DB js/postgres
 * @description Módulo para la conexión y operaciones del Proveedor PostgreSQL.
 */

/**
 * @constant
 * @type {string}
 * @default
 */
const { Client } = require('pg');

/**
 * Establece una conexión a la base de datos PostgreSQL.
 *
 * @async
 * @function connect
 * @name connect
 * @param {object} config - Configuración de la conexión.
 * @returns {Promise<Client>} Objeto de cliente de PostgreSQL.
 */
async function connect(config) 
{
  const client = new Client(config);
  await client.connect();
  return client;
}

/**
 * Ejecuta una consulta SQL en la base de datos PostgreSQL.
 *
 * @async
 * @function query
 * @name query
 * @param {Client} client - Objeto de cliente de PostgreSQL.
 * @param {string} sql - Consulta SQL.
 * @returns {Promise<Array>} Filas resultantes de la consulta.
 */
async function query(client, sql) 
{
  const result = await client.query(sql);
  return result.rows;
}

/**
 * Cierra la conexión a la base de datos PostgreSQL.
 *
 * @async
 * @function close
 * @name close
 * @param {Client} client - Objeto de cliente de PostgreSQL.
 * @returns {Promise<void>}
 */
async function close(client) 
{
  await client.end();
}

module.exports = { connect, query, close };
