var express = require('express');
var app = express();
var cors = require('cors')
var bodyParser = require('body-parser')
var admin = require("firebase-admin");
var serviceAccount = require("./admin.json");
var sgMail = require('@sendgrid/mail');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://helpinghand-90a6a.firebaseio.com"
});
var db = admin.database();
let posts = db.ref("/Posts");
let users = db.ref("/Users")

app.use(cors())
app.use(bodyParser.json())
app.post('/register', function (req, res) {
    var newUser = users.push();
    newUser.set(req.body);


    res.jsonp({ id: 1, name: 'Ali' });

    sgMail.setApiKey('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'); // send grid key 

    const msg = {
        to: req.body.email,
        from: 'ar690780@gmail.com',
        subject: 'Your Account is SuccessFully Registered',
        text: 'Eyaashi Maar',
        html: '<strong>Mubarak Ho Madarchod</strong>',
    };
    sgMail.send(msg);


});
app.post('/login', function (req, res) {
    let found = 0;
    users.once("value", function (snapshot) {
        users.once("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                if (childData.email === req.body.email && childData.password === req.body.password) {
                    console.log('******************************');
                    console.log(childSnapshot.key);
                    console.log('******************************');
                    var data = childSnapshot.val();
                    let key = childSnapshot.key;
                    if (data.email === req.body.email && data.password === req.body.password) {
                        found = 1;
                        delete data.password;
                        temp = data;
                        temp.key = key;
                    }
                    console.log(temp);
                }
                res.jsonp({ success: found });
            });
            if (found === 1) {
                res.jsonp({ success: 1, data: temp });
            } else {
                res.jsonp({ success: 0, data: {} });
            }
            let key;
        });
    });
});
app.post('/home', function (req, res) {
    let post = posts.push();
    post.set(req.body);
    key = post.key;

    res.json({ success: 1, data: post });

    console.log('&&&&&&&');
    console.log(post);
    users.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            console.log('******************************');
            console.log(childSnapshot.key);
            console.log('******************************');
            var data = childSnapshot.val();
            let key = childSnapshot.key;
            if (data.email === req.body.email && data.password === req.body.password) {
                found = 1;
                delete data.password;

                temp = data;
                temp.key = key;
            }
            console.log(temp);
        });
        if (found === 1) {
            res.jsonp({ success: 1, data: temp });
        } else {
            res.jsonp({ success: 0, data: {} });
        }
    }, function (errorObject) {
        console.log("The read failed:", errorObject.code);
    });
});

//send grid












//App Listening

app.listen(3000, function () {
    console.log('Server listening on port 3000')
});

