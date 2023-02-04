const fs = require("fs");

let posts = [];
let categories = [];

const initialize = () => {
  return new Promise((resolve, reject) => {
    fs.readFile("./data/posts.json", "utf8", (err, data) => {
      if (err) {
        reject("unable to read file : posts.json");
        return;
      }
      posts = JSON.parse(data);
      fs.readFile("./data/categories.json", "utf8", (err, data) => {
        if (err) {
          reject("unable to read file : categories.json");
          return;
        }
        categories = JSON.parse(data);
        resolve();
      });
    });
  });
};

const getAllPosts = () => {
  return new Promise((resolve, reject) => {
    if (posts.length === 0) {
      reject("no results returned");
      return;
    }
    resolve(posts);
  });
};

const getPublishedPosts = () => {
  return new Promise((resolve, reject) => {
    const publishedPosts = posts.filter((post) => post.published === true);
    if (publishedPosts.length === 0) {
      reject("no results returned");
      return;
    }
    resolve(publishedPosts);
  });
};

const getCategories = () => {
  return new Promise((resolve, reject) => {
    if (categories.length === 0) {
      reject("no results returned");
      return;
    }
    resolve(categories);
  });
};

module.exports = {
  initialize,
  getAllPosts,
  getPublishedPosts,
  getCategories,
};
