const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const admin = require("firebase-admin");
const serviceAccount = require("./admin.json");
const sgMail = require('@sendgrid/mail');
// const firebase = require('firebase');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://helpinghand-90a6a.firebaseio.com"
});
var db = admin.database();
let posts = db.ref("/Posts");
let allusers = db.ref("/Users")
let Donors = db.ref("/Donations")
let users = db.ref("/Users")
let LastPosts = db.ref("/Posts")
 let Report = db.ref("/ReportPost")

app.use(cors())
app.use(bodyParser.json())
app.post('/register', function (req, res) {
    var newUser = users.push();
    newUser.set(req.body);
    sgMail.setApiKey('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');
    const msg = {
        to: req.body.email,
        from: 'ar690780@gmail.com',
        subject: 'Your Account is Succesfful registered',
        text: 'Your Account is registered on Helping Hand Social Network',
        html: '<strong></strong>',
    };
    sgMail.send(msg);
    res.jsonp({ id: 1, name: 'Ali' });
});

let key;
app.post('/home', (req, res) => {
    let post = posts.push();
    post.set(req.body);
    key = post.key;

    res.json({ success: 1, data: post });
});

app.post('/question:key', function (req, res) {
    let question = posts.push();
    question.set(req.body);
    key = post.key;

    res.json({ success: 1, data: question });
});

// For Sending Donations
app.post('/home/donations', (req, res) => {
    let donation = Donors.push();
    donation.set(req.body);

    res.json({ success: 1, data: donation });
});
// Sending Comments

app.post('/comments', (req, res) => {
    const body = req.body ;
    
    let comments = db.ref("/Posts/"+body.id+"/Comments").push();

    
    comments.set(body);

    res.json({ success: 1, data: comments});
});

// for getting Posts

app.get('/donors', (req, res) => {
    let donationpost = [];
    Donors.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            donationpost.push({
                key: childSnapshot.key,
                donationpost: childSnapshot.val(),
            })
        });
        res.json({ success: 0, data: donationpost });
    });
});

app.post('/login', (req, res) => {
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
app.post('/forgetpassword', (req, res) => {
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

app.get('/question/:key', (req, res) => {
    let key = req.params.key;
    let allPosts = {};
    posts.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            if (key === childSnapshot.key) {
                allPosts = {
                    key: childSnapshot.key,
                    post: childSnapshot.val(),
                }
            }
        });
        res.json({ success: 0, data: allPosts });
        console.log(allPosts);
    });

});

// Users with Respect to Key

app.get('/profile/:key', (req, res) => {
    let key = req.params.key;
    let userData = {};
    users.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            if (key === childSnapshot.key) {
                userData = {
                    key: childSnapshot.key,
                    post: childSnapshot.val(),
                }
            }
        });
        res.json({ success: 0, data: userData });
        console.log(userData);
    });

});

// Fetching Posts from Database ( All Posts)
app.get('/posts', (req, res) => {
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

// Fetching All Users From Database


//Fetching Last Posts From Database


// Fetching Posts From Database ( Education)
app.get('/education', (req, res) => {

    let educationPosts = [];
    posts.once("value", function (snapshot) {

        snapshot.forEach(function (childSnapshot) {

            if (childSnapshot.val().Category == 'Education') {
                educationPosts.push({
                    key: childSnapshot.key,
                    post: childSnapshot.val(),
                })
            }
        });

        res.json({ success: 0, data: educationPosts });
    });
});

// Fetching Posts From Databse (Un-Employment)
app.get('/employment', function (req, res) {

    let EmploymentPosts = [];
    posts.once("value", function (snapshot) {

        snapshot.forEach(function (childSnapshot) {

            if (childSnapshot.val().Category == 'Un-Employment') {
                EmploymentPosts.push({
                    key: childSnapshot.key,
                    post: childSnapshot.val(),
                })
            }
        });

        res.json({ success: 0, data: EmploymentPosts });
    });
});

// Fetching Post From Database (Others)

app.get('/others', function (req, res) {

    let OthersPosts = [];
    posts.once("value", function (snapshot) {

        snapshot.forEach(function (childSnapshot) {

            if (childSnapshot.val().Category == 'Others') {
                OthersPosts.push({
                    key: childSnapshot.key,
                    post: childSnapshot.val(),
                })
            }
        });

        res.json({ success: 0, data: OthersPosts });
    });
});

// Fetching Posts From Database ( Proverty)

app.get('/proverty', (req, res) => {

    let provertyPosts = [];
    posts.once("value", function (snapshot) {

        snapshot.forEach(function (childSnapshot) {

            if (childSnapshot.val().Category == 'Poverty') {
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
app.get('/marriage', (req, res) => {

    let marriagePosts = [];
    posts.once("value", function (snapshot) {

        snapshot.forEach(function (childSnapshot) {

            if (childSnapshot.val().Category == 'Marriage') {
                marriagePosts.push({
                    key: childSnapshot.key,
                    post: childSnapshot.val(),
                })
            }
        });

        res.json({ success: 0, data: marriagePosts });
    });
});

// Fetching Posts from Database ( Proverty)
app.get('/women', (req, res) => {

    let womenPosts = [];
    posts.once("value", function (snapshot) {

        snapshot.forEach(function (childSnapshot) {

            if (childSnapshot.val().Category == 'Women') {
                womenPosts.push({
                    key: childSnapshot.key,
                    post: childSnapshot.val(),
                })
            }
        });

        res.json({ success: 0, data: womenPosts });
    });
});

// Fetching Posts of Un-Employment
app.get('/employment', (req, res) => {

    let employmentPosts = [];
    posts.once("value", function (snapshot) {

        snapshot.forEach(function (childSnapshot) {

            if (childSnapshot.val().Category == 'Employment') {
                employmentPosts.push({
                    key: childSnapshot.key,
                    post: childSnapshot.val(),
                })
            }
        });

        res.json({ success: 0, data: employmentPosts });
    });
});


// For Fetching Posts of Others
// For listing Down Domation Posts
app.get('/donations', (req, res) => {

    let donationsPosts = [];
    posts.once("value", function (snapshot) {

        snapshot.forEach(function (childSnapshot) {

            if (childSnapshot.val().Catagory == 'donation') {
                donationsPosts.push({
                    key: childSnapshot.key,
                    post: childSnapshot.val(),
                });
            }
        });
    });
});

///////////////////////////////////////////////////////////// Reporting a Post

app.post('/question/report', (req, res) => {

    const body = req.body;
    let Report = db.ref("/ReportPost/"+body.postID +"/" +body.userID)
     let reqbody = {Name:body.name }
    Report.set(reqbody);

    res.json({ success: 1, data: Report });
});

// Getting 

app.post('/question/getreport', (req, res) => {

    const body = req.body;
    let Report = db.ref("/ReportPost/"+body.postID +"/" +body.userID)


    Report.once("value", function (snapshot) {

        res.json({ success: 1, data: snapshot });

    })
   

});

app.get('/users', (req, res) => {

    let showusers = [];
    users.limitToFirst(5).once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            showusers.push({
                key: childSnapshot.key,
                post: childSnapshot.val(),
            })


        });
        res.json({ success: 0, data: showusers});
    });
});


//last post
app.get('/LastPosts', function (req, res) {

    let showLast = [];
    LastPosts.limitToLast(1).once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            showLast.push({
                key: childSnapshot.key,
                post: childSnapshot.val(),
            })
        });
        res.json({ success: 0, data: showLast });
    });
});

// Admin Panel to Delete any User

//App Listening

app.listen(3000, function () {
    console.log('Server listening on port 3000')
});
