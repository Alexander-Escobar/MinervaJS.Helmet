# MinervaJS-Helmet

## 🛡️ Descripción

**MinervaJS-Helmet** es el módulo encargado de la **gestión unificada de conexiones y operaciones de base de datos** dentro del ecosistema **MinervaJS**.

Su función principal es abstraer el motor de base de datos (MySQL, PostgreSQL, Oracle, etc.) y exponer una **API homogénea**, permitiendo que el resto del sistema funcione de forma **JSON-driven**, desacoplada y extensible.

---

## 🎯 Objetivos

* Centralizar la gestión de conexiones a bases de datos
* Soportar múltiples motores de forma transparente
* Proveer una API común para:

  * Consultas de lectura (SELECT)
  * Operaciones de escritura (INSERT / UPDATE / DELETE / DDL)
  * Procedimientos almacenados
* Facilitar la construcción de backends genéricos y dinámicos

---

## 🧱 Arquitectura

```
MinervaJS
 └── Helmet
     ├── db_mysql.js
     ├── db_postgres.js
     ├── db_oracle.js
     └── connections (cache interno)
```

Helmet actúa como un **dispatcher**, delegando la ejecución a proveedores específicos que implementan un contrato estándar.

---

## 🔌 Contrato estándar de proveedores

Cada proveedor de base de datos debe implementar las siguientes funciones:

```js
connect(config)
query(connection, sql, params = [])
execute(connection, sql, params = [])
call(connection, procedureName, params = {})
close(connection)
closeAll(config)
```

Este contrato garantiza que Helmet pueda operar sin conocer los detalles del motor subyacente.

---

## 📦 Instalación

```bash
npm install @minervajs/helmet
```
⚠️ Previous name: minervajs-helmet (deprecated)
> *(o incluir el módulo directamente dentro del proyecto MinervaJS)*

---

## ⚙️ Configuración de base de datos

Ejemplo de archivo `database.json`:

```json
{
  "mysqlMain": {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "user": "user",
    "password": "password",
    "database": "minerva"
  }
}
```

En la instalacion, puedes hacer uso del archivo muestra que esta en *\node_modules\minervajs-helmet\example\settings.js*

---

## 🚀 Uso básico

```js
const helmet = require('./helmet');
const config = require('./database.json');
```

---

### 🔍 Consultas de lectura (SELECT)

```js
const rows = await helmet.query(
  'mysqlMain',
  'SELECT * FROM pais WHERE iso3 = ?',
  ['SLV'],
  config
);
```

---

### ✏️ Operaciones de escritura

```js
const result = await helmet.execute(
  'mysqlMain',
  'UPDATE pais SET nombre = ? WHERE iso3 = ?',
  ['El Salvador', 'SLV'],
  config
);

console.log(result.rowsAffected);
```

---

### 🧠 Procedimientos almacenados

```js
const result = await helmet.call(
  'mysqlMain',
  'sp_pais_insert',
  {
    p_iso3: 'SLV',
    p_nombre: 'El Salvador',
    p_leyenda: 'Centroamérica',
    p_iso2: 'SV',
    p_existe: { out: true }
  },
  config
);
```

**Resultado estándar:**

```js
{
  resultSets: [...],
  out: {
    p_existe: 0
  }
}
```

---

## 🔐 Gestión de conexiones

* Una conexión por perfil de base de datos
* Reutilización automática
* Cache interno
* Cierre explícito

```js
await helmet.close('mysqlMain', config);
await helmet.closeAll(config);
```

---

## ⚠️ Manejo de errores

Helmet agrega contexto a los errores:

```
[Helmet][mysql][execute] Duplicate entry
```

Esto facilita el logging y el diagnóstico.

---

## 🧩 Integración JSON-driven (MinervaJS)

Helmet está diseñado para ejecutarse a partir de manifiestos JSON:

```json
{
  "database": "mysqlMain",
  "procedure": "sp_pais_insert",
  "params": {
    "p_iso3": "$body.iso3",
    "p_nombre": "$body.nombre",
    "p_existe": { "out": true }
  }
}
```

La API ejecuta la operación sin conocer SQL ni lógica de negocio.

---

## ✅ Buenas prácticas

* Usar `query()` exclusivamente para SELECT
* Usar `execute()` para DML / DDL
* Encapsular lógica compleja en Stored Procedures
* Cerrar conexiones en shutdown de la aplicación
* Mantener la configuración desacoplada


---

## 🔮 Evolución futura

* Pooling de conexiones
* Transacciones (`begin / commit / rollback`)
* Multi-tenant
* Logging estructurado
* Métricas
* Soporte para nuevos motores

---

## 📌 Conclusión

**MinervaJS-Helmet** es el pilar de acceso a datos de MinervaJS.

Su diseño modular, homogéneo y desacoplado permite construir aplicaciones dinámicas, escalables y mantenibles, donde la lógica de negocio puede definirse de forma declarativa y evolucionar sin reescribir el backend.





