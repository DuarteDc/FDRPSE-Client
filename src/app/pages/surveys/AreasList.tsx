import { DragEvent, FormEvent, memo } from 'react';
import { CheckboxGroup } from '@nextui-org/react';

import { AreaItem } from './';
import { SkeletonSectionCard } from '../../../infraestructure/components/ui/skeleton';

import { Area, AreaSubareasDepartments, Departments } from '../../../domain/models';
import { BoxOff } from '../../../infraestructure/components/icons';

interface Props {
    areas: Array<AreaSubareasDepartments>
    onDragStart: (event: DragEvent<HTMLDivElement>, area: Area | AreaSubareasDepartments | Departments) => void;
    onDragEnd: () => void;
    canMultiSelect: boolean;
    onChangeSelected: (areas: Array<string>) => void;
    selectedAreas: Array<string>
    areasWithDatetime: Array<any>
}

export const AreasList = memo(({ areas, onDragStart, onDragEnd, canMultiSelect, onChangeSelected, selectedAreas, areasWithDatetime }: Props) => {
    return (
        <div className="col-span-2 w-full max-h-[800px] overflow-y-auto [&>*:last-child]:px-3">
            <span className="sticky top-0 z-10 bg-white pb-4 block w-full after:absolute after:-bottom-10 after:h-10 after:w-full after:z-10 after:left-0 after:bg-gradient-to-b after:from-emerald-600/15 after:to-transparent">
                <h3 className="text-2xl font-bold uppercase bg-gradient-to-r from-primary via-emerald-600 to-emerald-600 inline-block text-transparent bg-clip-text">Lista de areas</h3>
            </span>

            {
                areas.length ? (
                    <CheckboxGroup
                        label={canMultiSelect ? 'Selecciona multiples áreas' : 'Selecciona una área'}
                        onChange={(value: Array<string> | FormEvent<HTMLDivElement>) => onChangeSelected(value as Array<string>)}
                        value={selectedAreas}
                    >
                        {
                            areas.map((area) => (
                                <AreaItem
                                    key={area.id}
                                    area={area}
                                    onDragStart={onDragStart}
                                    onDragEnd={onDragEnd}
                                    canMultiSelect={canMultiSelect}
                                />
                            ))
                        }
                    </CheckboxGroup>
                ) :
                    (
                        areasWithDatetime.length <= 0 ? < SkeletonSectionCard /> :
                            <div className="flex justify-center flex-col items-center text-slate-800 w-full rounded-lg py-10 animate-[fadeIn_0.5s]">
                                <BoxOff width={110} height={110} />
                                <span className="mt-5 text-emerald-600 font-bold text-lg">No hay áreas disponibles</span>
                            </div>
                    )
            }
        </div>
    )
})
