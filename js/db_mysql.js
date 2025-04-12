/**
 * @module 
 * @name db_mysql
 * @description Modulo gestor de la coneccion a la base de datos, MySQL, utiliza el cliente mysql2
 *
 *
var mysql = require('mysql2');
var settings = require('../js/settings');


exports.executeSQL = function (sql, callback)
{
    var con = new mysql.createConnection(settings.dbConfig);
    
    con.connect(function(err) 
	{
        if (err) 
        {
            callback(null, err);
            //throw err;
        }
        if (settings.servConfig.debug){console.log("Connected!");}
        con.query(sql, function (err, result) {
          if (err) 
          {
            callback(null, err);
            //throw err;
          }
		  if (settings.servConfig.debug){console.log("Sentencia Ejecutada:"+sql);}
          callback(result);
		  
		  con.end();
        });
    });
};

exports.executeSQLarray = function (sql, array, callback)
{
	var con = new mysql.createConnection(settings.dbConfig);
    
    con.connect(function(err) 
	{
        if (err) 
        {
            callback(null, err);
            //throw err;
        }
        if (settings.servConfig.debug){console.log("Connected!");}
        con.query(sql, array, function (err, result) {
          if (err) 
          {
            callback(null, err);
            //throw err;
          }
          if (settings.servConfig.debug){console.log("Sentencia Ejecutada:"+sql);}
          callback(result);
		  
		  con.end();
        });
    });
}
*/
const mysql = require('mysql2/promise'); // Usamos mysql2/promise para async/await

async function connect(config) {
  try {
    const connection = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      database: config.database,
    });
    return connection;
  } catch (error) {
    console.error('Error al conectar a MySQL:', error);
    throw error; // Re-lanzamos el error para que sea manejado por el llamador
  }
}

async function query(connection, sql, values = []) {
  try {
    const [rows, fields] = await connection.execute(sql, values);
    return rows;
  } catch (error) {
    console.error('Error al ejecutar la consulta MySQL:', error);
    throw error;
  }
}

async function close(connection) {
  try {
    await connection.end();
  } catch (error) {
    console.error('Error al cerrar la conexión MySQL:', error);
    throw error;
  }
}

module.exports = { connect, query, close };