import React from "react";
import type { User } from "../../types/user";
import ActiivityInfo from "./Actiivity";

const ProfileContent: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="p-6 sm:p-8 pt-4">
      <ActiivityInfo user={user} />
    </div>
  );
};

export default ProfileContent;
