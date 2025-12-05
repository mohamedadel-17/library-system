// --- START OF FILE UserList.tsx ---

import UserListItem from "./UserListItem";
import type  { User } from "../../services/services";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserProfileDialog from "./UserProfileDialog"; // <== استيراد الـ Dialog
import { useState } from "react"; // <== استيراد الـ useState

export default function UserList({ users }: { users: User[] }) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewProfile = (user: User) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };
  
  const handleCloseDialog = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setSelectedUser(null); // مسح المستخدم المحدد عند الإغلاق
    }
  };

  return (
    <>
      <ScrollArea className="h-[420px]">
        <ul className="divide-y divide-border">
          {users.map((user) => (
            <UserListItem 
              key={user.id} 
              user={user} 
              onViewProfile={handleViewProfile} // <== تمرير دالة الفتح
            />
          ))}
        </ul>
      </ScrollArea>
      
      {/* مكون الـ Pop-up (Dialog) */}
      <UserProfileDialog 
        user={selectedUser}
        open={isDialogOpen}
        onOpenChange={handleCloseDialog} // دالة للإغلاق من داخل الـ Dialog
      />
    </>
  );
}