var db = require('./db_connection.js');
var bcrypt = require('bcryptjs');

var fn = {
  isValidPassword: function(req) {
    var password = req.body.password;
    var length = password.length;
    return length > 4;
  },
 /* isDefaulter:function(req) {
    var ifdefaulter=0;
     var q ={
        sql : 'call usp_getemployeeresponsebycode_rs(?)',
        values : [req.session.empcode]
      }
      db(q,function(err,response){
        console.log("isdeffaulter")
        console.log(response[0][0].isDefaulter);
        if(err)
        {
          res.redirect('/error'); 
          console.log(err);
        }
        else
        {          
          ifdefaulter=response[0][0].isDefaulter;
          console.log('ifdefaulter'+ifdefaulter);
        }
      });
      
             return ifdefaulter; 
    //return req.session.isValidated;
  },
  */
  isValidated: function(req) {
    return req.session.isValidated;
  },
  isVerified: function(req) {
    return req.session.isVerified == true ? true : false;
  },
  isAdmin: function(req) {
    if (this.isVerified(req))
      return this.isRole(req, 1);
    return false;
  },
  isManager: function(req) {
    if(this.isVerified(req))
      return this.isRole(req,3);
    return false;
  },
  isRole: function(req, role) {
    return req.session.role == role;
  },
  hashItem: function(item) {
    var hash = bcrypt.hashSync(item, 8);
    return hash;
  },
  verifyHash: function(item, hash) {
    return bcrypt.compareSync(item, hash);
  },
  verifyUser: function(pwd, password) {
    return this.verifyHash(password, pwd);
  },
  clearSession: function(req) {
    req.session.destroy();
  },
  generateRandomPassword: function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i=0; i < 8; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  },
  insertPasswordInDb: function(req, password, cb) {
    var queryOptions = {
      sql: 'call changePassword(?, ?)',
      values: [req.body.email, password]
    }
    db(queryOptions, cb);
  },
}

module.exports = fn;
