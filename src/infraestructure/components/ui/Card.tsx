import { Image, Card as MainCard } from '@nextui-org/react';

interface Props {
    title        : string;
    subtitle    ?: string;
    image       ?: string | JSX.Element;
    onClick     ?: () => void;
}

export const Card = ({ title, subtitle, image, onClick }: Props) => {
    return (
        <MainCard className="w-full h-[18rem] lg:h-[22rem] flex flex-col justify-center items-center" onClick={onClick ? onClick : undefined}>
            <div className="w-[10rem] h-[10rem] rounded-full">
                <Image
                    alt="Woman listing to music"
                    className="w-full h-full"
                    height={600}
                    src={image ? image : '/assets/cat.svg'}
                    width={500}
                />
            </div>
            <span className="font-bold">{title}</span> 
            {
                subtitle && <span className="text-sm">{subtitle}</span>
            }
        </MainCard>
    )
}
