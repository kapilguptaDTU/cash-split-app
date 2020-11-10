// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx



var express = require("express");
var router = express.Router({
    mergeParams: true
});
var Employee = require("../models/employee.model");
var Post = require("../models/post");
var Comment = require("../models/comment");
var Transaction = require("../models/transaction");





router.get('/users', isLoggedIn, (req, res) => {
    // res.json('from list');
    User.find({}, (err, docs) => {
        if (!err) {



            res.render("user/list", {
                users: docs
            });
        } else {
            console.log('Error while retrieving user list :' + err);

        }
    }).lean();
});
router.get('/',isLoggedIn, (req, res) => {
    // res.json('from list');
    User.find({}, (err, docs) => {
        if (!err) {

global.globalUsers=docs;
console.log("global user size "+globalUsers.length);
            res.render("user/naklisplit", {
                users: docs
            });
        } else {
            console.log('Error while retrieving user list :' + err);

        }
    }).lean();
});

router.get('/transactions',isLoggedIn, (req, res) => {
    // res.json('from list');
    Transaction.find({}, (err, docs) => {
        if (!err) {
            // console.log(docs);
            console.log("globaluser len"+globalUsers.length);
            var l=globalUsers.length;
            var numTransactions=docs.length;
            var arr = [];
var rows = l;
var columns = l;
var amount=[];
fill2DimensionsArray(arr, rows, columns);

function fill2DimensionsArray(arr, rows, columns){
    for (var i = 0; i < rows; i++) {
        arr.push([0])
        for (var j = 0; j < columns; j++) {
            arr[i][j] = 0;
        }
    }
    for (var j = 0; j < numTransactions; j++) {
        var x=docs[j].fromID;
        var y=docs[j].toID;
        var val=docs[j].value;
        arr[x][y]+=val;
        
    }
    for (var i = 0; i < rows; i++) {
        var ee=0;
        for (var j = 0; j < columns; j++) {
            ee+=(arr[i][j]-arr[j][i]);
        }
        amount.push(ee);
    }
}
console.log("amount array"+amount);

function findMax(amount){
    var maxindex=0;
    // var ans=amount[0];
    for (var i = 1; i < l; i++)
    {
        if(amount[i]>amount[maxindex])
        {
          maxindex=i;
        }
    }
    return maxindex;
}

function findMin(amount){
    var minindex=0;
    // var ans=amount[0];
    for (var i = 1; i < l; i++)
    {
        if(amount[i]<amount[minindex])
        {
          minindex=i;
        }
    }
    return minindex;
}
 
function minOf2( x, y) 
{ 
    return (x<y)? x: y; 
} 

function a(){
for (var i = 0; i < l; i++)
{
    var mxCredit = findMax(amount), mxDebit = findMin(amount); 
    if(mxCredit==0&&mxDebit==0)i=l;
  var mi=minOf2(-amount[mxDebit],amount[mxCredit]);
  console.log("maxC,maxD"+ mxCredit,mxDebit);
  amount[mxCredit] -= mi; 
 amount[mxDebit] += mi; 
console.log("person "+mxDebit+" pays "+mi+" to person "+mxCredit);
}
}
// function splitEqually(){

// }
    

function b(){  res.render("user/alltransactions", {
                transactions: docs
            });
        }
        setTimeout(a,500);
        setTimeout(b,1000);
        
        } else {
            console.log('Error while retrieving post list :' + err);

        }
    }).lean();
});



// router.get("/login", function (req, res) {
//     res.render("login");
// });



router.get('/chat', isLoggedIn, (req, res) => {
    // res.json('from list');
    User.find({}, (err, docs) => {
        if (!err) {




            res.render("user/listforchat", {
                users: docs
            });
        } else {
            console.log('Error while retrieving user list for chat:' + err);

        }
    }).lean();
});

router.get('/transact',isLoggedIn, (req, res) => {
    // res.json('from list');
    User.find({}, (err, docs) => {
        if (!err) {

global.globalUsers=docs;

            res.render("user/naklisplit", {
                users: docs
            });
        } else {
            console.log('Error while retrieving user list :' + err);

        }
    }).lean();
});

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

