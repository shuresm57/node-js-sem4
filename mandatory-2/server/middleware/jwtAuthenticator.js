import jwt from 'jsonwebtoken';


// TODO: Use in routes that need protection
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).send({ error: 'Access Denied' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(401).send({ error: 'Invalid Token' });

    req.user = user;
    next();
  });
};

export default authenticateJWT;
