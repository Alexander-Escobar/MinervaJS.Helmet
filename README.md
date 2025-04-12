# MinervaJS.Helmet
Modulo para la gestion de las conección a la base de datos, permite conectarse a varios tipos utilizando sobrecarga de metodos, tolera MySQL y Oracle Client  

Ejemplo: Partiendo de un proyecto en blanco recien creado  
> npm i minervajs-helmet  

Archivo: index.js  

var db = require('minervajs-helmet');  

var l_sql = " SELECT P.id, " +  
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;" P.titulo, " +  
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;" P.subtitulo, " +  
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;" DATE_FORMAT(P.publicado, '%M %d, %Y') as publicado, " +  
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;" P.autor, " +  
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;" P.introduccion, " +  
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;" P.tags, " +  
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;" P.url_imagen " +  
&nbsp; &nbsp; &nbsp;" FROM publicacion P " +  
&nbsp; &nbsp; &nbsp;" ORDER BY P.publicado DESC " +  
&nbsp; &nbsp; &nbsp;" LIMIT 10 ";  

db.executeSQL(l_sql, function(a_data, err)  
{  
&nbsp; &nbsp; &nbsp; if (err)  
&nbsp; &nbsp; &nbsp; {console.log(err);}  
&nbsp; &nbsp; &nbsp; else  
&nbsp; &nbsp; &nbsp; {console.log(a_data);}  
});  

