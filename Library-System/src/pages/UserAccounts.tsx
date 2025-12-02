import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Users } from "lucide-react";
import UserList from "@/components/admin/UserList";
import type { User } from "@/types/user";

export default function ActivityOverview({ users }: { users: User[] }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="bg-card text-card-foreground border border-border shadow-sm">
        
        <CardHeader className="flex items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-3">
            
            <div className="bg-accent p-2 rounded-md">
              <Users className="w-6 h-6 text-accent-foreground" />
            </div>

            <div>
              <CardTitle className="text-lg font-semibold">
                Activity Overview
              </CardTitle>

              <p className="text-sm text-muted-foreground">
                List of users with quick profile access.
              </p>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Total:
            <span className="font-medium text-foreground ml-1">
              {users.length}
            </span>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="p-0">
          <UserList users={users} />
        </CardContent>
      </Card>
    </div>
  );
}
