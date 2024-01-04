import { Card, PageLayout } from "../../../infraestructure/components/ui"


export const ShowQuestionPage = () => {

  return (
    <PageLayout title="Preguntas" navigateTo="/admin/questions">
      <section className="grid grid-cols-2">
        <div className="flex items-center">
          <h2 className="bg-gradient-to-r from-primary to-emerald-600 inline-block text-transparent bg-clip-text text-6xl font-bold py-5">El espacio donde trabajo me permite realizar mis actividades de manera segura e higiénica</h2>
        </div>
        <div>
          <h3 className="my-5 text-2xl font-bold text-emerald-600">Grupos a los que pertenece</h3>
          <div className="grid grid-cols-3 gap-2">
            <Card title="Categoría" subtitle="Ambiente de trabajo" />
            <Card title="Dominio" subtitle="Condiciones en el ambiente de trabajo" />
            <Card title="Dimensión" subtitle="Condidicones peligrosas e inseguras" />
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
