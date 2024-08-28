var oracledb = require('oracledb');
var settings = require('../js/settings');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

exports.executeSQL = function (sql, callback)
{
    let con;
	
	con = oracledb.getConnection(settings.dbConfig);
	
	console.log(sql);
	result = con.execute(sql);
	console.log(result);
	
	con.close();
		
	callback(result);
  
};


exports.executeSQLXX = function (sql, callback)
{
    var con = new oracledb.getConnection(settings.dbConfig);
    
    //con.connect(function(err) 
	//{
    //    if (err) 
    //    {
    //        callback(null, err);
    //        //throw err;
    //    }
        if (settings.servConfig.debug){console.log("Connected!");}
        con.execute(sql, function (err, result) {
          if (err) 
          {
            callback(null, err);
            //throw err;
          }
		  if (settings.servConfig.debug){console.log("Sentencia Ejecutada:"+sql);}
          callback(result);
		  
		  con.close();
        });
    //});
};