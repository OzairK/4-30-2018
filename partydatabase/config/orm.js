var connection = require("./connection.js");

var orm = {
    showSelection: function(selectThis, thisTable){
        connection.query("select ?? From ??", [selectThis, thisTable], function(err,data){
            if(err) throw err;
            console.log(data);
        });
    },
    selectWhere: function(thisTable, thisCol, value){
        connection.query("Select * from ?? where ?? = ?", [thisTable,thisCol,value], function(err, data){
            console.log(data);
        })
    },

    // join: function(selectThis, tblOne, tblTwo, onTblOneCol, onTblTwoCol){
    //     var query= "SELECT ?? FROM ?? AS tOne";
    //     query += " LEFT JOIN ?? AS tTwo";
    //     query += " ON tOne.?? = tTwo.??";       
    //      connection.query(query, [selectThis,tblOne,onTblOneCol,onTblTwoCol],function(err,data){
    //         if(err) throw err
    //         console.log(result);
    //     })
    // }

    leftJoin: function(whatToSelect, tableOne, tableTwo, onTableOneCol, onTableTwoCol) {
        var queryString = "SELECT ?? FROM ?? AS tOne";
        queryString += " LEFT JOIN ?? AS tTwo";
        queryString += " ON tOne.?? = tTwo.??";
    
        //EXAMPLE: SELECT client_name, party_name FROM clients as tOne
        // LEFT JOIN parties as tTwo ON tOne.id = tTwo.client_id
        console.log(queryString);
    
        connection.query(queryString, [whatToSelect, tableOne, tableTwo, onTableOneCol, onTableTwoCol], function(err, result) {
          if (err) throw err;
          console.log(result);
        });
    }
}

module.exports = orm;