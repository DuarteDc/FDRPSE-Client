import { Fragment, memo, useCallback, useState } from 'react';
import { Checkbox, cn } from '@nextui-org/react';

import { BuildingComunity, BuildingIcon, ChevronLeft, HomeIcon } from '../../../infraestructure/components/icons'
import { AreaSubareasDepartments } from '../../../domain/models'
import { SubdirectionItem } from '../../../infraestructure/components/areas';
import { TypeAreas } from '../../../domain/models/Area';

interface Props {
    area: AreaSubareasDepartments;
    canMultiSelect: boolean;
    // onDragStart: (event: DragEvent<HTMLDivElement>, area: Area | AreaSubareasDepartments | Departments) => void;
    onDragEnd: () => void;
}

export const AreaItem = memo(({ area, onDragEnd, canMultiSelect }: Props) => {


    const [openSudirection, setOpenSubdirection] = useState(false);
    const toggleSubdirections = useCallback(() => setOpenSubdirection(toggle => !toggle), []);

    return (
        <Fragment>
            {
                canMultiSelect ? (
                    <Checkbox
                        classNames={{
                            base: cn(
                                "inline-flex max-w-md w-full animate-[fadeIn_0.5s]",
                                "hover:bg-content2 items-center justify-start",
                                "cursor-pointer rounded-lg",
                            ),
                            label: "w-full",
                        }}
                        value={area.id}
                    >
                        <div className="shadow-emerald-600/10 shadow-xl rounded-xl py-5 px-2 cursor-pointer flex items-center border-2 border-slate-200 hover:border-emerald-600 tarnsition-all duration-300 ease-in-out hover:scale-105 w-full my-2"
                        >
                            <div>
                                <span className="lg:w-[4rem] lg:h-[4rem] w-[3rem] h-[3rem] bg-emerald-600  text-white mx-4 flex items-center justify-center rounded-full">
                                    <BuildingComunity width={30} height={30} />
                                </span>
                            </div>
                            <div className="relative w-full">
                                <h2 className="font-bold text-sm">{area.name}</h2>
                            </div>
                        </div>
                    </Checkbox>
                ) :
                    (
                        <div
                            draggable
                            // onDragStart={(event) => onDragStart(event, area)}
                            onDragEnd={onDragEnd}
                            className={`shadow-emerald-600/10 shadow-xl rounded-xl py-4 px-2 cursor-pointer  hover:border-emerald-600 transition-all duration-300 ease-in w-full my-2 border-2 border-slate-2 ${openSudirection ? 'ease-in' : 'max-h-none'} overflow-hidden animate-[fadeIn_0.5s]`}
                        >
                            <div className="flex items-center">
                                <div>
                                    <span className="lg:w-[4rem] lg:h-[4rem] w-[3rem] h-[3rem] bg-emerald-600  text-white mx-4 flex items-center justify-center rounded-full">
                                        {
                                            area.typeArea === TypeAreas.Direction ? (
                                                <BuildingComunity width={30} height={30} />
                                            ) : (
                                                area.typeArea === TypeAreas.Subdirection ? (
                                                    <BuildingIcon width={30} height={30} />
                                                ) : (
                                                    <HomeIcon width={30} height={30} />
                                                )
                                            )
                                        }
                                    </span>
                                </div>
                                <div className="relative w-full">
                                    <h2 className="font-bold text-sm">{area.name}</h2>
                                </div>
                                {
                                    area?.subdirections?.length > 0 && area.usersCount > 0 && (
                                        <span className={`${openSudirection ? 'rotate-90' : 'rotate-[275deg]'} transition-all duration-700 text-gray-400 hover:text-emerald-500`} onClick={toggleSubdirections}>
                                            <ChevronLeft />
                                        </span>
                                    )
                                }
                            </div>
                            {
                                openSudirection && (
                                    area.subdirections.map((subdirection) => (
                                        <SubdirectionItem
                                            key={subdirection.id}
                                            // onDragStart={onDragStart}
                                            onDragEnd={onDragEnd}
                                            subdirection={subdirection}
                                        />
                                    ))
                                )
                            }


                        </div>
                    )
            }
        </Fragment>
    )

})

