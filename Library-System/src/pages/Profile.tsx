import React from "react";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileContent from "../components/Profile/ProfileContent";
import { MOCK_USER } from "../data/mockUser";

const ProfilePage: React.FC = () => {
  const user = MOCK_USER;

  return (
    <div className="min-h-screen w-full p-4 sm:p-8 bg-slate-50">
      <div className="max-w-4xl mx-auto bg-gray-100 rounded-xl shadow-2xl">
        <ProfileHeader user={user} />
        <ProfileContent user={user} />
      </div>
    </div>
  );
};

export default ProfilePage;
