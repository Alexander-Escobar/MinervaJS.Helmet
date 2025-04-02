# MinervaJS.Helmet
Modulo para la gestion de las conección a la base de datos, permite conectarse a varios tipos utilizando sobrecarga de metodos, tolera MySQL y Oracle Client

Ejemplo: Partiendo de un proyecto en blanco recien creado  
> npm i minervajs-helmet  

Archivo: index.js  

var db = require('minervajs-helmet');  

var l_sql = " SELECT P.id, " +  
					" P.titulo, " +  
					" P.subtitulo, " +  
					" DATE_FORMAT(P.publicado, '%M %d, %Y') as publicado, " +  
					" P.autor, " +  
					" P.introduccion, " +  
					" P.tags, " +  
					" P.url_imagen " +  
				" FROM publicacion P " +  
				" ORDER BY P.publicado DESC " +  
				" LIMIT 10 ";  

db.executeSQL(l_sql, function(a_data, err)  
{
	if (err)  
	{console.log(err);}  
	else  
	{console.log(a_data);}  
});  

