var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/test");
var Schema = mongoose.Schema;


var userDataSchema = new Schema({
  firstname: String,
  fathername: String,
  nickname: String
}, { collection: 'users-data' })

var UserData = mongoose.model('UserData', userDataSchema)

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { success: req.session.success, error: req.session.error });
  req.session.success = null;
  req.session.error = null;
});

router.get('/delete', (req, res, next) => {
  res.render('delete', { success: req.session.success, error: req.session.error });
  req.session.success = null;
  req.session.error = null;
})

router.get('/update', (req, res, next) => {
  res.render('update', { success: req.session.success, error: req.session.error })
  req.session.success = null;
  req.session.error = null;
});
router.get('/usersData', (req, res, next) => {
  res.render('userData')
})
// deleting ...

router.post('/deleteThis', (req, res, next) => {
  var id = req.body.id;
  if (id !== "") {
    req.session.success = true;
    req.session.error = false;
    UserData.findByIdAndRemove(id).exec();

  } else {
    req.session.success = false;
    req.session.error = true;
  }
  res.redirect('/delete')
});

router.get('/getData', (req, res, next) => {
  UserData.find().then((docs) => {
    console.log("run")
    res.render('userData', { usersData: docs })
  }).catch((err) => console.error(err));
});

router.post('/submit', function (req, res, next) {
  var Users = {
    firstname: req.body.Firstname,
    fathername: req.body.Fathername,
    nickname: req.body.Nickname
  }
  if (Users.firstname !== "" && Users.fathername !== "" && Users.nickname !== "") {
    req.session.success = true;
    req.session.error = false;
    var data = new UserData(Users);
    data.save();
  } else {
    req.session.success = false;
    req.session.error = true;
  };
  res.redirect('/')
});
router.post('/updateThis', function (req, res, next) {
  var Users = {
    firstname: req.body.Firstname,
    fathername: req.body.Fathername,
    nickname: req.body.Nickname
  }
  var id = req.body.id;
  if (Users.firstname !== "" && Users.fathername !== "" && Users.nickname !== "" && id !== "") {
    req.session.success = true;
    req.session.error = false;

    UserData.findById( id, ((err, docs) => {
      if (err) {
        console.log('erron no entry')
      }
      docs.firstname = Users.firstname;
      docs.fathername = Users.fathername;
      docs.nickname = Users.nickname;
      docs.save();
    }));
  } else {
    req.session.success = false;
    req.session.error = true;
  }
  res.redirect('/update')
})
module.exports = router;