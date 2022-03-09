// comments.js

module.exports = (app, Comment) => {
  // NEW Comment
    app.post("/reviews/comments", (req, res) => {
        Comment.create(req.body).then((comment) => {
            console.log(comment)
            res.redirect(`/reviews/${comment.reviewId}`);
        }).catch((err) => {
            console.log(err.message);
        });
    res.send("reviews comment");
  });
};
