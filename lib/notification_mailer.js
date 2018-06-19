 var nodemailer = require('nodemailer');
var fn = require('./fns.js');


  
var nmailer = function(email,msg,id,pass,service) {
  console.log("in nmailer",email,msg,id,pass);
var msg="<html><p>your msg is :"+msg+"</p></html>";
  var mailOptions = {
    from: '<jay.prakash@polestarllp.com>',
    to: email, // list of receivers
    subject: 'Forgot Password',
   // text: ufrom + msg,
   //html: '<html><body>'+ufrom+ msgs+'</body></html>',
   html:msg,

  }
var transporter = nodemailer.createTransport({
  
   service: service,
    auth: {
      user: id,
        pass: pass
    }
});

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      console.log(err)
    } else {
console.log("mail sent");
     
    }
  });
}
module.exports = nmailer;