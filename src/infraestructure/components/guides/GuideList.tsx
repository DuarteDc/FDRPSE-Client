import { Fragment, memo } from 'react';
import { Guide } from '../../../domain/models';
import { SkeletonGuideCard } from '../ui/skeleton';
import { GuideCard } from './';

interface Props {
    guides: Array<Guide>;
    loading: boolean;
}
export const GuideList = memo(({ guides, loading }: Props) => {
    return (
        <Fragment>
            {
                loading ? (<SkeletonGuideCard />) :
                    guides.map(guide => <GuideCard key={guide.id} />)
            }
        </Fragment>
    )
});
