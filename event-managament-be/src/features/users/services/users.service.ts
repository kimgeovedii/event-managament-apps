import { UserPointRepository } from "src/features/userPoint/repositories/userPoint.repository.js";
import { UsersRepository } from "../repositories/users.repository.js";

export class UsersService {
  private UsersRepository = new UsersRepository();
  private UserPointRepository = new UserPointRepository();
  constructor() {
    this.UsersRepository = new UsersRepository();
    this.UserPointRepository = new UserPointRepository();
  }
  public create = async (data: any): Promise<any> => {
    throw new Error("Method not implemented.");
  };

  public findAll = async (): Promise<any[]> => {
    throw new Error("Method not implemented.");
  };

  public findOne = async (id: string): Promise<any> => {
    const user = await this.UsersRepository.findById(id);
    const userPointBalance = await this.UserPointRepository.getUserBalance(id);

    return {
      id: user?.id,
      name: user?.name,
      referralCode: user?.referralCode,
      userPointBalance: userPointBalance,
      memberSince: user?.createdAt,
    };
  };

  public update = async (id: number, data: any): Promise<any> => {
    throw new Error("Method not implemented.");
  };

  public delete = async (id: number): Promise<any> => {
    throw new Error("Method not implemented.");
  };

  public getPointsBalance = async (userId: number): Promise<any> => {
    throw new Error("Method not implemented.");
  };
}
