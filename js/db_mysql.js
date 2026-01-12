/**
 * @module js/mysql
 * @name Provider DB js/mysql
 * @description Módulo proveedor MySQL para MinervaJS-Helmet.
 * Implementa operaciones estándar: query, execute y call.
 * 
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
    console.error('[MySQL][connect]', error.message);
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
 * @param {Array} [params] - Parámetros para la consulta.
 * @returns {Promise<Array>} Filas resultantes de la consulta.
 */
async function query(connection, sql, params = []) 
{
  try 
  {
    const [rows, fields] = await connection.execute(sql, params);
    return rows;
  } 
  catch (error) 
  {
    console.error('[MySQL][query]', error.message);
    throw error;
  }
}



/**
 * Ejecuta una sentencia de escritura (INSERT, UPDATE, DELETE, DDL).
 */
async function execute(connection, sql, params = []) 
{
  try {
    const [result] = await connection.execute(sql, params);

    return {
      rowsAffected: result.affectedRows,
      insertId: result.insertId || null
    };
  } 
  catch (error) 
  {
    console.error('[MySQL][execute]', error.message);
    throw error;
  }
}


/**
 * Ejecuta un procedimiento almacenado.
 *
 * Nota:
 * MySQL maneja OUT params mediante variables de sesión (@var).
 */
async function call(connection, procedureName, params = {}) {
  try {
    const keys = Object.keys(params);
    const values = [];

    const placeholders = keys.map(key => {
      if (params[key]?.out) {
        return `@${key}`;
      }
      values.push(params[key]);
      return '?';
    }).join(',');

    // 1️ - Ejecutar CALL
    const callSQL = `CALL ${procedureName}(${placeholders})`;
    const [resultSets] = await connection.query(callSQL, values);

    // 2️ - Recuperar OUT params
    const outParams = keys.filter(k => params[k]?.out);
    let out = {};

    if (outParams.length > 0) {
      const selectOut = `SELECT ${outParams.map(k => `@${k} AS ${k}`).join(',')}`;
      const [rows] = await connection.query(selectOut);
      out = rows[0];
    }

    return {
      resultSets,
      out
    };
  } catch (error) {
    console.error('[MySQL][call]', error.message);
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
    console.error('[MySQL][close]', error.message);
    throw error;
  }
}

module.exports = 
{
  connect,
  query,
  execute,
  call,
  close
};
