const { MongoClient } = require('mongodb');

/**
 * @module lib/mongodb
 * @description Módulo para la conexión y operaciones de MongoDB. Comando: npm install mongodb
 */

/**
 * Establece una conexión a la base de datos MongoDB.
 *
 * @async
 * @function connect
 * @param {object} config - Configuración de la conexión.
 * @returns {Promise<MongoClient>} Objeto de cliente de MongoDB.
 */
async function connect(config) {
  try {
    const client = new MongoClient(config.url);
    await client.connect();
    return client;
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    throw error;
  }
}


// query
// logica


/**
 * Cierra la conexión a la base de datos MongoDB.
 *
 * @async
 * @function close
 * @param {MongoClient} client - Objeto de cliente de MongoDB.
 * @returns {Promise<void>}
 */
async function close(client) {
  try {
    await client.close();
  } catch (error) {
    console.error('Error al cerrar la conexión MongoDB:', error);
    throw error;
  }
}

module.exports = { connect, close };
