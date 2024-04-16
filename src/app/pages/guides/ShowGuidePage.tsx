import { useEffect } from "react";
import { guideService } from "../../../domain/services/guide.service"
import { PageLayout } from "../../../infraestructure/components/ui"
import { useParams } from "react-router-dom";
import { Button, Chip, Popover, PopoverContent, PopoverTrigger, Skeleton, Tooltip } from "@nextui-org/react";
import { InfoCircle, SectionIcon } from "../../../infraestructure/components/icons";
import { QuestionDetailItem, QuestionDetailList } from "../../../infraestructure/components/sections";


export const ShowGuidePage = () => {

  const { id } = useParams();
  const { startGetGuideDetail, detail, clearGuideDetail } = guideService();

  useEffect(() => {
    startGetGuideDetail(Number(id)!);
    return () => {
      clearGuideDetail();
    }
  }, []);

  return (
    <PageLayout title="Detalle del cuestionario">
      {
        detail ? (
          <h2 className="bg-gradient-to-r from-primary via-emerald-600 to-emerald-600 inline-block text-transparent py-5 bg-clip-text text-4xl lg:text-6xl font-bold">{detail?.name}</h2>
        ) : (
          <div className="mt-10 w-full h-[10rem]">
            <Skeleton className="w-full h-10 rounded-full my-2" />
            <Skeleton className="w-9/12 h-7 rounded-full my-2" />
          </div>
        )
      }
      <div className="flex justify-end my-5">
        <span className="text-emerald-600 text-2xl font-bold ml-auto">
          <Tooltip content={detail?.gradable ? 'El cuestionario es evaluativo por lo que las preguntas que pertenecen al cuestionario generan datos evaluativos' : 'El cuestionarion es informativo por lo que las preguntas que pertenecen al cuestionario genera datos de muestra'} color="foreground" className="max-w-[24rem]">
            <Chip variant="bordered" color={detail?.gradable ? 'success' : 'primary'} size="sm" className="cursor-pointer">{detail?.gradable ? 'Evaluativo' : 'Informativo'}</Chip>
          </Tooltip>
        </span>
      </div>
      <section className="w-full">
        {
          detail?.sections.map(section => (
            <div key={section.id}>
              <span className="mb-5 block">
                <span className="flex items-center [&>svg]:text-emerald-600 mt-1 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:mr-2">
                  <SectionIcon width={35} height={35} strokeWidth={1.5} />
                  <p className="font-bold">{section.name}</p>
                </span>
              </span>
              <div className="flex items-center justify-between">
                {
                  section.binary && (
                    <p className="text-sm font-bold">{section.question}</p>
                  )
                }
                {
                  section.canFinishGuide && (
                    <Popover placement="top" color="foreground">
                      <PopoverTrigger>

                        <Button
                          isIconOnly
                          className="flex items-center text-xs text-emerald-600 hover:bg-emerald-600/20 py-1 px-2 transition-all duration-300 bg-transparent"
                          size="sm"
                        >
                          <InfoCircle width={18} height={18} strokeWidth={2} />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="px-1 py-2">
                          <div className="text-small font-bold">Nota</div>
                          <div className="text-tiny">La pregunta puede finalizar el cuestionario y solo contiene respuestas binarias</div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  )
                }
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3 lg:gap-5">
                <QuestionDetailList
                  questions={section?.questions! || undefined}
                  renderChilds={(({ question, navigate }) => (
                    <QuestionDetailItem
                      navigate={navigate}
                      onPress={() => { }}
                      question={question}
                    />
                  ))}
                />
              </div>
            </div>
          ))
        }
      </section>
    </PageLayout>
  )
}
