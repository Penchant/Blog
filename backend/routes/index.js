var express = require('express');
var router = express.Router();
var multer= require('multer');
let upload = multer();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', upload.none(), function(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  if(username === "user" && password === "pass"){
    res.json(true);
    return;
  }
  res.status(401);
  res.json(false);
});
module.exports = router;
