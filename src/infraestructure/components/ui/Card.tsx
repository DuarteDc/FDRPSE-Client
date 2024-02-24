import { isValidElement } from 'react';
import { Card as MainCard } from '@nextui-org/react';
import { CreateItemCardProps } from './CardList';

export const Card = ({ title, subtitle, image, onPress }: CreateItemCardProps) => {
    return (
        <MainCard className="w-full h-[18rem] lg:h-[22rem] flex flex-col justify-center items-center cursor-pointer hover:border-emerald-600 border-2 hover:transition-all hover:ease-in-out hover:duration-1000 hover:shadow-emerald-600/20 shadow-lg overflow-hidden break-words px-3 hover:scale-[1.03]" isPressable onPress={onPress ? onPress : undefined}>
            <div className="w-[10rem] h-[10rem] rounded-full">
                {
                    isValidElement(image) ? (
                        <div className="h-full w-full flex items-center justify-center">
                            <span className="p-5 rounded-full bg-emerald-600/40">
                                {image}
                            </span>
                        </div>
                    ) : (
                        <img
                            alt={title}
                            className="w-full h-full"
                            height={600}
                            // src={typeof image === 'string' ? image : '/cuestionario/public/assets/cat.svg'}
                            src={typeof image === 'string' ? image : '/assets/cat.svg'}
                            width={500}
                            loading="lazy" />
                    )
                }
            </div>
            <span className="text-xs xl:text-base font-bold text-gray-500">{title}</span>
            {
                subtitle && <span className="text-xs text-gray-500 font-semibold">{subtitle}</span>
            }
        </MainCard>
    )
}
