import { Card, PageLayout } from "../../../infraestructure/components/ui"


export const ShowQuestionPage = () => {

  return (
    <PageLayout title="Preguntas" navigateTo="/admin/questions">
      <section className="grid grid-cols-1">
          <h2 className="bg-gradient-to-r from-primary via-emerald-600 to-emerald-600 inline-block text-transparent py-5 bg-clip-text text-6xl font-bold">El espacio donde trabajo me permite realizar mis actividades de manera segura e higiénica</h2>
        <div>
          <h3 className="my-5 text-2xl font-bold text-emerald-600">Grupos a los que pertenece</h3>
          <div className="grid grid-cols-4 gap-x-8">
            <Card title="Categoría" subtitle="Ambiente de trabajo" />
            <Card title="Dominio" subtitle="Condiciones en el ambiente de trabajo" />
            <Card title="Dimensión" subtitle="Condidicones peligrosas e inseguras" />
            <Card title="Instrucción" subtitle="Para responder las preguntas siguientes considere las condiciones ambientales de su centro de trabajo" />
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
