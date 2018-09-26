var express = require('express');
var router = express.Router();
var Product = require('../models/product')
// var csrf = require("csurf");
// var secuiredCsrf = csrf();

// router.use(secuiredCsrf);

/* GET home page. */
router.get('/', function (req, res, next) {
  Product.find((err, docs) => {
    var chunkProducts = [];
    var chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize) {
      chunkProducts.push(docs.slice(i, i + chunkSize));
    }
    res.render('shop/index', { title: 'Express', products: chunkProducts });
  });
});

router.get("/user/signup", (req, res, next) => {
  res.render('../user/signup');
})

router.post("/user/signup", (req, res, next) => {
  res.redirect('/')
})
// , { csrfToken: req.csrfToken() }
module.exports = router;
