const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());


app.post("/your/page", function (req, res) {
    const show_modal = !!req.body.modal; // Cast to boolean
    res.render("page", { show_modal });
});