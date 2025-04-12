const oracledb = require('oracledb');

async function connect(config) {
  try {
    oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT; // Para obtener resultados como objetos

    const connection = await oracledb.getConnection({
      user: config.user,
      password: config.password,
      connectString: config.connectString, // Ejemplo: 'localhost/XE' o una cadena de conexión TNS
    });
    return connection;
  } catch (error) {
    console.error('Error al conectar a Oracle:', error);
    throw error;
  }
}

async function query(connection, sql, binds = []) {
  try {
    const result = await connection.execute(sql, binds);
    return result.rows;
  } catch (error) {
    console.error('Error al ejecutar la consulta Oracle:', error);
    throw error;
  }
}

async function close(connection) {
  try {
    await connection.close();
  } catch (error) {
    console.error('Error al cerrar la conexión Oracle:', error);
    throw error;
  }
}

module.exports = { connect, query, close };
