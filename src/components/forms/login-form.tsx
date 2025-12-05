import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { login } from "../../services/services"
import type { LoginDto } from "../../services/services"

interface LoginFormProps extends React.ComponentPropsWithoutRef<"form"> {
  onLogin: (role: string) => void;
}
const saveAuthData = (token: string, user: { id: string, role: string }) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userId', user.id);
    localStorage.setItem('userRole', user.role);
};
export function LoginForm({
  onLogin,
  className,
  ...props
}: LoginFormProps) {
  
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    
    const payload: LoginDto = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    }

    try {
        const res = await login(payload);
        
        // 1. حفظ بيانات المستخدم في الـ localStorage
        saveAuthData(res.token, { id: res.user.id || "", role: res.user.role });
        
        // 2. تحديث حالة التطبيق (App.tsx)
        onLogin(res.user.role);
    
        
    } catch (error) {
        console.error("Login failed:", error);
        alert("Login failed. Check your email and password.");
    }
  }

  return (
    // @ts-ignore
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Ahmed@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" name="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit">
                  Login
                </Button>
                
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link to="/signup" className="text-blue-600 hover:underline">
                    Sign up
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}