import { ReactNode } from 'react';
import { BoxIcon, CategoryIcon, DimensionsIcon, QuestionIcon } from '../icons'
import { QuestionDetail } from '../../context/questions'

interface Props {
    question: QuestionDetail;
    renderButton   ?: () => ReactNode;
    renderChildren ?: () => ReactNode;
}

export const CardQuestion = ({ question, renderButton, renderChildren }: Props) => {
    return (
        <div className="border-2 border-emerald-600 rounded-xl p-5 my-2" draggable>
            {renderButton && renderButton()}
            <div className="py-2">
                <span className="flex font-bold items-center [&>svg]:p-2  [&>svg]:bg-emerald-600/20 [&>svg]:rounded-lg [&>svg]:border-1 [&>svg]:border-emerald-600 [&>svg]:mr-2">
                    <QuestionIcon width={35} height={35} />
                    Pregunta:
                </span>
                <h3 className="text-sm">{question.question}</h3>
            </div>
            <div className="grid grid-cols-3 [&>div]:text-xs">
                <div className="py-2">
                    <span className="flex font-bold items-center [&>svg]:p-2  [&>svg]:bg-emerald-600/20 [&>svg]:rounded-lg [&>svg]:border-1 [&>svg]:border-emerald-600 [&>svg]:mr-2">
                        <CategoryIcon width={35} height={35} />
                        Categoría:
                    </span>
                    <h3>{question?.category?.name}</h3>
                </div>
                <div className="py-2">
                    <span className="flex font-bold items-center [&>svg]:p-2  [&>svg]:bg-emerald-600/20 [&>svg]:rounded-lg [&>svg]:border-1 [&>svg]:border-emerald-600 [&>svg]:mr-2">
                        <BoxIcon width={35} height={35} />
                        Dominio:
                    </span>
                    <h3>{question?.domain?.name || 'NA'}</h3>
                </div>
                <div className="py-2">
                    <span className="flex font-bold items-center [&>svg]:p-2  [&>svg]:bg-emerald-600/20 [&>svg]:rounded-lg [&>svg]:border-1 [&>svg]:border-emerald-600 [&>svg]:mr-2">
                        <DimensionsIcon width={35} height={35} />
                        Dimension:
                    </span>
                    <h3>{question?.dimension?.name || 'NA'}</h3>
                </div>
            </div>
            <div>
                { renderChildren && renderChildren()}
            </div>
        </div>
    )
}


