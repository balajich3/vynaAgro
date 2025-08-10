const jwt = require("jsonwebtoken");

function verifyAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  // No Authorization header
  if (!authHeader) {
    return res.status(401).json({ msg: "Authorization header is missing" });
  }

  // Support both "Bearer <token>" and raw "<token>"
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  if (!token) {
    return res.status(401).json({ msg: "Token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if role is admin
    if (!decoded.role || decoded.role.toLowerCase() !== "admin") {
      return res.status(403).json({ msg: "Access denied: Admins only" });
    }

    // Attach decoded token payload to request object
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
}

module.exports = verifyAdmin;
