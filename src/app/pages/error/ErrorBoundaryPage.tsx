"use client";
import { Layout } from "../../../infraestructure/components/ui"

export const ErrorBoundaryPage = () => {
  return (
    <Layout>
      <section className="w-full flex flex-col justify-center items-center">
        <img
          src="/cuestionario/public/assets/NotFound.svg"
          //src="/assets/NotFound.svg"
          width={400}
          height={400}
          alt="error"
        />
        <h1 className="font-bold mt-20 text-emerald-600">Parece que hubo un error, intenta más tarde</h1>
      </section>
    </Layout>
  )
}
