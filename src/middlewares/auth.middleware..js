












// adminOnly

const adminOnly = (req, res, next) => {
    // Check if user is an admin
    if (!req.user && !req.user.role === "admin") {
      return res.status(403).json({ msg: 'Unauthorized, user is not an admin' });
    }
    
    // User is an admin, proceed to next middleware or route handler
    next();
  };
  
  module.exports = isAdminMiddleware;
  