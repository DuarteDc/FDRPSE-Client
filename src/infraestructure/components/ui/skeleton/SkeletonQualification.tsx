import { Skeleton } from "@nextui-org/react";

const items = Array.from({ length: 2 }, (_, index) => index + 1);

export const SkeletonQualification = () => {
  return (
    <>
        {
            items.map((__, index) => (
                <div className="w-full my-4 h-[5rem] rounded-lg overflow-hidden" key={index}>
                    <Skeleton className="w-full h-full"/>
                </div>
            ))
        }
    </>
  )
}
