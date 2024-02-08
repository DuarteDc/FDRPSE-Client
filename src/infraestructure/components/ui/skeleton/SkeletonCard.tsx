import { Fragment } from 'react';
import { Skeleton } from '@nextui-org/react'

const items = Array.from({ length: 8 }, (_, index) => index + 1);

export const SkeletonCard = () => {

    return (
        <Fragment>
            {
                items.map((_, index) => (
                    <div className="w-full h-[18rem] lg:h-[22rem] rounded-lg overflow-hidden relative shadow-xl border-1 border-gray-200 flex flex-col items-center justify-center" key={index}>
                        <Skeleton className="w-[10rem] h-[10rem] rounded-full" />
                        <Skeleton className="rounded-lg w-6/12 h-4 mt-5" />
                    </div>
                ))
            }
        </Fragment>
    )
}
