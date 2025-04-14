/**
 * @module lib/mariadb
 * @description Módulo para la conexión y operaciones de MariaDB.
 */
 
 /**
 * @constant
 * @type {string}
 * @default
 */
const mariadb = require('mariadb/promise');

/**
 * Establece una conexión a la base de datos MariaDB.
 *
 * @async
 * @function connect
 * @param {object} config - Configuración de la conexión.
 * @returns {Promise<mariadb.Connection>} Objeto de conexión de MariaDB.
 */
async function connect(config) {
  try {
    const connection = await mariadb.createConnection(config);
    return connection;
  } catch (error) {
    console.error('Error al conectar a MariaDB:', error);
    throw error;
  }
}

/**
 * Ejecuta una consulta SQL en la base de datos MariaDB.
 *
 * @async
 * @function query
 * @param {mariadb.Connection} connection - Objeto de conexión de MariaDB.
 * @param {string} sql - Consulta SQL.
 * @param {Array} [values] - Parámetros para la consulta.
 * @returns {Promise<Array>} Filas resultantes de la consulta.
 */
async function query(connection, sql, values = []) {
  try {
    const rows = await connection.query(sql, values);
    return rows;
  } catch (error) {
    console.error('Error al ejecutar la consulta MariaDB:', error);
    throw error;
  }
}

/**
 * Cierra la conexión a la base de datos MariaDB.
 *
 * @async
 * @function close
 * @param {mariadb.Connection} connection - Objeto de conexión de MariaDB.
 * @returns {Promise<void>}
 */
async function close(connection) {
  try {
    await connection.end();
  } catch (error) {
    console.error('Error al cerrar la conexión MariaDB:', error);
    throw error;
  }
}

module.exports = { connect, query, close };

