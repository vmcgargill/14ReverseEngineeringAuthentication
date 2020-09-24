// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  
  // Post Login API
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Post Signup API
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Get Logout API
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Get User Data
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // GET route for getting all of the todos
  app.get("/api/todos", function(req, res) {
    if (!req.user) {
      res.json({});
    } else {
      db.Todo.findAll({ where: {user_id: req.user.id}}).then(function(dbTodo) {
        res.json(dbTodo);
      });
    }
  });

  // POST route for saving a new todo
  app.post("/api/todos", function(req, res) {
    if (!req.user) {
      res.json({});
    } else {
      db.Todo.create({
        text: req.body.text,
        complete: req.body.complete,
        user_id: req.user.id
      }).then(function(dbTodo) {
        res.json(dbTodo);
      });
    }
  });

  // DELETE route for deleting todos
  app.delete("/api/todos/:id", function(req, res) {
    db.Todo.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbTodo) {
        res.json(dbTodo);
      });

  });

  // PUT route for updating todos
  app.put("/api/todos", function(req, res) {
    db.Todo.update({
      text: req.body.text,
      complete: req.body.complete
    }, {
      where: {
        id: req.body.id
      }
    })
      .then(function(dbTodo) {
        res.json(dbTodo);
      });

  });
};
