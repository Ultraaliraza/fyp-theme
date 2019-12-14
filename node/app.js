const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const admin = require("firebase-admin");
const serviceAccount = require("./admin.json");
const firebaseConfig = require("./firebaseConfig.json");
const firebase = require('firebase');
const sgMail = require('@sendgrid/mail');

const app = express();
firebase.initializeApp(firebaseConfig);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://helpinghand-90a6a.firebaseio.com"
});
const db = admin.database();
let posts = db.ref("/Posts");
let Donors = db.ref("/Donations")
let users = db.ref("/Users");
let videos = db.ref("/Videos");

const auth = firebase.auth();

app.use(cors({ origin: true }));
app.use(bodyParser.json())

app.post('/register', (req, res) => {
    const body = req.body;
    const profileBody = {
        email: body.email,
        name: body.name,
        accountType: body.accountType,
        profile_image: body.profile_image
    }

    return auth.createUserWithEmailAndPassword(body.email, body.password)
        .then((userRecord) => {

            return auth.currentUser.sendEmailVerification()
                .then(() => {
                    return db.ref('/Users/' + userRecord.user.uid)
                        .set(profileBody)
                        .then(() => {
                            // See the UserRecord reference doc for the contents of userRecord.
                            return res.status(200).json({ uid: userRecord.user.uid });
                        })
                        .catch((error) => { return res.send(error) });
                })
                .catch((error) => {
                    // An error happened.
                    return res.send({ error1: error });
                });
        })
        .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
                res.status(401).send({ error2: error });
            } else if (error.code === 'auth/weak-password') {
                res.status(402).send({ error3: error });
            } else {
                res.send({ error4: error });
            }
        });
});

app.post('/login', (req, res) => {
    const body = req.body;
    if (!body.email || !body.password)
        return res.status(403).send('Must fill required fields');

    const fb = firebase.auth();
    return fb.signInWithEmailAndPassword(body.email, body.password)
        .then((userinfo) => {
            if (!userinfo.user.emailVerified)
                return res.status(302).send('Email not Verified');

            return db.ref('Users/' + userinfo.user.uid)
                .on("value", (snapshot) => {
                    return res.status(200).send({ data: snapshot.val(), uid: userinfo.user.uid });
                });
        })
        .catch((error) => {
            if (error.code === 'auth/user-not-found') {
                res.status(401).send(error);
            } else if (error.code === 'auth/wrong-password') {
                res.status(402).send(error);
            }
        });

});

app.post('/forgetpassword', (req, res) => {
    const body = req.body;
    return auth.sendPasswordResetEmail(body.email)
        .then(() => { return res.status(200).send('Email send') })
        .catch((error) => { return res.send('Error' + error) });
});

app.post('/social', (request, response) => {
    let found = 0;
    const body = request.body;
    console.log(body);
    let ref = db.ref('/Users/' + body.uid)
    delete body.uid;
    return ref.set(body)
        .then(() => {
            return ref.on("value", (snapshot) => {
                return response.status(200).send({ data: snapshot.val() });
            });
            // .once("value", (snapshot) => {
            //     snapshot.forEach((childSnapshot) => {
            //         var data = childSnapshot.val();

            //         let key = childSnapshot.key;
            //         found = 1;

            //         temp = data;
            //         temp.key = key;
            //     });
            //     if (found === 1) {
            //         return response.jsonp({ success: 1, data: temp });
            //     } else {
            //         return response.jsonp({ success: 0, data: {} });
            //     }
            // });
        })
        .catch((error) => {
            return response.json(error);
        });
});

app.post('/setAccountType', (req, res) => {
    const body = req.body;
    console.log(body);
    return db.ref('/Users/' + body.id)
        .update({ acountType: body.acountType })
        .then(() => { return res.set(200).send({ msg: 'Account Type Updated' }) })
        .catch((error) => { return res.send(error) })
});

app.post('/home', (req, res) => {
    const body = req.body;
    let post = db.ref("/Posts/").push();

    post.set(body)
        .then(() => { return res.json({ success: 1 }) })
        .catch((error) => { return res.send({ Error: error }) });
});

// For Sending Donations
app.post('/home/donations', (req, res) => {
    let donation = Donors.push();
    donation.set(req.body);

    res.json({ success: 1, data: donation });
});

// for getting Posts
app.get('/donors', (req, res) => {
    let donationpost = [];
    Donors.once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            donationpost.push({
                key: childSnapshot.key,
                donationpost: childSnapshot.val(),
            })
        });
        return res.json({ success: 0, data: donationpost });
    });
});

