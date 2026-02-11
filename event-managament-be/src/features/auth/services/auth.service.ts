import { AuthRepository } from "../repositories/auth.repository.js";
import bcrypt from "bcryptjs";
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "../types/auth.types.js";
import jwt from "jsonwebtoken";
import { UserPointRepository } from "src/features/userPoint/repositories/userPoint.repository.js";
import { prisma } from "src/config/prisma.js";
import { VoucherRepository } from "src/features/voucher/repositories/voucher.repository.js";

export class AuthService {
  private UserPointRepository = new UserPointRepository();
  private AuthRepository = new AuthRepository();
  private VoucherRepository = new VoucherRepository();
  constructor() {
    this.AuthRepository = new AuthRepository();
    this.UserPointRepository = new UserPointRepository();
    this.VoucherRepository = new VoucherRepository();
  }
  public register = async (data: RegisterRequest): Promise<any> => {
    // TODO: Implement registration logic
    const checkExistingUser = await this.AuthRepository.findByEmail(data.email);
    if (checkExistingUser) {
      throw new Error("email has been already taken");
    }
    const hashPassword = await bcrypt.hash(data.password, 10);
    const friendReferralCode = data.referralCode;
    const myNewReferralCode = `REF-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    let referrerId: string | undefined;

    if (friendReferralCode) {
      const referrer =
        await this.AuthRepository.findUserByReferralCode(friendReferralCode);
      if (!referrer) {
        throw new Error("kode referral tidak valid!");
      }
      referrerId = referrer.id;
    }
    return await prisma.$transaction(async (tx) => {
      const newUser = await this.AuthRepository.createUser({
        ...data,
        password: hashPassword,
        referralCode: `REF-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      });
      const referal = data.referralCode;
      if (referal) {
        const owner = await this.AuthRepository.findUserByReferralCode(referal);
        if (owner) {
          const expiredAt = new Date();
          expiredAt.setMonth(expiredAt.getMonth() + 3);
          await this.UserPointRepository.addPoint(
            owner.id,
            10000,
            expiredAt,
            tx,
          );
          const personalCode =
            `REF-${newUser.id.substring(0, 5)}-${Math.random().toString(36).substring(2, 5)}`.toUpperCase();
          await this.VoucherRepository.createVoucher(
            {
              name: `Referral Discount for ${newUser.email}`,
              code: personalCode,
              amount: 10, // 10%
              maxClaim: 1, // Hanya bisa dipakai 1x
              startDate: new Date(),
              endDate: expiredAt, // Expire dalam 3 bulan
            },
            tx,
          );
        }
      }

      return newUser;
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

  public getMe = async (id: string): Promise<any> => {
    const user = await this.AuthRepository.findById(id);
    if (!user) {
      throw new Error("user not found");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      referralCode: user.referralCode,
      role: user.role,
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
