import { verifyToken } from './jwtUtils';

export const authMiddleware = (handler) => async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Assuming the token is sent as "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  req.user = decoded; // Add the decoded token to the request object
  return handler(req, res); // Proceed to the actual handler
};
