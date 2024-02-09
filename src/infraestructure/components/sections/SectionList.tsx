import { Section } from '../../../domain/models';
import { SkeletonSectionCard } from '../ui/skeleton';
import { SectionCard } from '.';

interface Props {
    sections: Array<Section>;
    loading: boolean;
}

export const SectionList = ({ sections, loading }: Props) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-5 lg:gap-y-8 gap-y-4">
            
            {
                loading
                    ? <SkeletonSectionCard />
                    : sections.map((section) => <SectionCard section={section} key={section.id} />)
            }
        </div>
    )
}
