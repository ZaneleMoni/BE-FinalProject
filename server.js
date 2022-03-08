const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");



mongoose.connect("mongodb+srv://zanelemoni:1A9yaTmTFa9gYLI5@zanelemoni.bqocf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

const usersRoutes = require('./routes/users.Routes');
const blogsRoutes = require ('./routes/blogs.Routes');
app.use('/users', usersRoutes);
app.use('/blogs', blogsRoutes);
app.use(cors());
app.use(express.json());

app.listen(process.env.PORT || 6000, () =>
  console.log(" Server started running at port : 6000 ")
);