import type { User } from "../../types/user";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function UserListItem({ user }: { user: User }) {
  const navigate = useNavigate();

  return (
    <li className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-accent transition-colors">
      <div className="flex items-center gap-4 min-w-0">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src ="/src/assets/user-svgrepo-com.png"
          />
          <AvatarFallback>
            {user.Name.split(" ").map(n => n[0]).slice(0, 2).join("")}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <div className="text-sm font-medium text-foreground truncate">
            {user.Name}
          </div>
          <div className="text-xs text-muted-foreground truncate">
            {user.email}
          </div>
        </div>
      </div>

      <Button
        size="sm"
        variant="ghost"
        onClick={() => navigate(`/users/${user.id}`)}
        className="hover:bg-accent underline  text-cyan-600"
      >
        View Profile
      </Button>
    </li>
  );
}
