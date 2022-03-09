const express = require("express");
const app = express();

// SHOW
module.exports = (app, Comment) => {
    app.get("/review/:id", (req, res) => {
        // find review
        Review.findById(req.params.id)
            .then((review) => {
                // fetch its comments
                Comment.find({ reviewId: req.params.id }).then((comments) => {
                    // respond with the template with both values
                    res.render("review-show", { review: review, comments: comments });
                });
            })
            .catch((err) => {
                // catch errors
                console.log(err.message);
            });
    });
}