router.get("/user/:id/transact", isLoggedIn, function (req, res) {
    //find the campground with provided ID

    // console.log(globalUsers);
    User.findById(req.params.id).exec(function (err, reciever) {
        var flag = 0;
        if (err) {
            console.log(err);
        } else {

            var sender = req.user;
            Transaction.find({}, (error, transactions) => {
                if (!error) {
                    
                    var senderName = req.user.username;
                    var recieverName = reciever.username;
                    var senderID = req.user.intId;
                    var recieverID = reciever.intId;
                    var l=globalUsers.length;
                    var transMessages=[];
                    var transSequence=[];
                    var totalGive=0;
                    var totalTake=0;
                    transactions.forEach(function(transaction){
                    if(transaction.fromID==senderID&&transaction.toID==recieverID){
                      
                        var m="You paid "+transaction.value + " to "+transaction.to+" ("+transaction.toID+") ";
                        transMessages.push(m);
                        transSequence.push("given");
                        totalGive+=transaction.value;
                    }
                    else if(transaction.fromID==recieverID&&transaction.toID==senderID){
                        
                        var m="You were given "+transaction.value + " by "+transaction.from+" ("+transaction.fromID+") ";
                        transMessages.push(m);

                        transSequence.push("recieved");
                        totalTake+=transaction.value;
                    } 
                    else{}
                    
                    });



function a() {
            var netT=totalGive-totalTake;
                res.render("user/chatboxtransaction", {
                    user: reciever,
                    allUsers:globalUsers,
                    transMessages,
                    len:transMessages.length,
                    totalGive,
                    totalTake,
                    transSequence,
                    netT
                    // takenLength,
                    // givenLength,
                    // totalGiven,
                    // totalOwed,
                    // netTransaction
                });
            };
            setTimeout(a, 1000);



                } else {
                    console.log('Error while retrieving transactions :' + error);
                }
            }).lean();
            // var senderName = req.user.username;
            // var recieverName = reciever.username;
            // var takenLength = sender.takenFrom.length;
            // var givenLength= sender.givenTo.length;
            // var totalGiven=0;
            // var totalOwed=0;
            

            // for (var j =0; j <givenLength ;  j++ ) {
            //     if(sender.givenTo[j]==reciever.username){
            //       totalGiven+=sender.givenAmount[j];
            //     }
            // }

            // for (var j =0; j <takenLength ;  j++ ) {
            //     if(sender.takenFrom[j]==reciever.username){
            //       totalOwed+=sender.takenAmount[j];
            //     }
            // }

            // var netTransaction=totalGiven-totalOwed;


            // function a() {
            
            //     res.render("user/chatboxtransaction", {
            //         user: reciever,
            //         allUsers:globalUsers,
            //         takenLength,
            //         givenLength,
            //         totalGiven,
            //         totalOwed,
            //         netTransaction
            //     });
            // };
            // setTimeout(a, 1000);



        }
    });
});

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


