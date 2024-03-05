import { DragEvent, FormEvent, memo } from 'react';
import { CheckboxGroup } from '@nextui-org/react';

import { AreaItem } from './';
import { SkeletonSectionCard } from '../../../infraestructure/components/ui/skeleton';

import { Area } from '../../../domain/models';

interface Props {
    areas               : Array<Area>
    onDragStart         : (event: DragEvent<HTMLDivElement>, area: Area) => void;
    onDragEnd           : () => void;
    canMultiSelect      : boolean;
    onChangeSelected    : (areas: Array<string>) => void;
    selectedAreas       : Array<string>
}

export const AreasList = memo(({ areas, onDragStart, onDragEnd, canMultiSelect, onChangeSelected, selectedAreas }: Props) => {
    return (
        <div className="col-span-2 w-full min-h-screen max-h-[300px] overflow-y-auto [&>*:last-child]:px-3">
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
                        <SkeletonSectionCard />
                    )
            }
        </div>
    )
})
