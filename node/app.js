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
let allusers = db.ref("/Users")
let Donors = db.ref("/Donations")
let users = db.ref("/Users")
let LastPosts = db.ref("/Posts")

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
app.post('/home', function (req, res) {
    let post = posts.push();
    post.set(req.body);
    key = post.key;

    res.json({ success: 1, data: post });
});


// Sending Comments

app.post('/question:key', function (req, res) {
    let question = posts.push();
    question.set(req.body);
    key = post.key;

    res.json({ success: 1, data: question });
});



// For Sending Donations

app.post('/home/donations', function (req, res) {
    let donation = Donors.push();
    donation.set(req.body);

    res.json({ success: 1, data: donation });
});

// for getting Posts

app.get('/donors', function (req, res) {
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

app.get('/question/:key', function (req, res) {
    let key = req.params.key;
    let allPosts = {};
    posts.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            if (key === childSnapshot.key) {
                allPosts = {
                    key: childSnapshot.key,
                    post: childSnapshot.val(),
                };
            }
        });
        res.json({ success: 0, data: allPosts });
        console.log(allPosts);
    });

});

// Users with Respect to Key

app.get('/profile/:key', function (req, res) {
    let key = req.params.key;
    let userData = {};
    posts.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            if (key === childSnapshot.key) {
                userData = {
                    key: childSnapshot.key,
                    post: childSnapshot.val(),
                };
            }
        });
        res.json({ success: 0, data: userData });
        console.log(userData);
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

// Fetching All Users From Database

app.get('/users', function (req, res) {

    let showusers = [];
users.limitToFirst(5).once("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        showusers.push({
            key: childSnapshot.key,
            post: childSnapshot.val(),
        })
    });
    res.json({ success: 0, data: showusers });
});
});

//Fetching Last Posts From Database

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





// Fetching Posts From Database ( Education)

app.get('/education', function (req, res) {

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

        res.json({ success: 0, data:  OthersPosts });
    });
});

// Fetching Posts From Database ( Proverty)

app.get('/proverty', function (req, res) {

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

app.get('/marriage', function (req, res) {

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

app.get('/women', function (req, res) {

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


app.get('/employment', function (req, res) {

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
app.get('/donations', function (req, res) {

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
// Admin Panel to Delete any User



//App Listening

app.listen(3000, function () {
    console.log('Server listening on port 3000')
});
