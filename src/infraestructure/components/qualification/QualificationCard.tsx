import { Badge, Card } from '@nextui-org/react';
import { QuestionDetail } from '../../context/questions';
import { Qualification } from '../../../domain/models';
import { CheckIcon } from '../icons';

interface Props {
    question: QuestionDetail,
    qualification: Qualification,
    setQualification: (id: Qualification) => void;
    onCloseDrawer: () => void;
}

export const QualificationCard = ({ question, setQualification, qualification, onCloseDrawer }: Props) => {

    return (
        <li onClick={() => { setQualification(qualification); onCloseDrawer() }}>
            <Badge
                isOneChar
                content={qualification.id === question?.qualification?.id && <CheckIcon />}
                className={qualification.id === question?.qualification?.id ? "bg-emerald-500 text-white border-emerald-500" : "bg-gray-50"}
                placement="top-right"
            >
                <Card className={`grid grid-cols-5 text-xs text-center border-2 ${question?.qualification?.id === qualification.id ? 'border-emerald-500 scale-[1.03]' : 'border-transparent  hover:border-emerald-500/50 hover:scale-[1.02] hover:transition-all hover:duration-300'} cursor-pointer pb-2 my-2`}>
                    <span className="bg-emerald-600 pt-2 mb-2 text-white">Siempre</span><span className="bg-emerald-600 pt-2 mb-2 text-white">Casi siempre</span><span className="bg-emerald-600 pt-2 mb-2 text-white">Algunas veces</span><span className="bg-emerald-600 pt-2 mb-2 text-white">Casi nunca</span><span className="bg-emerald-600 pt-2 mb-2 text-white">Nunca</span>
                    <span>{qualification.always_op}</span><span>{qualification.almost_alwyas_op}</span><span>{qualification.sometimes_op}</span><span>{qualification.almost_never_op}</span><span>{qualification.never_op}</span>
                </Card>
            </Badge>
        </li>
    )
}
