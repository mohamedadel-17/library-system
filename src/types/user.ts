export interface User {
  id: string;
  name: string;      // لاحظ camelCase بدل Name
  email: string;
  role: "admin" | "user";
}
