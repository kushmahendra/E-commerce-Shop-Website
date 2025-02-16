import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ;
const JWT_ALGORITHM = process.env.JWT_ALGORITHM ;

// 🛠️ **Generate Token**
export const generateToken = async (user) => {
    try {
      // Directly use the user passed into the function
      console.log(user);
      return jwt.sign(
        {
          userId: user._id,  // Pass only necessary information
          role: user.role,
        },
        JWT_SECRET,
        {
          expiresIn: JWT_EXPIRES_IN,  // Set expiration from environment variable
          algorithm: JWT_ALGORITHM,  // Algorithm for signing
        }
      );
    } catch (error) {
      console.error('Error generating token:', error.message);
      throw new Error('Failed to generate token');
    }
  };

// 🛠️ **Verify Token Middleware**
export const verifyToken = (req, res, next) => {
    try {
      // 1. Extract token from Authorization header
      const authHeader = req.headers.authorization;
      console.log('verifytoken33', req.headers);
      console.log('verifytoken22', req.headers.authorization);
      if (!authHeader ) {
        return res.status(401).json({ message: 'Authorization token missing or malformed' });
      }
  
      const token = authHeader.split(' ')[1];
  
      // 2. Verify the token
      const decoded = jwt.verify(token, JWT_SECRET);
  
      // 3. Attach decoded payload to `req`
      req.userId = decoded.userId;
      req.role = decoded.role;
  
      next();
    } catch (error) {
      console.error('Token verification error:', error.message);
  
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
      }
  
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
      }
  
      if (error.name === 'NotBeforeError') {
        return res.status(401).json({ message: 'Token not active yet' });
      }
  
      return res.status(500).json({ message: 'Failed to authenticate token' });
    }
  };
  