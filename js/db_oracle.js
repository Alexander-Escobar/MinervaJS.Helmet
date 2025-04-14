/**
 * @module js/oracle
  * @name Provider DB js/oracle
 * @description Módulo para la conexión y operaciones de Oracle.
 */
 
 /**
 * @constant
 * @type {string}
 * @default
 */
const oracledb = require('oracledb');


/**
 * Establece una conexión a la base de datos Oracle.
 *
 * @async
 * @function connect
 * @param {object} config - Configuración de la conexión.
 * @returns {Promise<oracledb.Connection>} Objeto de conexión de Oracle.
 */
async function connect(config) {
  try {
    oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT; // Para obtener resultados como objetos

    const connection = await oracledb.getConnection({
      user: config.user,
      password: config.password,
      connectString: config.connectString, // Ejemplo: 'localhost/XE' o una cadena de conexión TNS
    });
    return connection;
  } catch (error) {
    console.error('Error al conectar a Oracle:', error);
    throw error;
  }
}

/**
 * Ejecuta una consulta SQL en la base de datos Oracle.
 *
 * @async
 * @function query
 * @param {oracledb.Connection} connection - Objeto de conexión de Oracle.
 * @param {string} sql - Consulta SQL.
 * @param {Array} [binds] - Parámetros para la consulta (bind variables).
 * @returns {Promise<Array>} Filas resultantes de la consulta.
 */
async function query(connection, sql, binds = []) {
  try {
    const result = await connection.execute(sql, binds);
    return result.rows;
  } catch (error) {
    console.error('Error al ejecutar la consulta Oracle:', error);
    throw error;
  }
}

/**
 * Cierra la conexión a la base de datos Oracle.
 *
 * @async
 * @function close
 * @param {oracledb.Connection} connection - Objeto de conexión de Oracle.
 * @returns {Promise<void>}
 */
async function close(connection) {
  try {
    await connection.close();
  } catch (error) {
    console.error('Error al cerrar la conexión Oracle:', error);
    throw error;
  }
}

module.exports = { connect, query, close };
