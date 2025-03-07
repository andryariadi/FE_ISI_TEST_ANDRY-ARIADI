import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";

interface TokenPayload extends JwtPayload {
  userId: number;
  role: string;
}

const SECRET_KEY = process.env.SECRET_KEY as string;

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (userId: number, role: string): string => {
  return jwt.sign({ userId, role }, SECRET_KEY, { expiresIn: "1h" });
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, SECRET_KEY) as TokenPayload;
  } catch (error) {
    console.log(error, "<---verifyToken");
    return null;
  }
};
