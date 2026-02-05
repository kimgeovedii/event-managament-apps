import { AuthRepository } from "../repositories/auth.repository.js";
import bcrypt from "bcryptjs";
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "../types/auth.types.js";
import jwt from "jsonwebtoken";

export class AuthService {
  private AuthRepository = new AuthRepository();
  constructor() {
    this.AuthRepository = new AuthRepository();
  }
  public register = async (data: RegisterRequest): Promise<any> => {
    // TODO: Implement registration logic
    const checkExistingUser = await this.AuthRepository.findByEmail(data.email);
    if (checkExistingUser) {
      throw new Error("email has been already taken");
    }

    const hashPassword = await bcrypt.hash(data.password, 10);

    return await this.AuthRepository.create({
      ...data,
      password: hashPassword,
      referralCode: `REF-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
    });
  };

  public login = async (data: LoginRequest): Promise<any> => {
    // TODO: Implement login logic
    const user = await this.AuthRepository.findByEmail(data.email);

    if (!user) {
      throw new Error("invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error("invalid email or password");
    }
    const token = await this.generateTokens(user);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      ...token,
    };
  };

  public generateTokens = async (user: any): Promise<any> => {
    // TODO: Implement JWT generation
    const payload = { id: user.id, role: user.role };
    const secret = process.env.JWT_SECRET || "rahasia bro";

    const accessToken = jwt.sign(payload, secret, { expiresIn: "1h" });
    const refreshToken = jwt.sign(payload, secret, { expiresIn: "7d" });

    return {
      accessToken,
      refreshToken,
    };
  };
}