router.post("/user/:id/transact", isLoggedIn, function (req, res) {

    User.findById(req.params.id).populate("posts").exec(function (err, reciever) {
        var flag = 0;
        if (err) {
            console.log(err);
        } else {
            var sender = req.user;

            var senderName = req.user.username;

            var recieverName = reciever.username;
            console.log(req.body.c.taken + "takenFrom"+recieverName);
            console.log(req.body.c.given + "givenTo"+recieverName);
            console.log(req.body.c.taken=="");
 
            var t=new Transaction();
            
var y=0;
        if(req.body.c.splitEqual==""){
            y=1;
            if(req.body.c.taken=="")
             {
                sender.givenTo.push(reciever.username);
                sender.givenAmount.push(req.body.c.given);
                reciever.takenFrom.push(sender.username);
                reciever.takenAmount.push(req.body.c.given);                
                reciever.totalYouOwe+=req.body.c.given;
                sender.totalYouOwe-=req.body.c.given;
                reciever.totalYouWillRecieve-=req.body.c.given;
                sender.totalYouOwe+=req.body.c.given;
                
                t.value=req.body.c.given;
                t.from=sender.username;
                t.to=reciever.username;
                t.doneBy=sender.username;
                t.fromID=sender.intId;
                t.toID=reciever.intId;
                t.doneByID=sender.intId;
                            
             }
             else
             {
             
                sender.takenFrom.push(reciever.username);
                sender.takenAmount.push(req.body.c.taken);
                reciever.givenTo.push(sender.username);
                reciever.givenAmount.push(req.body.c.taken);                
            
                t.value=req.body.c.taken;
                t.from=reciever.username;
                t.to=sender.username;
                t.doneBy=sender.username;
            
                t.fromID=reciever.intId;
                t.toID=sender.intId;
                t.doneByID=sender.intId;
            
            }
        }
        else{
            var l=globalUsers.length;

            for(var i=0;i<l;i++)
            {
                if(i==sender.intId)continue;
                var splitT=new Transaction();

                splitT.value=req.body.c.splitEqual/l;
                splitT.from=sender.username;
                splitT.to=String.fromCharCode(97+i);
                splitT.doneBy=sender.username;
            
                splitT.fromID=sender.intId;
                splitT.toID=i;
                splitT.doneByID=sender.intId;
            splitT.save();
            }
        }
            function a() {
               if(y==1){ t.save((err, doc) => {
                    if (!err){}
                });}
                sender.save();
                reciever.save();
                // console.log(sender);
                res.redirect("/user/" + reciever._id + "/transact")

            };
            setTimeout(a, 1000);
        }
    });


});
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


router.post("/user/:id/chat", isLoggedIn, function (req, res) {

    User.findById(req.params.id).populate("posts").exec(function (err, reciever) {
        var flag = 0;
        if (err) {
            console.log(err);
        } else {
            var sender = req.user;

            var senderName = req.user.username;

            var recieverName = reciever.username;
            // console.log(req.body.c.chat + "aaaa");

            function findObjectByKey(array, key, value) {
                for (var j = 0; j < array.length; j++) {
                    if (array[j][key] === value) {
                        return array[j];
                    }
                }
                return null;
            }

            var obj = findObjectByKey(sender.messages, 'n', recieverName);

            if (obj == null) {
                sender.messages.push({
                    n: recieverName,
                    v: ''
                });
                reciever.messages.push({
                    n: senderName,
                    v: ''
                });

                sender.sequence.push({
                    n: recieverName,
                    v: ''
                });
                reciever.sequence.push({
                    n: senderName,
                    v: ''
                });
            }

            obj = findObjectByKey(sender.messages, 'n', recieverName);
            var obj2 = findObjectByKey(reciever.messages, 'n', senderName);
            var objstring = findObjectByKey(sender.sequence, 'n', recieverName);
            var objstring2 = findObjectByKey(reciever.sequence, 'n', senderName);

            obj.v = obj.v + ',' + req.body.c.chat;

            obj2.v = obj2.v + ',' + req.body.c.chat;


            objstring.v = objstring.v + ',sent';

            objstring2.v = objstring2.v + ',recieved';

            function findObjectIdByKey(array, key, value) {
                for (var j = 0; j < array.length; j++) {
                    if (array[j][key] === value) {
                        return j;
                    }
                }
                return -1;
            }
            var index = findObjectIdByKey(sender.messages, 'n', recieverName);
            if (index != -1) {
                sender.messages[index].v = obj.v;
            }

            var index2 = findObjectIdByKey(reciever.messages, 'n', senderName);
            if (index2 != -1) {
                reciever.messages[index2].v = obj2.v;
            }

            var index3 = findObjectIdByKey(sender.sequence, 'n', recieverName);
            if (index3 != -1) {
                sender.sequence[index].v = objstring.v;
            }

            var index4 = findObjectIdByKey(reciever.sequence, 'n', senderName);
            if (index4 != -1) {
                reciever.sequence[index4].v = objstring2.v;
            }

            obj = findObjectByKey(sender.messages, 'n', recieverName);
            objstring = findObjectByKey(sender.sequence, 'n', recieverName);

            function a() {
                sender.save();
                reciever.save();
                res.redirect("/user/" + reciever._id + "/chat")

            };
            setTimeout(a, 1000);
        }
    });


});
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

