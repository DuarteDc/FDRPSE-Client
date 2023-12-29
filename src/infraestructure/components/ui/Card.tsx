import { CardFooter, Image, Card as MainCard, Skeleton } from "@nextui-org/react"

interface Props {
    title: string;
}
export const Card = ({ title }: Props) => {
    return (
        <MainCard className="w-full h-[20rem]">
            {/* <Skeleton> */}
                <Image
                    alt="Woman listing to music"
                    className=" w-full h-full"
                    height={600}
                    src="/assets/cat.svg"
                    width={500}
                />
            {/* </Skeleton> */}
            <CardFooter className="justify-between bg-emerald-600 border-emerald-600/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="text-xs font-bold text-white/80 py-2">{title}</p>
            </CardFooter>
        </MainCard>
    )
}
