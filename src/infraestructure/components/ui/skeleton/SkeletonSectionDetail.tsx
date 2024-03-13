import { Skeleton } from "@nextui-org/react"


export const SkeletonSectionDetail = () => {
    return (
        <div className="py-4">
            <Skeleton className="rounded-lg w-full h-16 -mt-8" />
            <Skeleton className="rounded-lg mt-1 h-1 w-full" />
            <Skeleton className="rounded-lg mt-5 h-4" />
            <Skeleton className="rounded-lg h-10 mt-2" />
            <Skeleton className="rounded-lg mt-5 h-4 w-full" />
            <Skeleton className="rounded-lg h-10 mt-2 w-full" />
            <Skeleton className="rounded-lg mt-5 h-24 w-full" />
            <Skeleton className="rounded-lg h-5 mt-2 w-full" />
        </div>
    )
}
