const express = require("express");

const subcategory_route = express();

const bodyParser = require("body-parser");
subcategory_route.use(bodyParser.json());
subcategory_route.use(bodyParser.urlencoded({extended:true}));

const auth = require("../middleware/auth");

const subcategory_controller = require("../controllers/subCategoryController");

subcategory_route.post("/add-sub-category",auth,subcategory_controller.create_subcategory);

subcategory_route.get("/get-sub-category",auth,subcategory_controller.get_subcategories);

subcategory_route.put("/update-sub-category/:id",auth,subcategory_controller.update_subcategories);

subcategory_route.delete("/delete-sub-category/:id",auth,subcategory_controller.delete_subcategories);


module.exports = subcategory_route;