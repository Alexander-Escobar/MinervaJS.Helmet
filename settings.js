/**
 * @module 
 * @name db
 * @description Modulo gestor de la coneccion a la base de datos
 * dbConfig	Configuracion de la Base de Datos
 */
exports.httpMsgFormat = 'HTML';
exports.Title = "DB Smarts Docs";
exports.Rights_Reserved = "2023-2025 &copy; A&C Consultoría Informática";

exports.dbConfig = 
{
	// mysql
    // host: "localhost o IP",
      user: "User",
      password: "Password01",
    // database: "DBSisConta"
      connectString : "(DESCRIPTION=(ADDRESS=(PROTOCOL=tcp)(HOST=namehostoip)(PORT=port))(CONNECT_DATA=(SERVICE_NAME=servicename)))"
};

