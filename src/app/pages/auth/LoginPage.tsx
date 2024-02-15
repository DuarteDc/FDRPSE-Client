import { LoginForm } from '../../../infraestructure/components/auth';

export const LoginPage = () => {
  return (
    <main className="relative overflow-hidden flex flex-col justify-center items-center">
      <section className="w-full px-5 xl:px-28 max-w-[2000px] flex flex-col justify-center items-center min-h-screen">
        <span className="bg-emerald-500 absolute w-full lg:w-6/12 h-[150px] lg:h-[300px] -top-28 lg:-top-56 -right-20 lg:-right-60 -z-30 rounded-full shadow-lg"></span>
        <span className="bg-emerald-500 absolute w-full lg:w-6/12 h-[150px] lg:h-[300px]  -bottom-28 lg:-bottom-60 -left-20 lg:-left-60 -z-30 rounded-full shadow-lg rotate-180"></span>
        <div className="grid grid-cols-1 lg:grid-cols-7 w-full">
          <div className="flex items-center justify-center col-span-4">
            <img
              src="/assets/signin.svg"
              width={80}
              height={80}
              alt="Icon-login"
              className="w-[8rem] h-[8rem] md:w-[20rem] md:h-[20rem] xl:w-[35rem] lg:h-[35rem]"
            />
          </div>
          <LoginForm />
        </div>
      </section>
    </main>
  )
}

