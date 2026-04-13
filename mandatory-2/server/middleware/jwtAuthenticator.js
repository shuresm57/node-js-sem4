import jwt from 'jsonwebtoken';

// TODO: Use in routes that need protection
export const requireAuth = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).send({ error: 'Access Denied' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(401).send({ error: 'Invalid Token' });
    req.user = user;
    next();
  });
};
