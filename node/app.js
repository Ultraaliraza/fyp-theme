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
var identifiers = db.ref("/Users")
app.use(cors())
app.use(bodyParser.json())
app.post('/register', function (req, res) {
    var newUser = identifiers.push();
    newUser.set(req.body);
    // to get data  
    res.jsonp({ id: 1, name: 'Ali' });
});
var identifiers1 = db.ref("/Posts")
app.use(cors())
app.use(bodyParser.json())
app.post('/home', function (req, res) {
    var newUser = identifiers1.push();
     newpost.set(req.body);
    // to get data  
    res.jsonp({ id: 2, name: 'Raza' });
});
app.post('/login', function (req, res) {
    let found = 0;
    identifiers.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            if (childData.email === req.body.email && childData.password === req.body.password) {
                found = 1;
            }
        });
        res.jsonp({ success: found });
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
});
app.listen(3000, function () {
    console.log('Server listening on port 3000')
});