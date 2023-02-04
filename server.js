var express = require("express");
var app = express();
const path = require("path");
app.use(express.static("public"));

// Blog Service Module
const blogService = require("./blog-service");

// setup a 'route' to listen on the default url path
app.get("/", (req, res) => {
  res.redirect("/about");
});

// setup another route to listen on /about
app.get("/about", function (req, res) {
  res.sendFile(path.join(__dirname, "/views/about.html"));
});

// setup another route to listen on /blog
app.get("/blog", (req, res) => {
  blogService
    .getPublishedPosts()
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

// setup another route to listen on /posts
app.get("/posts", (req, res) => {
  blogService
    .getAllPosts()
    .then((posts) => {
      res.json(posts);
    })
    .catch((error) => {
      res.json({ message: error });
    });
});

// setup another route to listen on /categories
app.get("/categories", (req, res) => {
  blogService
    .getCategories()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

// Route for unmatched routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "/views/404.html"));
});

// Start the server
const port = process.env.PORT || 8080;
blogService
  .initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(`Error starting server: ${error}`);
  });
