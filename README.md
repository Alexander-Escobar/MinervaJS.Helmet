# MinervaJS-Helmet
Modulo para la gestion de las conección a la base de datos, permite conectarse a varios tipos utilizando sobrecarga de metodos, tolera MySQL y Oracle Client  

Ejemplo: Partiendo de un proyecto en blanco recien creado  
`$ npm i minervajs-helmet  `

###Archivo: ./config/settings.js  
Adicionas una Entrada, por cada tipo y base de datos
```javascript
{
  'my_mysql':						// 'Perfil de Conexion'
  {
    type: 'mysql',
    host: 'sql3.freesqldatabase.com',	// 'localhost',
    port: 3306, 					// 'puerto',
    user: 'sql3772729', 			// 'usuario',
    password: 'esUA3qpGKD', 		// 'contraseña',
    database: 'sql3772729' 			// 'nombre_db'
  }
}
```

###Archivo: index.js

```javascript
var db = require('minervajs-helmet');
var config = require('./config/settings.js');	// Configuración de Conexión

async function main() {
  try {
    // Conexión a MySQL
    const mysqlConnection = await db.connect('my_mysql', config);
    const mysqlResult = await db.query('my_mysql', ' SELECT * FROM test ;', [], config); // Ejemplo con parámetros
    console.log('Resultados de MySQL:', mysqlResult);
    await db.close('my_mysql', config);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
```

###Salida de resultados
```javascript
Resultados de MySQL: [
  {
    id: 1,
    codigo: 'SV',
    descripcion: 'El Salvador',
    fecha: 2025-04-02T06:00:00.000Z
  },
  {
    id: 2,
    codigo: 'EU',
    descripcion: 'Estados Unidos',
    fecha: 2025-04-02T06:00:00.000Z
  }
]
```

En la instalacion, puedes hacer uso del archivo muestra que esta en *\node_modules\minervajs-helmet\config\settings.js*


