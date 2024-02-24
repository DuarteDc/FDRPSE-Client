import { Fragment } from 'react';
import { Skeleton } from '@nextui-org/react'

interface Props {
    numOfCards?: number;
}

export const SkeletonCard = ({ numOfCards = 8 }: Props) => {

    const items = Array.from({ length: numOfCards }, (_, index) => index + 1);
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
