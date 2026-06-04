import { JwtPayLoad } from "../middleware/validateJwt";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayLoad;
    }
  }
}

export {};