import React from "react";
// import type { User } from "../../types/user";
import ActiivityInfo from "./Actiivity";

// interface ProfileContentProps {
//   user: User;
// }

// const ProfileContent: React.FC<ProfileContentProps> = ({ user }) => {
const ProfileContent: React.FC = () => {
  return (
    <div className="p-6 sm:p-8 pt-4">
      {/* <ActiivityInfo user={user} /> */}
      <ActiivityInfo />
    </div>
  );
};

export default ProfileContent;


