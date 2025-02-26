import process from 'node:process';
import jwt from 'jsonwebtoken';

export const generateJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRETE_KEY, {expiresIn: '1h'});
  return token;
};

export const checkPassword = async (employee, password) => {
  return employee.comparePassowrds(password);
};
export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.Authorization || req.headers.authorization;
    if (!token) {
      const error = new Error('you have to login');
      error.status = 404;
      throw error;
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRETE_KEY);
    req.employee=decodedToken;
    if (!decodedToken) {
      const error = new Error('invalid login');
      error.status = 404;
      throw error;
    }
    next();
  } catch (err) {
    next(err);
  }
};
