/*
	Configuracion y Parametrizacion general de la Aplicacion & Sitio Web
	
	Listado:
		dbConfig	Configuracion de la Base de Datos
		servConfig	Configuracion del Servidor
		httpConfig	Configuracion de las Peticiones URL del Protocolo HTTP
		Google		Configuracion para Google Ads
		Image		Configuracion General para las imagenes
		pagConfig	Configuracion de la Paginacion de los Mantenimientos
*/

exports.httpMsgFormat = 'HTML';
exports.Title = "DB Smarts Docs";
exports.Rights_Reserved = "2023 &copy; A&C Consultoría Informática";

exports.dbConfig = 
{
	// mysql
    // host: "localhost",
      user: "Owlet",
      password: "Password01",
    // database: "DBSisConta"
      connectString : "(DESCRIPTION=(ADDRESS=(PROTOCOL=tcp)(HOST=namehostoip)(PORT=port))(CONNECT_DATA=(SERVICE_NAME=servicename)))"
};

exports.servConfig = 
{
	hostname: "",	// http://localhost:9000
	webPort: 9000,	// 80
	debug: true
};
