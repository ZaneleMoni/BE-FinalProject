module.exports = function (req, res, next) {
  const header = req.header("auth-token");
  if (!header) return res.status(401).send("Access Denied");

  try {
    const bearer = header.split("");
    const token = bearer[1];
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    req.decoded = verified;
    next();
  } catch (err) {
    res.statut(400).send("Invalid token");
  }
};
