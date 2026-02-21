import EditOrganizerProfileView from "@/features/organizerProfile/components/EditOrganizerProfileView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Organizer Profile - Dashboard",
  description: "Update your organizer profile details.",
};

export default function EditProfilePage() {
  return <EditOrganizerProfileView />;
}
