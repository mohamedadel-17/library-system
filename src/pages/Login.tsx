import  {LoginForm}  from "../components/forms/login-form.tsx"

// قم بتعديل تعريف نوع الـ Prop 'onLogin' ليقبل معامل 'role' من نوع string
export default function LoginPage({onLogin}: {onLogin: (role: string) => void}) {
  return (
    <>
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-secondary text-primary-foreground flex size-8 items-center justify-center rounded-md">
            <img src="/images/Logo.png" className="" alt="Logo" />
          </div>
          3la Allah Library
        </a>
        {/* تمرير onLogin التي تقبل الـ role */}
        <LoginForm onLogin={onLogin} />
      </div>
    </div>
    </>
  )
}