import { Button } from "@nextui-org/react"

export const SuccessAnswer = () => {
  return (
    <div className="flex flex-col items-center justify-center">
        <img src="/assets/completed.svg" alt="Completed-icon" width={300} height={300} className="mt-20"/>
        <h1  className="bg-gradient-to-r from-primary via-emerald-600 to-emerald-600 inline-block text-transparent py-5 bg-clip-text text-3xl md:text-4xl lg:text-6xl font-bold mt-10 mb-5">Gracias por tus respuestas</h1>
        <p className="text-gray-500 font-bold text-sm">No es necesario que realices otra encuestas, recuerda que las respuestas son de forma anonima</p>
        <Button className="bg-slate-800 text-white mt-10 w-full lg:w-2/12 py-6 font-bold">
            Salir
        </Button>
    </div>
  )
}
