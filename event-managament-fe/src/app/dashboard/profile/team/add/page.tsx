import AddTeamMemberView from "@/features/organizerProfile/components/AddTeamMemberView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Team Member - Dashboard",
  description: "Invite a new user to join your organizer team.",
};

export default function AddTeamPage() {
  return <AddTeamMemberView />;
}
