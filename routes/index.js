var express = require('express');
var router = express.Router();
const{home}= require("../controllers/index")

/* GET home page. */
router.get('/',home);

module.exports = router;
