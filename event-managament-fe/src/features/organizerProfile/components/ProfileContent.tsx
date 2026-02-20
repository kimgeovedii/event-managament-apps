import React from "react";
import ProfileHeaderCard from "./ProfileHeaderCard";
import AboutOrganizerCard from "./AboutOrganizerCard";
import OrganizerSettingsCard from "./OrganizerSettingsCard";
import TeamCard from "./TeamCard";
import { useOrganizerProfile } from "../hooks/useOrganizerProfile";

const ProfileContent: React.FC = () => {
  const { data: organizer, loading, error, user, refetch } = useOrganizerProfile();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4F46E5]"></div>
      </div>
    );
  }

  if (error || !organizer) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        <p>{error || "Organizer profile not found"}</p>
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
      <ProfileHeaderCard organizer={organizer} user={user} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 space-y-4">
          <AboutOrganizerCard organizer={organizer} />
          {user?.id === organizer?.ownerId && (
            <OrganizerSettingsCard organizer={organizer} user={user} />
          )}
        </div>
        <div className="space-y-4">
          <TeamCard organizer={organizer} user={user} refetch={refetch} />
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
