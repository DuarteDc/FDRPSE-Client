import { DragEvent, Fragment, ReactNode, memo } from 'react';
import { Guide } from '../../../domain/models';
import { SkeletonGuideCard } from '../ui/skeleton';
import { GuideCard } from './';

interface Props {
    guides: Array<Guide>;
    loading: boolean;
    draggable?: boolean;
    onDragStart?: (event: DragEvent<HTMLDivElement>, guide: Guide) => void;
    onDragEnd?: () => void;
    classNameItem?: string;
    showItemControls?: boolean;
    renderContentInsideItem?: (guide: Guide) => ReactNode;
    showType?: boolean,
}
export const GuideList = memo(({ guides, loading, ...props }: Props) => {
    return (
        <Fragment>
            {
                loading ? (<SkeletonGuideCard skeletonItems={4} />) :
                    guides?.map(guide => <GuideCard key={guide.id} guide={guide} {...props} />)
            }
        </Fragment>
    )
});
