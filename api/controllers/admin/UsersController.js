/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var format = require('date-format');
module.exports = {
  'new': function (req, res) {
    res.view();
  },
  index: function (req, res) {
    Users.find(function(err,listUser){
      //listUser.forEach(function(listItem){
      //  var createdDate = format.asString('dd-MM-yyyy', new Date(listItem.createdAt));
      //
      //});
      res.view({listUser:listUser});
    })

  },
  //*----------------------------*
  //*------- Create User --------*
  //*----------------------------*
  create: function (req, res, next) {
    var infoUser = req.params.all();
    Users.create(infoUser, function userCreated (err, user) {
      //if there's an error
      if (err) {
        req.session.flash = {
          err:err
        }
        //if err redirect back to sign up
        return res.redirect('admin/users/new');
      }
      //After successfully creating the user
      //redirect to show all users
      res.redirect('admin/users');
    })
  },
  profile:function(req,res,next){
// render the profile view (e.g. /views/show.ejs)
      Users.findOne(req.param('id'), function foundUser(err, user) {
        if (err) return next(err);
        if (!user) return next();
        var createdDate = format.asString('dd-MM-yyyy', new Date(user.createdAt));
        res.view({
          user: user

        });
      });
  },

  _config: {
    locals: {
      layout: 'layout/layout-admin'
    }
  }
};

