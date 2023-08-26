import jwt from "jsonwebtoken";
import { Response, Request , NextFunction} from "express";

class TokenService {

  generateToken(payload: string): string {
    const {AUTH_SECRET_KEY, SESSION_EXPIRE_TIME} = process.env;
    const secretKey = AUTH_SECRET_KEY as string;
    const expireTime = SESSION_EXPIRE_TIME as string;

    const token = jwt.sign({ data: payload }, secretKey, { expiresIn: expireTime });
    return token;
  }

  verifyToken(req: Request, res: Response, next: NextFunction){
    const {AUTH_SECRET_KEY} = process.env;
    const secretKey = AUTH_SECRET_KEY as string;

    const token = req.headers["authorization"];
    console.log(token);

    if (!token) {
      return res.status(401).send({ message: "You dont have permission" });
    }

    jwt.verify(token.substring(7), secretKey, (err: jwt.VerifyErrors | null) => {
      if (err) {
        console.log(err);
        return res.status(401).send({ message: "You dont have permission" });
      }
      next();
    });
  }
};

export default new TokenService;

