import jwt, { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongodb";

interface MyToken {
  id: ObjectId,
  email: string,
  iat: number,
  exp: number
}

export const genereateToken = (payload: any) => {
  try {
    const secret: any = process.env.jwtSecret;

    return jwt.sign(payload, secret, {
      algorithm: "HS256",
      expiresIn: 60 * 60,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};



export const getTokenPayloads = (token: string) => {
  try {
    const secret: any = process.env.jwtSecret;
    const decoded = jwt.verify(token, secret) as { [key: string]: any };

    if (decoded) {
      return decoded;
    } else {
      return null;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const verifyToken = (token: string) => {
  try {
    const secret: any = process.env.jwtSecret;
    const decoded = jwt.verify(token, secret) as { [key: string]: any };


    if (decoded) {
      return decoded;
    } else {
      throw new Error('Failed to verify token')
    }
  } catch (error: any) {
    throw new Error(error);
  }
}

export const generateResetPasswordToken = (payload: any) => {

  try {

    const secret: any = process.env.jwtSecret;

    return jwt.sign(payload, secret, {
      algorithm: "HS256",
      expiresIn: 60 * 10,
    });

  } catch (error: any) {
    throw new Error(error)
  }
}
