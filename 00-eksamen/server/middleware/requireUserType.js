const requireUserType = (type) => {
  return (req, res, next) => {
    if (req.user.userType !== type) {
      return res.status(403).send({ error: 'Forbidden.' });
    }
    next();
  };
};

export default requireUserType;
