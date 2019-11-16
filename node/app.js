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
    sgMail.setApiKey('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');
    const msg = {
        to: req.body.email,
        from: 'ar690780@gmail.com',
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg);
    res.jsonp({ id: 1, name: 'Ali' });
});

let key;
app.post('/home', function (req, res) {
    let post = posts.push();
    post.set(req.body);
    key = post.key;

    res.json({ success: 1, data: post });
});

app.post('/login', function (req, res) {
    let found = 0;
    users.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {

            var childData = childSnapshot.val();
            if (childData.email === req.body.email && childData.password === req.body.password) {
                var data = childSnapshot.val();

                let key = childSnapshot.key;
                found = 1;
                delete data.password;
                temp = data;
                temp.key = key;
            }
        });
        if (found === 1) {

            res.jsonp({ success: 1, data: temp });
        } else {
            res.jsonp({ success: 0, data: {} });
        }
    });
});

//   Forget Password

app.post('/forgetpassword', function (req, res) {
    let found = 0;
    key = '';
    user = {};
    users.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            if (childData.email === req.body.name) {
                key = childSnapshot.key;
                user = childData;
                found = 1;
            }
        });
        if (found === 1) {
            console.log('jkjhkjk');
            const randomnumber = parseInt(Math.random() * 1000000000, 10);
            sgMail.setApiKey('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');
            const userToUpdate = db.ref("/Users/" + key);
            user.password = String(randomnumber);

            userToUpdate.set(user);
            const msg = {
                to: req.body.name,
                from: 'ar690780@gmail.com',
                subject: 'Password Reset Email',
                html: '<H2>Use this Password for Login</H2><br>' + randomnumber + 'is your new password',
            };
            sgMail.send(msg);
            res.jsonp({ id: 1, name: 'Ali' });
        } else {
            res.jsonp({ id: 0, name: 'Ali' });
        }
    });
});



// Fetching Posts from Database ( All Posts)


app.get('/posts', function (req, res) {
    let allPosts = [];
    posts.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            allPosts.push({
                key: childSnapshot.key,
                post: childSnapshot.val(),
            })
        });
        res.json({ success: 0, data: allPosts });
    });
});

// Fetching Posts From Database ( Education)

app.get('/education', function (req, res) {

    let educationPosts = [];
    posts.once("value", function (snapshot) {

        snapshot.forEach(function (childSnapshot) {

            if (childSnapshot.val().Catagory == 'education') {
                educationPosts.push({
                    key: childSnapshot.key,
                    post: childSnapshot.val(),
                })
            }
        });

        res.json({ success: 0, data: educationPosts });
    });
});

// Fetching Posts From Database ( Proverty)

app.get('/proverty', function (req , res) {

    let provertyPosts = [];
posts.once("value", function (snapshot) {

    snapshot.forEach(function (childSnapshot) {

        if (childSnapshot.val().Catagory == 'proverty') {
            provertyPosts.push({
                key: childSnapshot.key,
                post: childSnapshot.val(),
            })
        }
    });

    res.json({ success: 0, data: provertyPosts });
});   
    });

// Fetching Posts From Database ( Marriage)

app.get('/marriage' , function(req , res){

    let marriagePosts = [];
posts.once("value", function (snapshot) {

    snapshot.forEach(function (childSnapshot) {

        if (childSnapshot.val().Catagory == 'marriage') {
            marriagePosts.push({
                key: childSnapshot.key,
                post: childSnapshot.val(),
            })
        }
    });

    res.json({ success: 0, data: marriagePosts });
});   
    });

//App Listening

app.listen(3000, function () {
    console.log('Server listening on port 3000')
});
