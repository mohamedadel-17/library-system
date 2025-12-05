import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Users } from "lucide-react";
import UserList from "@/components/admin/UserList";
import { useState, useEffect, useCallback } from "react"; // <== إضافة الـ Hooks
import { getAllUsers } from "../services/services"; // <== استيراد الخدمة والـ Type
import type { User } from "../services/services";

// لم يعد يستقبل الـ users كـ prop
export default function ActivityOverview() { 
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // دالة جلب المستخدمين
  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getAllUsers(); // <== تنفيذ الـ request هنا
      setUsers(data); 
    } catch (error) {
      console.error("Failed to fetch users:", error);
      // يمكنك إضافة رسالة خطأ مناسبة هنا
    } finally {
      setIsLoading(false);
    }
  }, []);

  // تشغيل الـ request عند تحميل المكون
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-lg mt-10">Loading user data...</p>
      </div>
    );
  }

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
          {/* تمرير البيانات التي تم جلبها داخلياً */}
          <UserList users={users} />
        </CardContent>
      </Card>
    </div>
  );
}