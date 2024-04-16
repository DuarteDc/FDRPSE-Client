import { Fragment, ReactNode } from 'react';
import { QuestionInsideSection } from '../../../domain/models';
import { NavigateFunction, useNavigation } from '../../../app/hooks/useNavigation';
import { Skeleton } from '@nextui-org/react';

interface Props {
    questions?: Array<QuestionInsideSection>
    renderChilds: ({ question, navigate }: { question: QuestionInsideSection, navigate: NavigateFunction }) => ReactNode;
}

export const QuestionDetailList = ({ questions, renderChilds }: Props) => {
    const { navigate } = useNavigation();

    return (
        <Fragment>
            {
                !questions ? (
                  <Skeleton 
                    className="w-full h-[20rem] rounded-lg col-span-full mt-10"
                  />
                ) :
                    (
                        questions.map((question) =>
                            <Fragment key={question.id}>
                                {renderChilds({ navigate, question })}
                            </Fragment>
                        )
                    )
            }

        </Fragment>
    )
}
