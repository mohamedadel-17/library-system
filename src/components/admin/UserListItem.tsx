import type { User } from "../../services/services";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// تغيير الـ props لقبول دالة لفتح الـ Dialog
export default function UserListItem({ user, onViewProfile }: { user: User, onViewProfile: (user: User) => void }) {
  // const navigate = useNavigate(); // تم إزالته
  const navigate = useNavigate();

  return (
    <li className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-accent transition-colors">
      <div className="flex items-center gap-4 min-w-0">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src ="/src/assets/user-svgrepo-com.png"
          />
          <AvatarFallback>
            {user.name?.split(" ").map(n => n[0]).slice(0, 2).join("")}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <div className="text-sm font-medium text-foreground truncate">
            {user.name}
          </div>
          <div className="text-xs text-muted-foreground truncate">
            {user.email}
          </div>
        </div>
      </div>

      <Button
        size="sm"
        variant="ghost"
        // onClick الجديد: يستدعي الدالة لتحديد المستخدم وفتح الـ Dialog
        onClick={() => navigate(`/users/${user.id}`)}
        className="hover:bg-accent underline  text-cyan-600"
      >
        View Profile
      </Button>
    </li>
  );
}