/**
 * 
 * @name MinervaJS-Helmet
 * @module MinervaJS-Helmet
 * @description Gestor unificado de conexiones y ejecución de operaciones en múltiples motores de bases de datos.
 */

const postgres = require('../js/db_postgres');
const mysql = require('../js/db_mysql');
const oracle = require('../js/db_oracle');
// const mongodb = require('./lib/mongodb');
// const mariadb = require('./lib/mariadb');

const connections = {};

/**
 * Establece una conexión a la base de datos especificada.
 *
 * @async
 * @function connect
 * @name connect
 * @param {string} databaseName - Perfil de la base de datos  (clave de configuración)
 * @returns {Promise<object>} Objeto de conexión.
 * @throws {Error} Si la configuración no se encuentra o el tipo de base de datos no es soportado.
 * @description Toma la configuracion y Establece una conexión a la base de datos especificada
 */
async function connect(databaseName, config) 
{
	const dbConfig = config[databaseName];

	if (!dbConfig) 
	{ throw new Error(`Configuración de base de datos '${databaseName}' no encontrada.`); }

	// Ya existe una conexión 
	if (connections[databaseName]) 
	{ return connections[databaseName]; }

	switch (dbConfig.type) 
	{
		case 'postgres':
			connections[databaseName] = await postgres.connect(dbConfig);
			break;
		case 'mysql':
			connections[databaseName] = await mysql.connect(dbConfig);
			break;
		// case 'mariadb':
		//   connections[databaseName] = await mariadb.connect(dbConfig);
		//   break;
		case 'oracle':
			connections[databaseName] = await oracle.connect(dbConfig);
			break;
		// case 'mongodb':
		//  connections[databaseName] = await mongodb.connect(dbConfig);
		//  break;
		default:
			throw new Error(`Tipo de base de datos '${dbConfig.type}' no soportado.`);
	}

	return connections[databaseName];
}


/**
 * Dispatcher interno para query / execute / call
 */
async function run(databaseName, target, params, config, mode) 
{
  const connection = await connect(databaseName, config);
  const dbConfig = config[databaseName];

  try {
    switch (dbConfig.type) {
      case 'postgres':
        return await postgres[mode](connection, target, params);

      case 'mysql':
        return await mysql[mode](connection, target, params);

      case 'oracle':
        return await oracle[mode](connection, target, params);

      default:
        throw new Error(`Tipo de base de datos '${dbConfig.type}' no soportado.`);
    }
  } 
  catch (err) 
  {
    throw new Error(`[Helmet][${dbConfig.type}][${mode}] ${err.message}`);
  }
}



/**
 * Ejecuta una consulta en la base de datos especificada.
 *
 * @async
 * @function query
 * @name query
 * @param {string} databaseName - Perfil de la base de datos  (clave de configuración)
 * @param {string} sql - Consulta SQL, Sentencia SQL a ejecutar
 * @param {Array} [binds] - Parámetros para la consulta (bind variables).
 * @returns {Promise<Array>} Filas resultantes de la consulta.
 * @throws {Error} Si el tipo de base de datos no es soportado para la operación 'query'.
 * @description Ejecuta una sentencia SQL en la base de datos especificada y devuelve un objeto en un set de datos
 */
// async function query(databaseName, sql, values = [], config) 
// {
  // const connection = await connect(databaseName, config);
  // const dbConfig = config[databaseName];

  // switch (dbConfig.type) 
  // {
    // case 'postgres':
      // return postgres.query(connection, sql);
    // case 'mysql':
      // return mysql.query(connection, sql, values);
    // // case 'mariadb': // agregamos el caso MariaDB
    // //   return mariadb.query(connection, sql, binds);
    // //   break;
    // case 'oracle':
      // return oracle.query(connection, sql);
    // // case 'mongodb':
    // //  // Adaptar la consulta SQL a la sintaxis de MongoDB
    // //  console.warn("La función 'query' no es directamente aplicable a MongoDB con sintaxis SQL.");
    // //  return null; // O lanzar un error
    // default:
      // throw new Error(`Tipo de base de datos '${dbConfig.type}' no soportado para la operación 'query'.`);
  // }
// }

/**
 * Ejecuta consultas de lectura (SELECT).
 */
async function query(databaseName, sql, params = [], config) 
{
  return run(databaseName, sql, params, config, 'query');
}

/**
 * Ejecuta sentencias de escritura (INSERT, UPDATE, DELETE, DDL).
 */
async function execute(databaseName, sql, params = [], config) 
{
  return run(databaseName, sql, params, config, 'execute');
}


/**
 * Ejecuta procedimientos almacenados o funciones.
 */
async function call(databaseName, procedureName, params = {}, config) 
{
  return run(databaseName, procedureName, params, config, 'call');
}

/**
 * Cierra la conexión a la base de datos especificada.
 *
 * @async
 * @function close
 * @name close
 * @param {string} databaseName - Perfil de la base de datos (clave de configuración).
 * @returns {Promise<void>}
 * @description Cierra la conexion del Perfil de la base de datos especificada.
 */
async function close(databaseName, config) 
{
  if (!connections[databaseName]) return;
  
  const dbConfig = config[databaseName];
  switch (dbConfig.type) {
  case 'postgres':
	await postgres.close(connections[databaseName]);
	break;
  case 'mysql':
	await mysql.close(connections[databaseName]);
	break;
//  case 'mariadb': // agregamos el caso MariaDB
//    await mariadb.close(connections[databaseName]);
//    break;
  case 'oracle':
	await oracle.close(connections[databaseName]);
	break;
//  case 'mongodb':
//    await mongodb.close(connections[databaseName]);
//    break;
  }
    delete connections[databaseName];

}



/**
 * @function 
 * @name execute
 * @param {string} sql - Sentencia SQL a ejecutar
 * @param {Promise<callback>} callback - objeto, para retornar la promesa
 * @returns {result} result/err - Devuelve un objeto con el set de datos o un objeto err con la respuesta del error
 * @description Ejecuta una sentencia SQL y devuelve un objeto en un set de datos
 */
// async function execute(databaseName, sql, values = [], config) 
// {
	// const connection = await connect(databaseName, config);
	// const dbConfig = config[databaseName];
	
	// switch (dbConfig.type) 
	// {
		// case 'postgres':
			// return postgres.query(connection, sql);
		// case 'mysql':
			// return mysql.query(connection, sql, values);
	// // case 'mariadb': // agregamos el caso MariaDB
	// //   return mariadb.query(connection, sql, binds);
	// //   break;
		// case 'oracle':
			// return oracle.query(connection, sql);
	// // case 'mongodb':
	// //  // Adaptar la consulta SQL a la sintaxis de MongoDB
	// //  console.warn("La función 'query' no es directamente aplicable a MongoDB con sintaxis SQL.");
	// //  return null; // O lanzar un error
		// default:
			// throw new Error(`Tipo de base de datos '${dbConfig.type}' no soportado para la operación 'query'.`);
	// }
// }

/**
 * Cierra todas las conexiones activas.
 */
async function closeAll(config) 
{
  for (const dbName of Object.keys(connections)) 
  { await close(dbName, config); }
}

module.exports = 
{
  connect,
  query,
  execute,
  call,
  close,
  closeAll
  // ... otras funciones comunes
};
