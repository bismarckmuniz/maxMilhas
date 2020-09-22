var express = require('express');
var router = express.Router();

/* Requisitar as lista para usuario. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
