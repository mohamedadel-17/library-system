import React from "react";
import type { User } from "../../types/user";

const ProfileHeader: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="bg-background p-6 shadow-xl rounded-t-xl sm:p-8 border border-border">
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
        
        <img
          className="h-24 w-24 rounded-full object-cover border-4 border-yellow-500 shadow-md"
          src={"../src/assets/user-svgrepo-com.png"}
          alt="User avatar"
        />

        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-extrabold text-foreground">
            {user.Name}
          </h1>
          <p className="text-lg text-muted-foreground">
            {user.email}
          </p>
        </div>

      </div>
    </div>
  );
};

export default ProfileHeader;
