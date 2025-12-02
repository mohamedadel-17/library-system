import React from "react";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileContent from "../components/Profile/ProfileContent";
import { MOCK_USERS } from "../data/mockUsers";

const ProfilePage: React.FC = () => {
  const user = MOCK_USERS[0];

  return (
    <div className="min-h-0.5 w-full p-2 sm:p-8 bg-background">
      <div className="max-w-4xl mx-auto bg-muted rounded-xl shadow-2xl border border-border">
        <ProfileHeader user={user} />
        {/* <ProfileContent user={user} /> */}
        <ProfileContent />
      </div>
    </div>
  );
};

export default ProfilePage;
