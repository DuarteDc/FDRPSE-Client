import { LoginForm } from '../../../infraestructure/components/auth';

export const LoginPage = () => {
  return (
    <section className="min-h-screen flex items-center flex-col justify-center px-40 relative overflow-hidden">
      <span className="bg-emerald-500 absolute w-6/12 h-[300px] -top-60 -right-60 -z-30 rounded-full"></span>
      <span className="bg-emerald-500 absolute w-6/12 h-[300px] -bottom-60 -left-60 -z-30 rounded-full"></span>
      <div className="grid grid-cols-3 w-full">
        <div className="flex items-center justify-center col-span-2">
          <img
            src="/assets/signin.svg"
            width={600}
            height={500}
          />
        </div>
        <LoginForm />
      </div>
    </section>
  )
}

