import { AuthRepository } from "../repositories/auth.repository.js";
import bcrypt from "bcryptjs";
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "../types/auth.types.js";

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
    const checkUserLogin = await this.AuthRepository.findByEmail(data.email);

    if (checkUserLogin) {
    }
  };

  public generateTokens = async (user: AuthResponse): Promise<any> => {
    // TODO: Implement JWT generation
  };
}
