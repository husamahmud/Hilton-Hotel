import jwt from 'jsonwebtoken';
import { createToken } from '../utilities/token.js';
import { AuthController } from '../controllers/auth.controller.js';

export const createToken = (dto, duration) => {
	return jwt.sign({
		id: dto.id, email: dto.email, role: dto.role
	}, process.env.TOKEN_SECRET, {expiresIn: duration})
}

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.status(401).send('Access Denied');

  try {
    const user = jwt.verify(token, process.env.TOKEN_SECRET); // expiration , invalid

    if (user.isDeleted) return res.status(401).send('Access Denied, User is deleted');

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      username: user.username,
      isDeleted: user.isDeleted,
    };
    next();
  } catch (err) {

    if (err.name === 'TokeExpirednError') { // 3d
      try {
        const refreshToken = req.headers['refresh-token']; // 5d
        if (!refreshToken) return res.status(401).send("User doesn't have a refresh token");

        const userDecoded = jwt.verify(refreshToken, process.env.TOKEN_SECRET);

        if (userDecoded.isDeleted) return res.status(401).send('Access Denied, User is deleted');

        const newPayLoad = {
          id: userDecoded.id,
          email: userDecoded.email,
          role: userDecoded.role,
          username: userDecoded.username,
          isDeleted: userDecoded.isDeleted,
        };

        const newToken = createToken(newPayLoad, '3d');

        const newRefreshToken = createToken(newPayLoad, '5d');

        req.user = {
          ...userDecoded,
          newToken,
          newRefreshToken,
        };
        next();

      } catch (err) {
        if (err.name === 'TokenExpiredError') {
          AuthController.logout(req, res);
          return res.status(401).send('Refresh token expired');
        }

        return res.status(401).send('Invalid refresh token');
      }
    } else {
      return res.status(401).send('Invalid token, Access Denied');
    }
  }
};
