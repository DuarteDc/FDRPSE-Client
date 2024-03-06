import { DragEvent, memo, useCallback, useState } from 'react';
import { Area, Departments } from '../../../domain/models'
import { ChevronLeft, HomeIcon } from '../icons';
import { Deparment } from '.';

interface Props {
    subdirection: Departments;
    onDragStart: (event: DragEvent<HTMLDivElement>, area: Departments | Area) => void;
    onDragEnd: () => void;
}

export const SubdirectionItem = memo(({ subdirection, onDragEnd, onDragStart }: Props) => {

    const [openDeparments, setOpenDeparments] = useState(false);
    const toggleDeparments = useCallback(() => setOpenDeparments(toggle => !toggle), []);



    return (
        <div
            draggable
            onDragStart={(event) => onDragStart(event, subdirection)}
            onDragEnd={onDragEnd}
            className={`shadow-emerald-600/10 shadow-xl rounded-xl py-1 px-2 cursor-pointer 
             hover:border-emerald-600 transition-all duration-300 ease-in w-full my-2 border-2 border-slate-2 `}
        >
            <div className="flex items-center py-3">
                <div className="w-full flex items-center text-sm">
                    <div className="lg:w-[3rem] lg:h-[3rem] w-[3rem] h-[3rem] min-w-[3rem] bg-emerald-600 text-white mx-1 inline-flex items-center justify-center rounded-full">
                        <HomeIcon width={20} height={20} />
                    </div>
                    <p>{subdirection.name}</p>
                </div>
                {
                    subdirection.departments.length > 0 && (
                        <span className={`${openDeparments ? 'rotate-90' : 'rotate-[275deg] vo'} transition-all duration-700 text-gray-400 hover:text-emerald-500`} onClick={toggleDeparments}>
                            <ChevronLeft />
                        </span>
                    )
                }
            </div>
            {
                openDeparments &&
                (
                    <Deparment
                        onDragEnd={onDragEnd}
                        onDragStart={onDragStart}
                        deparments={subdirection.departments as Array<Area>}
                    />
                )
            }
        </div>
    )
});