// Users with Respect to Key
app.get('/profile/:key', (req, res) => {
    let key = req.params.key;
    let userData = {};
    db.ref("/Users/" + key).once("value", (snapshot) => {

        userData = {
            post: snapshot.val(),

        };
        res.json({ success: 0, data: userData });
        console.log(userData);
    });
});

// Fetching Posts from Database ( All Posts)
app.get('/posts', (req, res) => {
    let allPosts = [];
    posts.once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            allPosts.push({
                key: childSnapshot.key,
                post: childSnapshot.val(),
            })
        });
        res.json({ success: 0, data: allPosts });
    });
});

// Fetching Posts From Database ( Education)
app.get('/education', (req, res) => {

    let educationPosts = [];
    posts.once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            if (childSnapshot.val().Category === 'Education') {
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
app.get('/proverty', (req, res) => {

    let provertyPosts = [];
    posts.once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            if (childSnapshot.val().Category === 'Proverty') {
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
    posts.once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            if (childSnapshot.val().Category === 'Marriage') {
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
    posts.once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            if (childSnapshot.val().Category === 'Women') {
                womenPosts.push({
                    key: childSnapshot.key,
                    post: childSnapshot.val(),
                })
            }
        });

        res.json({ success: 0, data: womenPosts });
    });
});

// For listing Down Domation Posts
app.get('/donations', (req, res) => {

    let donationsPosts = [];
    posts.once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            if (childSnapshot.val().Catagory === 'donation') {
                donationsPosts.push({
                    key: childSnapshot.key,
                    post: childSnapshot.val(),
                });
            }
        });
    });
});

// Sending Comments
app.post('/comments', (req, res) => {
    const body = req.body;
    let comments = db.ref("/Posts/" + body.postID + "/Comments").push();
    delete body.postID
    comments.set(body);
    res.json({ success: 1, data: comments });
});

app.get('/question/:key', (req, res) => {
    let key = req.params.key;
    let allPosts = {};
    posts.once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
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

// Fetching Post From Database (Others)

app.get('/others', (req, res) => {
    let OthersPosts = [];
    posts.once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            if (childSnapshot.val().Category === 'Others') {
                OthersPosts.push({
                    key: childSnapshot.key,
                    post: childSnapshot.val(),
                })
            }
        });
        res.json({ success: 0, data: OthersPosts });
    });
});

// Fetching Posts of Un-Employment
app.get('/employment', (req, res) => {
    let employmentPosts = [];
    posts.once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            if (childSnapshot.val().Category === 'Employment') {
                employmentPosts.push({
                    key: childSnapshot.key,
                    post: childSnapshot.val(),
                })
            }
        });
        res.json({ success: 0, data: employmentPosts });
    });
});

// Reporting a Post
app.post('/question/report', (req, res) => {
    const body = req.body;
    let Report = db.ref("/ReportPost/" + body.postID + "/" + body.userID)
    let reqbody = { Name: body.name }
    Report.set(reqbody);

    res.json({ success: 1, data: Report });
});

// Getting 
app.post('/question/getreport', (req, res) => {
    const body = req.body;
    let Report = db.ref("/ReportPost/" + body.postID + "/" + body.userID)
    Report.once("value", (snapshot) => {
        res.json({ success: 1, data: snapshot });
    })
});

app.get('/users', (req, res) => {
    let showusers = [];
    users.limitToFirst(5).once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            showusers.push({
                key: childSnapshot.key,
                post: childSnapshot.val(),
            })
        });
        res.json({ success: 0, data: showusers });
    });
});

//last post
app.get('/LastPosts', (req, res) => {
    let showLast = [];
    posts.limitToLast(1).once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            showLast.push({
                key: childSnapshot.key,
                post: childSnapshot.val(),
            })
        });
        res.json({ success: 0, data: showLast });
    });
});

// ----------- Assad New Code
// Getting 
app.get('/getallquestion/:id', (req, res) => {
    const userID = req.params.id;
    let questions = [];
    db.ref("/Posts/").orderByChild(PostBy).equalTo(userID).once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            questions.push({
                key: childSnapshot.key,
                data: childSnapshot.val()
            });
        });
        res.json({ data: questions });
    });
});

// Getting 
app.get('/deletequestion/:postid', (req, res) => {
    const postID = req.params.postid;
    db.ref('Posts/' + postID).remove(() => {
        return res.status(200).send({ msg: 'Deleted' });
    });
});

