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
                value: userDetail?.total,
            }
        )
    }, [userDetail.user.id]);

    const getNameByType = {
        ['Despreciable o nulo'] : 'bg-danger/15',
        ['Bajo']                : 'bg-warning/15',
        ['Medio']               : 'bg-primary/15',
        ['Alto']                : 'bg-emerald-600/15',
        ['Muy alto']            : 'bg-success/15',
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
