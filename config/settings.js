/**
 * @module 
 * @name settings
 * @description Modulo gestor de la coneccion a la base de datos
 * Configuracion de la Base de Datos
 *
 * Se incluye un ejemplo de uso, segun el tipo de base de datos
 */
exports.httpMsgFormat = 'HTML';
exports.Title = "MinervaJS - Helmet";
exports.Rights_Reserved = "2023-2025 &copy; A&C Consultoría Informática";

module.exports = {
/*
 * 'mi_postgres': 
 * {
 *   type: 'postgres',
 *   host: 'localhost',
 *   port: 5432,
 *   user: 'usuario',
 *   password: 'contraseña',
 *   database: 'nombre_db'
 * },
  */
  'my_mysql': 
  {
    type: 'mysql',
    host: 'sql3.freesqldatabase.com'	// 'localhost',
    port: 3306,							//
    user: 'sql3772729'					// 'usuario',
    password: 'esUA3qpGKD'				// 'contraseña',
    database: 'sql3772729'				// 'nombre_db'
  },
  'my_oracle':  {
    type: 'oracle',
    host: 'localhost o IP'
    port: 5432,
    user: 'usuario',
    password: 'contraseña',
    database: 'nombre_db',
 	connectString : '(DESCRIPTION=(ADDRESS=(PROTOCOL=tcp)(HOST=namehostoip)(PORT=port))(CONNECT_DATA=(SERVICE_NAME=servicename)))'
  },

};
