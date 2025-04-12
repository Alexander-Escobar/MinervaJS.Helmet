/**
 * 
 * @name MinervaJS-Helmet
 * @description Modulo gestor de la coneccion a la base de datos
 *
 */
const postgres = require('./js/db_postgres');
const mysql = require('./js/db_mysql');
const oracle = require('./js/db_oracle');
const config = require('./config/settings');

const connections = {};


/**
 * @function 
 * @name connect
 * @param {string} databaseName - Perfil de la base de datos
 * @returns {result} result/err - Devuelve un objeto con del tipo conexión
 * @description Toma la configuracion y realiza la coneccion a la base de datos
 */
async function connect(databaseName) 
{
  const dbConfig = config[databaseName];
  if (!dbConfig) {
    throw new Error(`Configuración de base de datos '${databaseName}' no encontrada.`);
  }

  if (connections[databaseName]) 
  {
    return connections[databaseName]; // Ya existe una conexión
  }

  switch (dbConfig.type) 
  {
    case 'postgres':
      connections[databaseName] = await postgres.connect(dbConfig);
      break;
    case 'mysql':
      connections[databaseName] = await mysql.connect(dbConfig);
      break;
    case 'oracle':
      connections[databaseName] = await oracle.connect(dbConfig);
      break;
    default:
      throw new Error(`Tipo de base de datos '${dbConfig.type}' no soportado.`);
  }

  return connections[databaseName];
}

/**
 * @function 
 * @name query
 * @param {string} databaseName - Perfil de la base de datos
 * @param {string} sql - Sentencia SQL a ejecutar
 * @returns {result} result/err - Devuelve un objeto con el set de datos o un objeto err con la respuesta del error
 * @description Ejecuta una sentencia SQL y devuelve un objeto en un set de datos
 */
async function query(databaseName, sql) 
{
  const connection = await connect(databaseName);
  const dbConfig = config[databaseName];

  switch (dbConfig.type) 
  {
    case 'postgres':
      return postgres.query(connection, sql);
    case 'mysql':
      return mysql.query(connection, sql);
    case 'oracle':
      return oracle.query(connection, sql);
    default:
      throw new Error(`Tipo de base de datos '${dbConfig.type}' no soportado para la operación 'query'.`);
  }
}

/**
 * @function 
 * @name close
 * @param {string} databaseName - Perfil de la base de datos
  * @returns NONE
 * @description Cierra la conexion del Perfil de la base de datos pasado como parametro.
 */
async function close(databaseName) 
{
  if (connections[databaseName]) 
  {
    const dbConfig = config[databaseName];
    switch (dbConfig.type) {
      case 'postgres':
        await postgres.close(connections[databaseName]);
        break;
      case 'mysql':
        await mysql.close(connections[databaseName]);
        break;
      case 'oracle':
        await oracle.close(connections[databaseName]);
        break;
    }
    delete connections[databaseName];
  }
}



/**
 * @function 
 * @name executeSQL
 * @param {string} sql - Sentencia SQL a ejecutar
 * @param {Promise<callback>} callback - objeto, para retornar la promesa
 * @returns {result} result/err - Devuelve un objeto con el set de datos o un objeto err con la respuesta del error
 * @description Ejecuta una sentencia SQL y devuelve un objeto en un set de datos
 */
 

module.exports = 
{
  connect,
  query,
  close,
  // ... otras funciones comunes
};
