import { DragEvent, memo } from 'react';
import { Section } from '../../../domain/models';
import { XIcon } from '../icons';
import { SectionCard } from '../sections';

interface Props {
    isDrag              : boolean;
    sections            : Array<Section>
    onDrop              : (event: DragEvent<HTMLDivElement>) => void;
    allowDrop           : (event: DragEvent<HTMLDivElement>) => void;
    getSectionDetail    : (section: Section) => Promise<void>
    handelRemoveSection : (section: Section) => void;

}

export const OnDropSections = memo(({ isDrag, sections, onDrop, allowDrop, getSectionDetail, handelRemoveSection }: Props) => {

    return (
        <div className={`min-h-[500px] col-span-5 w-full border-2 transition-all duration-400 rounded-xl flex flex-wrap p-2 gap-2 mt-16 ${isDrag ? 'bg-gray-200 border-dashed border-gray-400 ease-in' : 'opacity-100 ease-in-out'}`}
            onDrop={onDrop}
            onDragOver={allowDrop}
        >
            {
                sections.map((section) => (
                    <SectionCard
                        classList="py-5 cursor-pointer flex items-center border-2 w-[calc(100%-20px)] lg:w-[calc(50%-20px)] xl:w-[calc(50%-5px)] h-[7rem] rounded-lg hover:border-emerald-600 transition-all duration-400 shadow-md shadow-emerald-600/10 relative px-3 break-normal overflow-hidden "
                        key={section.id}
                        section={section}
                        draggable={false}
                        showControlls
                        handleSelectSection={getSectionDetail}
                        renderContent={() => (
                            <span className="absolute top-1 right-1 rounded-full border-2 p-1 hover:border-danger hover:text-danger transition-all duration-400 z-10"
                                onClick={() => handelRemoveSection(section)}
                            >
                                <XIcon height={15} width={15} strokeWidth={3} />
                            </span>
                        )}
                    />
                ))
            }
        </div>
    )
})
