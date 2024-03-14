import { Fragment, ReactNode } from 'react';
import { Section } from '../../../domain/models';
import { SkeletonSectionCard } from '../ui/skeleton';

interface RenderChildProps {
    section: Section;
}

interface Props {
    sections: Array<Section>;
    loading: boolean;
    className?: string,
    renderChilds: ({ section }: RenderChildProps) => ReactNode | Array<ReactNode>;
}

const classList = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-5 lg:gap-y-8 gap-y-4';

export const SectionList = ({ className = classList, loading, sections, renderChilds }: Props) => {
    return (
        <div className={className}>
            {
                (loading && !sections.length) ?
                    <SkeletonSectionCard skeletonItems={6} /> :
                    sections.map((section) =>
                        <Fragment key={section.id}>
                            {renderChilds({ section })}
                        </Fragment>)
            }
        </div>
    )
}
