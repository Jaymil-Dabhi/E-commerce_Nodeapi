const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/ECOM");

//user_routes
const user_routes = require("./routes/userRoute");

app.use('/api',user_routes);

//store routes
const store_routes = require("./routes/storeRoute");
app.use('/api',store_routes);

//category routes
const category_routes = require("./routes/categoryRoute");
app.use('/api',category_routes);


//subcategory routes
const subcategory_routes = require("./routes/subCategoryRoute");
app.use('/api',subcategory_routes);

// addproduct routes
const product_routes = require("./routes/productRoute");
app.use('/api',product_routes);

//common route
const common_route = require("./routes/commonRoute");
app.use('/api',common_route);

//cart route
const cart_route = require("./routes/cartRoute");
app.use('/api',cart_route);

app.listen(3000, function(){
    console.log("Server is ready");
});