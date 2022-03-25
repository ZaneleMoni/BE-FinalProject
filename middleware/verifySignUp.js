const User = require("../models/user")

checkDuplicateNameOrEmail = async (req, res, next) => {
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
};
module.exports = checkDuplicateNameOrEmail;
