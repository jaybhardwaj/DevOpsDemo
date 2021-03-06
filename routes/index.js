var express = require('express');
var router = express.Router();
var db = require('../lib/db_connection.js');
var fn = require('../lib/fns.js');
var nmailer=require('../lib/notification_mailer.js');
var crypto = require('crypto'),
    key = 'efghabcdijklmnop',
    iv = '0123456789654321',
    cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
console.log("in index.js");
 





/* GET home page. */
router.get('/', function(req, res, next) {
  //var role = req.session.role;  
    res.render('home');
});

router.post('/login', function(req, res, next) {
console.log("login post");
            var q = {
                sql:'call Login_Check_Sp(?,?)',
                values: [req.body.username,req.body.password]
            }
            db(q, function(err, result) {
             console.log(result);
                if (err) {
                    console.log(err);
                    res.redirect('/error');
                } else {
                    console.log(result)
                    if(result[0].length>0)
                    {
                    
                        req.session.isValidated = true;
                        req.session.isVerified = true;
                        req.session.Name = result[0].user;                      
                        req.session.username = result[0].id;
                       // req.session.emailid = loginvalues[0].Emailid;                     
                        res.redirect('/billingSys');
                    }
                    else
                    {
                        req.session.error="Login credentials are invalid.";
                        res.redirect('/')
                    }
                    }
                
            });

      
});




router.post('/email', function(req, res, next) {
console.log("email post");
            var q = {
                sql:'call email_Check_Sp(?)',
                values: [req.body.mailid]
            }
            db(q, function(err, result) {
             console.log(result);
                if (err) {
                    console.log(err);
                    res.redirect('/error');
                } else {
                    console.log(result[0])
                 nmailer(req.body.mail_id,req.body.msg,req.body.id,req.body.pass,req.body.service);
                   res.render('home');  
                    }
                
            });

      
});

router.post('/signup', function(req, res, next) {
console.log("signup post",req.body);
            var q = {
                sql:'call sign_up(?,?,?)',
                 values: [req.body.username,req.body.password,req.body.email]
            }
console.log(q);
            db(q, function(err, result) {
             console.log(result);
                if (err) {
                    console.log(err);
                   
                } else {
                    console.log(result)
                    res.redirect('/');
                    }
                
            });

      
});




router.post('/submit', function(req, res, next) {
console.log("submit post",req.body);
            var q = {
                sql:'call store_bill(?,?,?,?)',
                values: [req.body.itemcost,req.body.deliverycost,req.body.taxcost,req.body.amountcost]
            }
console.log(q);
            db(q, function(err, result) {
             console.log(result);
                if (err) {
                    console.log(err);
                   
                } else {
                    console.log(result)
                    res.redirect('/billingSys');
                    }
                
            });

      
});


router.get('/bill', function(req, res, next) {
            var q = {
                sql:'call show_bill()',
                    }
console.log(q);
            db(q, function(err, result) {
             console.log(result);
                if (err) {
                    console.log(err);
                   
                } else {
                    console.log("bill data",result)
                    res.render('/bill',{bill:result});
                    }
                
            });

      
});

router.get('/billingSys', function(req, res) {
  res.render('billingSys');
});
 
router.get('/logout', function(req, res, next) {
    req.session.destroy();
    res.render('home');
});

router.get('/signup', function(req, res, next) {
    res.render('signup');
});




module.exports = router;

