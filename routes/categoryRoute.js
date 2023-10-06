const express = require("express");
const category_route = express();

const bodyParser = require("body-parser");
category_route.use(bodyParser.json());
category_route.use(bodyParser.urlencoded({extended:true}));

const auth = require("../middleware/auth");

const category_controller = require("../controllers/categoryController");

category_route.post('/add-category',auth,category_controller.addCategory);

category_route.get('/get-categories',auth,category_controller.get_categories);

category_route.put('/update-categories/:id',auth,category_controller.update_categories);

category_route.delete('/delete-categories/:id',auth,category_controller.delete_categories);




// category_route.post("/add-category",auth,)

module.exports = category_route;