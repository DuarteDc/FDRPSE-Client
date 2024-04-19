import { useMemo } from 'react';
import { getNameOfQualification } from '../../../app/helpers/transformDataToBarChart'
import { Guide, GuideSurveyUserDetail } from '../../../domain/models';

interface Props {
    guide: Guide,
    userDetail: GuideSurveyUserDetail;
}

export const GuideSurveyQualification = ({ guide, userDetail }: Props) => {

    const getName = useMemo(() => {
        return getNameOfQualification(
            {
                despicable: guide.qualification?.despicable!,
                low: guide.qualification?.low!,
                middle: guide.qualification?.middle!,
                high: guide.qualification?.high!,
                value: userDetail.total
            }
        )
    }, [userDetail.user.id]);

    const getNameByType = {
        ['Despreciable o nulo'] : 'bg-primary/15',
        ['Bajo']                : 'bg-emerald-400/15',
        ['Medio']               : 'bg-yellow-400/30',
        ['Alto']                : 'bg-orange-400/30',
        ['Muy alto']            : 'bg-danger/15',
        ['NA']                  : 'bg-emerald-100/15'
    }

    return (
        <div className={`w-full ${getNameByType[getName]} rounded-lg p-5 lg:p-10 border-2 font-bold text-sm`}>
            <div>
                <span>Calificación: {''}</span>
                <b>
                    {
                        getName
                    }
                </b>
            </div>
            <div>
                <span>Calificación del cuestionario: {''}</span>
                {userDetail.total}
            </div>
        </div>
    )
}
