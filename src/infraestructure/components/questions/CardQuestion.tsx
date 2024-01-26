import { ReactNode, memo } from 'react';
import { BoxIcon, CategoryIcon, DimensionsIcon, QuestionIcon, StarsIcon } from '../icons'
import { QuestionDetail } from '../../context/questions'
import { Button, Card } from '@nextui-org/react';

interface Props {
    question: QuestionDetail;
    showOptionQualification: boolean;
    buttonFunction?: () => void;
    renderContent?: () => ReactNode;
}

export const CardQuestion = memo(({ question, showOptionQualification, buttonFunction, renderContent }: Props) => {

    return (
        <div className="border-2 border-emerald-600 rounded-xl p-5 my-2 font-bold text-gray-600">
            {showOptionQualification && (
                <Button color="primary" startContent={<StarsIcon />} className="float-right" onClick={buttonFunction}>
                    {question?.qualification ? 'Cambiar Calificación' : 'Agregar Calificación'}
                </Button>
            )}
            <div className="py-2">
                <span className="flex font-bold items-center [&>svg]:p-2  [&>svg]:bg-emerald-600/20 [&>svg]:rounded-lg [&>svg]:border-1 [&>svg]:border-emerald-600 [&>svg]:mr-2">
                    <QuestionIcon width={35} height={35} />
                    Pregunta:
                </span>
                <h3 className="text-sm">{question.question}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 [&>div]:text-xs">
                <div className="py-2">
                    <span className="flex font-bold items-center [&>svg]:p-2  [&>svg]:bg-emerald-600/20 [&>svg]:rounded-lg [&>svg]:border-1 [&>svg]:border-emerald-600 [&>svg]:mr-2">
                        <CategoryIcon width={30} height={30} />
                        Categoría:
                    </span>
                    <h3>{question?.category?.name}</h3>
                </div>
                <div className="py-2">
                    <span className="flex font-bold items-center [&>svg]:p-2  [&>svg]:bg-emerald-600/20 [&>svg]:rounded-lg [&>svg]:border-1 [&>svg]:border-emerald-600 [&>svg]:mr-2">
                        <BoxIcon width={30} height={30} />
                        Dominio:
                    </span>
                    <h3>{question?.domain?.name || 'NA'}</h3>
                </div>
                <div className="py-2">
                    <span className="flex font-bold items-center [&>svg]:p-2  [&>svg]:bg-emerald-600/20 [&>svg]:rounded-lg [&>svg]:border-1 [&>svg]:border-emerald-600 [&>svg]:mr-2">
                        <DimensionsIcon width={30} height={30} />
                        Dimension:
                    </span>
                    <h3>{question?.dimension?.name || 'NA'}</h3>
                </div>
            </div>
            {
                question?.qualification && (
                    <div className="py-2">
                        <span className="flex font-bold items-center [&>svg]:p-2  [&>svg]:bg-emerald-600/20 [&>svg]:rounded-lg [&>svg]:border-1 [&>svg]:border-emerald-600 [&>svg]:mr-2">
                            <StarsIcon width={35} height={35} />
                            Calificación:
                        </span>
                        <Card className="grid grid-cols-5 text-xs text-center border-2 cursor-pointer pb-2 my-2 hover:transition-all hover:duration-700 hover:ease-out">
                            <span className="bg-emerald-600 pt-2 mb-2 text-white">Siempre</span><span className="bg-emerald-600 pt-2 mb-2 text-white">Casi siempre</span><span className="bg-emerald-600 pt-2 mb-2 text-white">Algunas veces</span><span className="bg-emerald-600 pt-2 mb-2 text-white">Casi nunca</span><span className="bg-emerald-600 pt-2 mb-2 text-white">Nunca</span>
                            <span>{question?.qualification?.always_op}</span><span>{question?.qualification?.almost_alwyas_op}</span><span>{question?.qualification?.sometimes_op}</span><span>{question?.qualification?.almost_never_op}</span><span>{question?.qualification?.never_op}</span>
                        </Card>
                    </div>
                )
            }
            <div>
                {renderContent && renderContent()}
            </div>
        </div>
    )
});


