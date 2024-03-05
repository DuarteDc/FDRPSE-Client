import { DragEvent, Fragment, memo } from 'react';
import { Checkbox, cn } from '@nextui-org/react';

import { BuildingComunity } from '../../../infraestructure/components/icons'
import { Area } from '../../../domain/models'

interface Props {
    area            : Area;
    canMultiSelect  : boolean;
    onDragStart     : (event: DragEvent<HTMLDivElement>, area: Area) => void;
    onDragEnd       : () => void;
}

export const AreaItem = memo(({ area, onDragStart, onDragEnd, canMultiSelect }: Props) => {

    return (
        <Fragment>
            {
                canMultiSelect ? (
                    <Checkbox
                        classNames={{
                            base: cn(
                                "inline-flex max-w-md w-full",
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
                        <div className="shadow-emerald-600/10 shadow-xl rounded-xl py-5 px-2 cursor-pointer flex items-center border-2 border-slate-200 hover:border-emerald-600 tarnsition-all duration-300 ease-in-out hover:scale-105 w-full my-2"
                            draggable
                            onDragStart={(event: DragEvent<HTMLDivElement>) => onDragStart(event, area)}
                            onDragEnd={onDragEnd}
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
                    )
            }
        </Fragment>
    )

});

