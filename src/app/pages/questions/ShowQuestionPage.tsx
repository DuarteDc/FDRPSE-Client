import { useEffect } from 'react';
import { Card, PageLayout } from '../../../infraestructure/components/ui';
import { questionService } from '../../../domain/services/question.service';
import { useParams } from 'react-router-dom';


export const ShowQuestionPage = () => {

  const { id } = useParams();
  const { startShowQuestion, question, clearNewQuestionCache } = questionService();

  useEffect(() => {
    startShowQuestion(id!);
    return () => {
      clearNewQuestionCache();
    }
  }, []);

  return (
    <PageLayout title="Preguntas" navigateTo="/auth/questions">
      <section className="grid grid-cols-1">
        <h2 className="bg-gradient-to-r from-primary via-emerald-600 to-emerald-600 inline-block text-transparent py-5 bg-clip-text text-4xl lg:text-6xl font-bold">{question?.name}</h2>
        <div>
          <h3 className="my-5 text-2xl font-bold text-emerald-600">Detalles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {
              question?.section && (
                <Card title="Sección" subtitle={question?.section?.name} />
              )
            }
            {
              question?.category && (
                <Card title="Categoría" subtitle={question?.category?.name} />
              )
            }
            {
              question?.dimension && (
                <Card title="Dimension" subtitle={question?.dimension?.name} />
              )
            }
            {
              question?.domain && (
                <Card title="Dominio" subtitle={question?.domain?.name} />
              )
            }
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
