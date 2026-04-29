const requireUserRole = (admin) => {
  return (req, res, next) => {
    if (req.user.userRole !== admin) {
      return res.status(403).send({ error: 'Admin access is required to perform this action.' });
    }
    next();
  };
};

export default requireUserRole;
