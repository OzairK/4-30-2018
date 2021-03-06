var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var PORT = 3000;

app.use(express.static("public"));

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "quotes_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Express and MySQL code should go here.
app.get("/", function(req, res){
  connection.query("SELECT * from quotes", function(err,data){
    if(err){
      return res.status(500).end();
    }
    res.render("index", {quotes:data});
  });
});

app.get("/:id", function(req,res){
  connection.query("SELECT * FROM quotes WHERE id = ?", [req.params.id], function(err,data){
    if(err){
      return res.status(500).end();
    }
    res.render("single-quote", data[0]); // passing an object
  })
})



app.post("/api/quotes"), function(req, res){
  connection.query("INSERT into quotes (author,quote) values (?,?)", [req.body.author, req.body.quote], function(err,result){
    if(err){
      return res.status(500).end();
    }
    res.json({id: result.insertId});
  })
}

app.delete("/api/quotes/:id", function(req,res){
  connection.query("delete from quotes where id = ?", [req.params.id], function(err,result){
    if(err){
      return  res.status(500).end();
    }
    res.status(200).end();
  })
})

app.put("/api/quotes/:id" ,function(req,res){
  connection.query("update quotes set author =?, quote =? where id =?", [req.body.author, req.body.quote, req.params.id], function(err, result){
    if(err){
      return  res.status(500).end();
    }
    res.status(200).end(); 
  });
})

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
