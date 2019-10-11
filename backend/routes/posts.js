var express = require('express');
var router = express.Router();
var multer= require('multer');
let upload = multer();
var fs = require('fs')
    , ini = require('ini');
var config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'))
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : config.database.host,
  user     : config.database.user,
  password : config.database.password,
  database : config.database.database
});

console.log(config.database.user);

connection.connect();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let unarchive = req.query.archived === 'false';
  if(unarchive){
    connection.query(`Select id, title, created FROM posts WHERE archived = FALSE ORDER BY created DESC`, function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    });
  } else {
    connection.query(`Select id, title, created, archived FROM posts ORDER BY created DESC `, function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    });
  }

});

router.post('/', upload.none(), function(req, res, next) {
  let title = connection.escape(req.body.title);
  let postBody = connection.escape(req.body.body);

  let query = connection.query(`INSERT INTO posts (title, body) VALUES (${title}, ${postBody}) `, function (error, results, fields) {
    if (error) throw error;
  });

  res.sendStatus(200);
});

router.get('/:postId',function(req, res, next) {
  let postId = connection.escape(req.params.postId);
  let query = connection.query(`Select * FROM posts WHERE posts.id = ${postId}`, function (error, results, fields) {
    if (error) throw error;
    if(results.length === 0) results = [{}];
    res.json(results[0]);
  });
});

router.get('/:postId/comments',function(req, res, next) {
  let postId = connection.escape(req.params.postId);
  let query = connection.query(`Select * FROM comments WHERE comments.postId = ${postId}`, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });

});

router.post('/:postId/comments', upload.none(), function(req, res, next) {
  let postId = connection.escape(req.params.postId);
  let body = connection.escape(req.body.body);
  let query = connection.query(`INSERT INTO comments (body, postId) VALUES(${body} ,${postId} )`, function (error, results, fields) {
    if (error) throw error;
  });
  res.sendStatus(200);
});

router.delete('/:postId', function(req, res, next) {
  let postId = connection.escape(req.params.postId);
let query = connection.query(`Update posts SET archived = TRUE WHERE posts.id = ${postId}`, function (error, results, fields) {
  if (error) throw error;
});
res.sendStatus(200);

});

router.put('/:postId', upload.none(), function(req, res, next) {
  let postId = connection.escape(req.params.postId);
  let unarchive = req.query.archived === 'false';
  if(unarchive) {
    connection.query(`Update posts SET archived = FALSE WHERE posts.id = ${postId}`, function (error, results, fields) {
      if (error) throw error;
    });
  }
  else if(req.body.body && req.body.title){
    let title = connection.escape(req.body.title);
    let postBody = connection.escape(req.body.body);
    connection.query(`Update posts SET title = ${title}, body = ${postBody}  WHERE posts.id = ${postId}`, function (error, results, fields) {
      if (error) throw error;
    });
  }
  else{
    res.sendStatus(400);
    return;
  }
  res.sendStatus(200);
});

module.exports = router;
