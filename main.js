"use strict";

const express = require("express"),
    app = express(),
    homeController = require("./controllers/homeController"),
    // errorController = require("./controllers/errorController"),
    layouts = require("express-ejs-layouts");

app.set("view engine", "ejs");
app.use(layouts);

app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(express.static("public"));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.json());

app.set("port", process.env.PORT || 3000);
app.get("/", (req, res) => {
    res.render("index");
});
app.get("/students", homeController.showStudentView);
app.get("/about", homeController.showAbout);

app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});
