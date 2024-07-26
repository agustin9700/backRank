var express = require('express');
var router = express.Router();
const{users}= require("../controllers/index")

/* GET users listing. */
router.get('/',users );

module.exports = router;
