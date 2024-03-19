import { Fragment } from 'react';
import { Skeleton } from '@nextui-org/react';

interface Props {
    skeletonItems?: number
}
export const SkeletonGuideCard = ({ skeletonItems = 10 }: Props) => {

    const items = Array.from({ length: skeletonItems }, (__, index) => index + 1);

    return (
        <Fragment>
            {
                items.map((__, index) =>
                    <div className="my-4 w-full max-h-[7rem] lg:max-h-[9rem] py-4 px-2 rounded-lg overflow-hidden relative shadow-xl border-1 border-gray-200" key={index}>
                        <div className="flex items-center mb-4">
                            <Skeleton className="w-[3rem] h-[3rem] rounded-full px-5" />
                            <Skeleton className="w-full h-6 rounded-2xl my-2  mx-4" />
                            <Skeleton className="w-[2.5rem] h-10 rounded-2xl my-2" />
                        </div>
                        <div className="w-full px-4">
                            <Skeleton className="w-full h-3 rounded-2xl mb-2" />
                            <Skeleton className="w-full h-1 rounded-2xl my-2" />
                        </div>
                    </div>
                )
            }
        </Fragment>
    )
}
