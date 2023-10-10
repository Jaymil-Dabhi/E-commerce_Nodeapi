const express = require("express");
const common_route = express();
const bodyParser = require("body-parser");

common_route.use(bodyParser.json());
common_route.use(bodyParser.urlencoded({extended:true}));

const auth = require("../middleware/auth");

const common_controller = require("../controllers/commonController");

common_route.get('/data-count',auth,common_controller.data_count);

module.exports = common_route;

