import React from "react";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileContent from "../components/Profile/ProfileContent";

const ProfilePage: React.FC = () => {

  return (
    <div className="min-h-0.5 w-full p-2 sm:p-8 bg-background">
      <div className="max-w-4xl mx-auto bg-muted rounded-xl shadow-2xl border border-border">
        <ProfileHeader /> 
        <ProfileContent />
      </div>
    </div>
  );
};

export default ProfilePage;
