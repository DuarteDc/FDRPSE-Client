import { Fragment, ReactNode } from 'react';
import { QuestionInsideSection } from '../../../domain/models';
import { NavigateFunction, useNavigation } from '../../../app/hooks/useNavigation';

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
                    <h1>Loading</h1>
                    //TODO make Skeleton loading
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
