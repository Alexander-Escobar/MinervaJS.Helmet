/**
 * @module 
 * @name db
 * @description Modulo gestor de la coneccion a la base de datos
 *
 */

var mysql = require('mysql');
var settings = require('../settings');

/**
 * @function 
 * @name executeSQL
 * @param {string} sql - Sentencia SQL a ejecutar
 * @param {callback} callback - objeto, para retornar la promesa
 * @returns {result} result/err - Devuelve un objeto con el set de datos o un objeto err con la respuesta del error
 * @description Ejecuta una sentencia SQL y devuelve un objeto en un set de datos
 */
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

/**
 * @function 
 * @name executeSQLarray
 * @param {string} sql - Sentencia SQL a ejecutar
 * @param {callback} callback - objeto, para retornar la promesa
 * @returns {result} result/err - Devuelve un objeto con el set de datos o un objeto err con la respuesta del error
 * @description Ejecuta una sentencia SQL, basado en una serie de argumentos y devuelve un objeto en un set de datos
 */
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