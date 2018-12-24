const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.users_get_all = (req, res) => {
  User.find({},function(err,task){
    if(err)
    res.send(err);
    res.json(task);
  });

};

exports.user_signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              username: req.body.username,
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              cake: req.body.cake,
              coffe: req.body.coffe,


              password: hash
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
};

exports.user_login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.users_get_user = (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    .select("email username first_name last_name coffe cake _id")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          user: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/user"
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};


exports.users_update_user = (req, res, next) => {
  const id = req.params.userId;
  const updateOps = {};

  //Method 1: Patch/Put in this way: 
  //[{"propName":"like", "value":"10"}]

  // for (const ops of req.body) {
  //   updateOps[ops.propName] = ops.value;
  // }

  //Method 2.0: Patch/Put in this way: 
  //{"like":"10"}

  // for (const key of Object.keys(req.body)) {
  //   updateOps[key] = req.body[key]
  // }
  
  //Method 2.1: Patch/Put in this way: 
  //{"like":"10"}
  for (const key in req.body) {
    updateOps[key] = req.body[key];
  }

  User.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/user/" + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};


exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
