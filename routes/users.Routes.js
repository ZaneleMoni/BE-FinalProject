const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/authJwt");

//Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Get one user
router.get("/:id", getUser, (req, res) => {
  res.json(res.user);
});

router.post("/signup", DuplicatedNameorEmail, async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      phone_number: req.body.phone_number,
    });
    const newUser = await user.save();
    res.status(201).json(newUser);
    console.log(salt);
    console.log(hashedPassword);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Sign in user

router.patch("/", async (req, res, next) => {
  const { name, password } = req.body;
  const user = await User.findOne({ name });
  if (!user) res.status(404).json({ message: "Could not find user" });
  if (await bcrypt.compare( password, user.password)) {
    try {
      const access_token = jwt.sign(
        JSON.stringify(user),
        process.env.ACCESS_TOKEN_SECRET
      );
      res.status(201).json({ jwt: access_token, user });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(400).json({ message: "Email and password do not match" });
  }
});


// router.patch("/", async (req, res) => {
//   try {
//     User.findOne({ name: req.body.name }, (err, user) => {
//       if (err) return handleError(err);
//       if (!user) {
//         return res.status(404).send({ message: "User Not found." });
//       }
//       let passwordIsValid = bcrypt.compareSync(
//         req.body.password,
//         user.password
//       );
//       if (!passwordIsValid) {
//         return res.status(401).send({
//           accessToken: null,
//           message: "Invalid Password!",
//         });
//       }
//       let token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
//         expiresIn: 86400, // 24 hours
//       });
//       res.status(201).json({ jwt: access_token, user});
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

//updated user
router.patch("/", [getUser, verifyToken],async (req, res) => {
  if (req.params.id != req.userId) {
    return res.status(401).send({ message: "Unauthorized!" });
  }
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.email != null) {
    req.body.email = req.body.email;
  }
  if (req.body.password) {
    req.body.password = req.body.password;
  }
  if (req.body.phone_number != null) {
    req.user.phone_number = req.body.phone_number;
  }
  if (req.body.join_date != null) {
    res.user.join_date = req.body.join_date;
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ mesage: err.message });
  }
});

//DELETING
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "user successfully deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//PATCH
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null)
      return res.status(404).json({ message: "cannot find user" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

async function DuplicatedNameorEmail(req, res, next) {
  let user;
  try {
    user = await User.findOne({ name: req.body.name });
    email = await User.findOne({ email: req.body.email });
    if (user || email) {
      return res.status(404).send({ message: "username already exists" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  next();
}
module.exports = router;