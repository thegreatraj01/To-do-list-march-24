import jwt from 'jsonwebtoken';
import User from  '../Schema/User-schema.js';

const handleUnauthorized = (res, message) => {
  return res.status(401).json({ message: `Unauthorized - ${message}` });
};

const protect = async (req, res, next) => {
  const tokenHeader = req.header('Authorization');
  // console.log("tokenHeader", tokenHeader);

  if (!tokenHeader) {
    return handleUnauthorized(res, 'No token provided');
  }

  // Remove the "Bearer " prefix
  const token = tokenHeader.replace('Bearer ', '');
  // console.log('token', token)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded, 'hi');

    req.user = await User.findById(decoded.userId).select('-password');
    next();
  } catch (error) {
    return handleUnauthorized(res, 'Invalid token');
  }
};



export default protect;
