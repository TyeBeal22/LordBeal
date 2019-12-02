//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Lord Beal is the dark lord of winterfel, manifested directly from the force. He is extremely athletic, intelligent, usually figuring out his opponents long before the duel. His friends refer to him as the GOAT of fifa, and overall dilusional. He's highly skilled in multiple fascets, and reads a ton. You'd never know all that he knows, although it is often displayed in action.";
const aboutContent = "HTML, CSS, Node, EJS, MongoDB, Java, Python, React, it Never stops.";
const contactContent = "Write some cool skills you've learned or are learning!";

const app = express();



app.set('view engine', 'ejs');



app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/LordBDB", {useNewUrlParser: true, useUnifiedTopology: true });

const postSchema = {

 title: String,

 content: String

};


const Post = mongoose.model("Post", postSchema);




app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      StartingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/contact", function(req, res){

res.render("contact", {cContent: contactContent});

});


app.get("/about", function(req, res){

res.render("about", {aContent: aboutContent});

});


app.get("/compose", function(req, res){

res.render("compose");

});

app.post("/compose", function(req, res){

  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody

  });

  post.save();


      res.redirect("/");


  });

app.get("/posts/:postId", function(req, res){

  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });

  });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
