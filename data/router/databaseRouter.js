const express = require("express");

const userDb = require("../helpers/userDb");
const postDb = require("../helpers/postDb");

const router = express.Router();

// custom shortcuts
const error = (status, message, res) => {
  res.status(status).json({ error: message });
};
// middleware
const nameCheckMw = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
      error(404, 'Name must be included', res);
      next();
    } else {
      next();
    }
  };

// ******* user userDb ********
//get users
router.get("/users", (req, res) => {
  userDb
    .get()
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      return error(500, "Database boof", res);
    });
});
// getuserbyid
router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  userDb
    .getById(id)
    .then(user => {
      if (user == 0) {
        return error(404, " no user by that id", res);
      } else {
        return res.json(user);
      }
    })
    .catch(err => {
      return error(500, "Database boof", res);
    });
});
// getuserpost
router.get("/users/posts/:userId", (req, res) => {
  const { userId } = req.params;
  userDb
    .getUserPosts(userId)
    .then(usersposts => {
      if (usersposts === 0) {
        return error(404, "no posts by that user", res);
      }
      res.json(usersposts);
    })
    .catch(err => {
      return error(500, "database boof", res);
    });
});
// insert user
router.post("/users", nameCheckMw, (req, res) => {
  const { name } = req.body;
  userDb
    .insert({ name })
    .then(add => {
      res.json(add);
    })
    .catch(err => {
      return error(500, "error posting user", res);
    });
});

//update user
router.put("/users/:id", nameCheckMw, (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    userDb
      .update(id, { name })
      .then(response => {
        if (response === 0) {
          return error(404, 'No user by that id');
        } else {
        db
          .find(id)
          .then(user => {
            res.json(user);
          });
        }
      })
      .catch(err => {
        return error(500, 'Database boof', res);
      });
  });

// remove user
router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  userDb
    .remove(id)
    .then(deleted => {
      if (deleted === 0) {
        return error(404, "no user by that id");
      } else {
        res.json({ success: `deleted user: ${id}` });
      }
    })
    .catch(err => {
      return error(500, "deleting", res);
    });
});





// ******** posts postDb ********
//get posts
router.get("/posts", (req, res) => {
  postDb
    .get()
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      return error(500, "Database boof", res);
    });
});
// get posts byid
router.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  postDb
    .getById(id)
    .then(user => {
      if (user == 0) {
        return error(404, " no user by that id", res);
      } else {
        return res.json(user);
      }
    })
    .catch(err => {
      return error(500, "Database boof", res);
    });
});

// insert posts
router.post("/posts",  (req, res) => {
    const { user_id, text } = req.body;
    console.log(req.body)
  postDb
    .insert({text, user_id  })
    .then(add => {
      res.json(add);
    })
    .catch(err => {
      return error(500, "error posting text", res);
    });
});

router.put("/posts/:id", (req, res) => {
    const { id } = req.params;
    
    postDb
      .update(id)
      .then(response => {
        if (response === 0) {
          return error(404, 'No post by that id');
        } else {
        db
          .find(id)
          .then(user => {
            res.json(user);
          });
        }
      })
      .catch(err => {
        return error(500, 'Database boof', res);
      });
  });
//deleting posts
router.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  postDb
    .remove(id)
    .then(deleted => {
      if (deleted === 0) {
        return error(404, "no user by that id");
      } else {
        res.json({ success: `deleted post: ${id}` });
      }
    })
    .catch(err => {
      return error(500, "deleting", res);
    });
});

module.exports = router;
