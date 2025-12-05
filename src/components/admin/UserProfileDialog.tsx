// src/components/admin/UserProfileDialog.tsx

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { User } from "../../services/services"; // تأكد من المسار

interface UserProfileDialogProps {
  user: User | null; // null عندما لا يكون هناك مستخدم محدد
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UserProfileDialog({ user, open, onOpenChange }: UserProfileDialogProps) {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
                <AvatarImage src="/src/assets/user-svgrepo-com.png" />
                <AvatarFallback>
                    {user.name?.split(" ").map(n => n[0]).slice(0, 2).join("")}
                </AvatarFallback>
            </Avatar>
            <span>{user.name}'s Profile</span>
          </DialogTitle>
          <DialogDescription>
            Detailed information about the user.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground">Email:</span>
            <span className="col-span-2 text-sm text-foreground break-all">{user.email}</span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground">Role:</span>
            <span className="col-span-2 text-sm text-foreground capitalize">{user.role}</span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground">Member Since:</span>
            <span className="col-span-2 text-sm text-foreground">
                {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>
          {/* يمكنك إضافة المزيد من التفاصيل هنا (مثل الكتب المستعارة، إلخ) */}
        </div>
      </DialogContent>
    </Dialog>
  );
}