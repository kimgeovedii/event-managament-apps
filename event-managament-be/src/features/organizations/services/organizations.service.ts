import { OrganizationsRepository } from "../repositories/organizations.repository.js";

export class OrganizationsService {
  private repository: OrganizationsRepository;

  constructor() {
    this.repository = new OrganizationsRepository();
  }

  /**
   * Create a new Organizer profile for a user.
   * The user becomes the OWNER and gets the ORGANIZER role.
   */
  public create = async (
    userId: string,
    data: { name: string; description?: string },
  ): Promise<any> => {
    // Check if user already owns an organizer
    const existing = await this.repository.findByOwnerId(userId);
    if (existing) {
      throw { status: 400, message: "You already own an organizer profile" };
    }

    // Validate name
    if (!data.name || data.name.trim().length === 0) {
      throw { status: 400, message: "Organizer name is required" };
    }

    return await this.repository.create({
      ownerId: userId,
      name: data.name.trim(),
      description: data.description?.trim(),
    });
  };

  public findAll = async (): Promise<any[]> => {
    return await this.repository.findMany();
  };

  public findOne = async (id: string): Promise<any> => {
    const organizer = await this.repository.findById(id);
    if (!organizer) {
      throw { status: 404, message: "Organizer not found" };
    }
    return organizer;
  };

  public update = async (id: string, data: any): Promise<any> => {
    const organizer = await this.repository.findById(id);
    if (!organizer) {
      throw { status: 404, message: "Organizer not found" };
    }
    return await this.repository.update(id, data);
  };

  public delete = async (id: string): Promise<any> => {
    const organizer = await this.repository.findById(id);
    if (!organizer) {
      throw { status: 404, message: "Organizer not found" };
    }
    return await this.repository.delete(id);
  };

  /**
   * Add a team member to an organizer by email.
   * The requesting user must be OWNER or ADMIN of the organizer.
   */
  public addMember = async (
    organizerId: string,
    requestingUserId: string,
    data: { email: string; role?: "ADMIN" | "MEMBER" },
  ): Promise<any> => {
    // 1. Check organizer exists
    const organizer = await this.repository.findById(organizerId);
    if (!organizer) {
      throw { status: 404, message: "Organizer not found" };
    }

    // 2. Check requesting user is OWNER or ADMIN
    const requesterTeam = await this.repository.getTeamRole(
      organizerId,
      requestingUserId,
    );
    if (!requesterTeam || !["OWNER", "ADMIN"].includes(requesterTeam.role)) {
      throw {
        status: 403,
        message: "Only OWNER or ADMIN can invite team members",
      };
    }

    // 3. Find the user to invite by email
    const userToInvite = await this.repository.findUserByEmail(data.email);
    if (!userToInvite) {
      throw {
        status: 404,
        message: `No user found with email: ${data.email}`,
      };
    }

    // 4. Check user is not already a member
    const existingMember = await this.repository.findTeamMember(
      organizerId,
      userToInvite.id,
    );
    if (existingMember) {
      throw { status: 400, message: "User is already a team member" };
    }

    // 5. Add as member
    return await this.repository.addMember({
      organizerId,
      userId: userToInvite.id,
      role: data.role || "MEMBER",
    });
  };

  /**
   * Remove a team member from an organizer.
   * Cannot remove the OWNER.
   */
  public removeMember = async (
    organizerId: string,
    requestingUserId: string,
    targetUserId: string,
  ): Promise<any> => {
    // Check requesting user is OWNER or ADMIN
    const requesterTeam = await this.repository.getTeamRole(
      organizerId,
      requestingUserId,
    );
    if (!requesterTeam || !["OWNER", "ADMIN"].includes(requesterTeam.role)) {
      throw {
        status: 403,
        message: "Only OWNER or ADMIN can remove team members",
      };
    }

    // Cannot remove the OWNER
    const targetTeam = await this.repository.getTeamRole(
      organizerId,
      targetUserId,
    );
    if (!targetTeam) {
      throw { status: 404, message: "Team member not found" };
    }
    if (targetTeam.role === "OWNER") {
      throw { status: 400, message: "Cannot remove the organizer owner" };
    }

    return await this.repository.deleteMember(organizerId, targetUserId);
  };
}
