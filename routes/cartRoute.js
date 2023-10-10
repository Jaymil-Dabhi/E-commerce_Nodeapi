const express = require("express");
const cart_route = express();
const bodyParser = require("body-parser");
cart_route.use(bodyParser.json());
cart_route.use(bodyParser.urlencoded({extended:true}));

const auth = require("../middleware/auth");

const cart_controller = require("../controllers/cartController");

cart_route.post('/add-to-cart',auth,cart_controller.add_to_cart);

module.exports = cart_route;