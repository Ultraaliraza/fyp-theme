var express = require('express');
var app = express();
var cors = require('cors')
var bodyParser = require('body-parser')
var admin = require("firebase-admin");

var serviceAccount = require("./admin.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://helpinghand-90a6a.firebaseio.com"
});
var db = admin.database();
var identifiers = db.ref("/Posts")
app.use(cors())
app.use(bodyParser.json())
app.post('/home', function (req, res) {
    var newUser = identifiers.push();
    newUser.set(req.body);
    // to get data  
    res.jsonp({ id: 2, name: 'Raza' });
});

app.listen(5000, function () {
    console.log('Server listening on port 5000')
});