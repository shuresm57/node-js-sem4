export function requireOrgType (orgType) {
  return (req, res, next) => {
    if (req.user?.orgType !== orgType) {
      return res.status(403).send({ error: 'Forbidden' });
    }
    next();
  };
}
