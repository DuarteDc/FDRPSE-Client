import { QualificationCard } from './';
import { QuestionDetail } from '../../context/questions';
import { qualificationService } from '../../../domain/services/qualification.service';
import { SkeletonQualification } from '../ui/skeleton';
import { memo } from 'react';
import { useQuestion } from '../../../app/hooks/useQuestion';

interface Props {
    question: QuestionDetail,
    onCloseDrawer: () => void;
}

export const QualificationList = memo(({ question, onCloseDrawer }: Props) => {

    const { qualifications } = qualificationService();
    const { setQualificationBeforeSave } = useQuestion()

    return (
        <ul className="[&>li]:cursor-pointer [&>li>span]:ml-2 [&>li>span]:-mb-1 [&>li>span]:text-sm text-gray-500 font-bold">
            {
                !qualifications.length ? <SkeletonQualification />
                    :
                    qualifications.map((qualification) => (
                        <QualificationCard
                            key={qualification.id}
                            qualification={qualification}
                            setQualification={setQualificationBeforeSave}
                            onCloseDrawer={onCloseDrawer}
                            question={question}
                        />
                    ))
            }
        </ul>
    )
});
