import { DragEvent, memo } from 'react';
import { Guide } from '../../../domain/models';
import { XIcon } from '../icons';
import { GuideList } from '.';

interface Props {
    isDrag: boolean;
    guides: Array<Guide>
    onDrop: (event: DragEvent<HTMLDivElement>) => void;
    allowDrop: (event: DragEvent<HTMLDivElement>) => void;
    handelRemoveGuide: (guide: Guide) => void;
}

export const OnDropGuides = memo(({ isDrag, guides, onDrop, allowDrop, handelRemoveGuide }: Props) => {
    return (
        <div className={`min-h-[500px] col-span-5 w-full border-2 transition-all duration-400 rounded-xl flex flex-wrap p-2 gap-2 mt-16 ${isDrag ? 'bg-gray-200 border-dashed border-gray-400 ease-in' : 'opacity-100 ease-in-out'}`}
            onDrop={onDrop}
            onDragOver={allowDrop}
        >
            <GuideList
                guides={guides}
                loading={false}
                classNameItem="py-2 cursor-pointer border-2 w-[calc(100%-20px)] lg:w-[calc(50%-20px)] xl:w-[calc(50%-5px)] h-[7rem] rounded-lg hover:border-emerald-600 transition-all duration-400 shadow-md shadow-emerald-600/10 relative px-3 break-normal overflow-hidden"
                renderContentInsideItem={(guide) => (
                    <span className="absolute top-1 right-0 rounded-full border-2 p-1 hover:border-danger hover:text-danger transition-all duration-400 z-10"
                        onClick={() => handelRemoveGuide(guide)}
                    >
                        <XIcon height={15} width={15} strokeWidth={3} />
                    </span>
                )}
            />
        </div>
    )
})
