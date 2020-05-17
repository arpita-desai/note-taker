
var path = require("path");
var uniqid = require("uniqid");
var fs = require("fs");

module.exports = function(app){

    app.get("/api/notes", function(req, res) {
       res.sendFile(path.join(__dirname, "../db/db.json"));
    });

    app.post("/api/notes", function(req, res) {
        var postData = req.body;
        req.body.id = uniqid();

        fs.readFile(path.join(__dirname, "../db/db.json"), function(err, data){
            var json = JSON.parse(data);

            json.push(postData);

            fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(json), function(err){
                if(err) throw err;

                console.log("Note Added");
            });
        });
        res.send("Database File Modified");
    });

    app.delete("/api/notes/:id", function(req, res) {
        fs.readFile(path.join(__dirname, "../db/db.json"), function(err, data){
            var json = JSON.parse(data);

            var newJson = json.filter(function(item){
                return item.id !== req.params.id;
            });

            fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(newJson), function(err){
                if(err) throw err;

                console.log("Note Deleted from Database File");
            });
            res.send(`${req.params.id} deleted`);
        });
    });    
};