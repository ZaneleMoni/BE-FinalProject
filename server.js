require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
app.get("/", (req, res) => { res.send("welcome to Zanele's application") })
  
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

const usersRoutes = require("./routes/users.Routes");
const blogsRoutes = require("./routes/blogs.Routes");



app.use(cors());
app.use(express.json());
app.use("/users", usersRoutes);
app.use("/blogs", blogsRoutes);




app.listen(process.env.PORT || 9339, () =>
  console.log("server running on port 9333")
);