router.get("/user/:id/chat", isLoggedIn, function (req, res) {
    //find the campground with provided ID

    // console.log(globalUsers);
    User.findById(req.params.id).populate("posts").exec(function (err, reciever) {
        var flag = 0;
        if (err) {
            console.log(err);
        } else {

            var sender = req.user;
            var senderName = req.user.username;
            var recieverName = reciever.username;

            function findObjectByKey(array, key, value) {
                for (var j = 0; j < array.length; j++) {
                    if (array[j][key] === value) {
                        return array[j];
                    }
                }
                return null;
            }

            var obj = findObjectByKey(sender.messages, 'n', recieverName);

            if (obj == null) {
                // console.log('NUMMMM');
                sender.messages.push({
                    n: recieverName,
                    v: ''
                });
                reciever.messages.push({
                    n: senderName,
                    v: ''
                });

                sender.sequence.push({
                    n: recieverName,
                    v: ''
                });
                reciever.sequence.push({
                    n: senderName,
                    v: ''
                });
            }

            obj = findObjectByKey(sender.messages, 'n', recieverName);
            var objstring = findObjectByKey(sender.sequence, 'n', recieverName);

            function a() {
                sender.save();
                reciever.save();
                var os = obj.v;
                var osa = objstring.v;

                var messagess = os.split(",");
                // console.log(os + "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
                var seq = osa.split(",");
                var i = messagess.length;
                res.render("user/chatboxmobile", {
                    user: reciever,
                    messagesy: messagess,
                    seq: seq,
                    allUsers:globalUsers,
                    i
                });
            };
            setTimeout(a, 1000);



        }
    });
});

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

// EMPLOYEE SHOW PAGE

// SHOW - shows more info about one EMPLOYEE
router.get("/user/:id", isLoggedIn, function (req, res) {
    //find the campground with provided ID
    User.findById(req.params.id).populate("posts").exec(function (err, foundUser) {
        //     foundUser.messages['ron']='hermoine';
        //  console.log( foundUser.messages['ron']);
        //  console.log(foundUser);
        // foundUser.save();
        //  ['ron']='hermoine';
        var flag = 0;
        if (err) {
            console.log(err);
        } else {
            foundUser.friendName.forEach(function (friend) {
                if (friend == req.user.username) {
                    flag = 1;
                }
            });
            res.render("user/profilepage", {
                user: foundUser,
                allUsers:globalUsers,
                flag: flag
            });
        }
    });
});
router.get("/user/:id/friend", function (req, res) {
    //find the campground with provided ID
    User.findById(req.params.id).populate("posts").exec(function (err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            foundUser.friends.push(req.user._id);
            foundUser.friendName.push(req.user.username);

            req.user.friends.push(foundUser._id);
            req.user.friendName.push(foundUser.username);
            req.user.save();
            // console.log(req.user);
            foundUser.save();

            // console.log("found" + foundUser);
            res.redirect("/user/" + foundUser._id);

        }
    });
});












router.get("/register", function (req, res) {
    res.render("user/register");
});
//handle sign up logic
router.post("/register", function (req, res) {
   
    User.find({}, (err, docs) => {
        if (!err) {

global.globalUsers=docs;
console.log("global user size while registering "+globalUsers.length);
        } else {
            console.log('Error while retrieving user list :' + err);
        }
    }).lean();
    function nnnn() {
    var newUser = new User({
        username: req.body.username,
        mobile: req.body.mobile,
        state: req.body.state,
        city: req.body.city,
        highscore: '0',
        profileImage:req.body.profileImage,
        description:req.body.description,
        intId:globalUsers.length

    });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/");
        });
    });
}
setTimeout(nnnn,1000);
});

// show login form
router.get("/login", function (req, res) {
    res.render("user/login");
});
// handling login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}), function (req, res) {});

// logic route
router.get("/logout", function (req, res) {
    req.logout();
    console.log("succesfuly logged out");
    res.redirect("/");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}






module.exports = router;