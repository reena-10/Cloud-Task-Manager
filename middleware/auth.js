const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // 1. Check karein ki header mein token hai ya nahi
  const token = req.header("x-auth-token");

  // Agar token nahi hai toh access mana kar dein
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // 2. Token ko verify karein (Yahan wahi Secret Key use karein jo login mein ki thi)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. User ki ID ko request object mein daal dein
    req.user = decoded.id;

    next(); // Agle step (Route) par bhejein
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
