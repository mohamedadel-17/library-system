import UserListItem from "./UserListItem";
import type { User } from "../../types/user";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function UserList({ users }: { users: User[] }) {
  return (
    <ScrollArea className="h-[420px]">
      <ul className="divide-y divide-border">
        {users.map((user) => (
          <UserListItem key={user.id} user={user} />
        ))}
      </ul>
    </ScrollArea>
  );
}
