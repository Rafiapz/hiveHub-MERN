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
      expiresIn: 60 * 60 * 30,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const verifyToken = (token: string) => {
  try {
    const secret: any = process.env.jwtSecret;
    const verified = jwt.verify(token, secret);

    if (verified) {

      if (verified === "jwt expired") {
        return false;
      }

      const decodedToken = jwt.decode(token);

      if (decodedToken && typeof decodedToken === 'object' && decodedToken.hasOwnProperty('email')) {
        const email = decodedToken.email;
        const id=decodedToken.id
        return {email,id}
        
      }
    } else {
      return false;
    }
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
