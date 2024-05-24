import jwt from 'jsonwebtoken';
const genToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
  res.cookie('jwt', token, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};
export default genToken;