app.post('/updatequestion', (req, res) => {
    const body = req.body;
    const updateRef = db.ref("/Posts/" + body.postID)
    delete body.postID;

    return updateRef
        .update(body.form)
        .then(() => { return res.status(200).send({ msg: 'Updated' }); })
        .catch((error) => { return res.send({ Error: error }) });
});

app.post('/updateprofile', (req, res) => {
    const body = req.body;

    console.log(body);

    const updateRef = db.ref('Users/' + body.id)
    delete body.id;
    updateRef.update(body.form)
        .then(() => { return res.status(200).send({ msg: 'Updated' }) })
        .catch((error) => { return res.send({ Error: error }) });


});

app.post('/updatepass', (req, res) => {
    const body = req.body;
    return auth.currentUser.updatePassword(body.newPassword)
        .then(() => { return res.status(200).send({ msg: 'Password updated' }) })
        .catch((error) => { return res.send({ Error: error }) });
});

// ----------------- Ali New Code





// Gettings Videos ( No Videos Table Right Now)
app.get('/videos', (req, res) => {
    let allVideos = [];
    videos.once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            allVideos.push({
                key: childSnapshot.key,
                post: childSnapshot.val(),
            })
        });
        res.json({ success: 0, data: allVideos });
    });
});

app.post('/postvideo', (req, res) => {
    let postvideos = videos.push();
    postvideos.set(req.body);

    res.json({ success: 1, data: postvideos });
});

// ----------------- Ali Updated Code




// ====================== Admin ======================
// 1) Total Number OF Posts
app.get('/totalposts', (req, res) => {
    posts.once("value", (snapshot) => {
        let count = Object.keys(snapshot.val());
        return res.status(200).send({ count: count.length });
    });
});

// 2) Total Number OF Users
app.get('/totalusers', (req, res) => {
    users.once("value", (snapshot) => {
        let count = Object.keys(snapshot.val());
        return res.status(200).send({ count: count.length });
    });
});

// 3) Total Number OF Videos
app.get('/totalvideos', (req, res) => {
    db.ref("/Videos").once("value", (snapshot) => {
        let count = Object.keys(snapshot.val());
        return res.status(200).send({ count: count.length });
    });
});

// 4) Total Number Of Donations
app.get('/totaldonors', (req, res) => {
    Donors.once("value", (snapshot) => {
        let count = Object.keys(snapshot.val());
        return res.status(200).send({ count: count.length });
    });
});

// 5) Total Number of Reports
app.get('/totalreportpost', (req, res) => {
    db.ref("/ReportPost").once("value", (snapshot) => {
        let count = Object.keys(snapshot.val());
        return res.status(200).send({ count: count.length });
    });
});

// ------- users
app.get('/getallusers', (req, res) => {
    users.once("value", (snapshot) => {
        return res.status(200).send({ users: snapshot.val() });
    });
});

// --> change user status
app.get('/changeuserstatus/:uid/:status', (req, res) => {
    let userID = req.params.uid;
    let status = req.params.status;
    let ref = db.ref("/Users/" + userID);
    ref.update({ status: status });
    ref.once("value", (snapshot) => {
        const data = snapshot.val();

        sgMail.setApiKey('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');
        const msg = {
            to: data.email,
            from: 'ar690780@gmail.com',
            subject: 'Your Account has been' + status,
            text: 'Your Account has been' + status + ' on Helping Hand Social Network',
            html: '<strong></strong>',
        };
        sgMail.send(msg)
        return res.status(200).send({ msg: 'User ' + status });
    });
});

// --> delete methods
app.get('/deletepost/:id', (req, res) => {
    const postID = req.params.id;
    db.ref("/Posts/" + postID).remove()
        .then(() => { return res.status(200).send({ msg: 'Post deleted' }) })
        .catch((error) => { return res.send({ Error: error }) });
});

app.get('/deletedonations/:id', (req, res) => {
    const donation = req.params.id;
    db.ref("/Donations/" + donation).remove()
        .then(() => { return res.status(200).send({ msg: 'Donation deleted' }) })
        .catch((error) => { return res.send({ Error: error }) });
});

app.get('/deletevideos/:id', (req, res) => {
    const videoID = req.params.id;
    db.ref("/Videos/" + videoID).remove()
        .then(() => { return res.status(200).send({ msg: 'Video deleted' }) })
        .catch((error) => { return res.send({ Error: error }) });
});

app.listen(3000, function () {
    console.log('Server listening on port 3000')
});
