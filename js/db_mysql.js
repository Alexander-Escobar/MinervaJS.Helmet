/**
 * @module js/mysql
 * @name Provider DB js/mysql
 * @description Módulo para la conexión y operaciones del Proveedor MySQL.
 */
 
 /**
 * @constant
 * @type {string}
 * @default
 */
const mysql = require('mysql2/promise'); // Usamos mysql2/promise para async/await

/**
 * Establece una conexión a la base de datos MySQL.
 *
 * @async
 * @function connect
 * @param {object} config - Configuración de la conexión.
 * @returns {Promise<mysql.Connection>} Objeto de conexión de MySQL.
 */
async function connect(config) 
{
  try 
  {
    const connection = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      database: config.database,
    });
    return connection;
  } 
  catch (error) 
  {
    console.error('Error al conectar a MySQL:', error);
    throw error; // Re-lanzamos el error para que sea manejado por el llamador
  }
}

/**
 * Ejecuta una consulta SQL en la base de datos MySQL.
 *
 * @async
 * @function query
 * @param {mysql.Connection} connection - Objeto de conexión de MySQL.
 * @param {string} sql - Consulta SQL.
 * @param {Array} [values] - Parámetros para la consulta.
 * @returns {Promise<Array>} Filas resultantes de la consulta.
 */
async function query(connection, sql, values = []) 
{
  try 
  {
    const [rows, fields] = await connection.execute(sql, values);
    return rows;
  } 
  catch (error) 
  {
    console.error('Error al ejecutar la consulta MySQL:', error);
    throw error;
  }
}

/**
 * Cierra la conexión a la base de datos MySQL.
 *
 * @async
 * @function close
 * @param {mysql.Connection} connection - Objeto de conexión de MySQL.
 * @returns {Promise<void>}
 */
async function close(connection) 
{
  try 
  { await connection.end(); }
  catch (error) 
  {
    console.error('Error al cerrar la conexión MySQL:', error);
    throw error;
  }
}

module.exports = { connect, query, close };
