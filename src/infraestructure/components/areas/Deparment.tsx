import { Fragment, memo } from 'react';
import { Area, AreaSubareasDepartments  } from '../../../domain/models';
import { AreaItem } from '../../../app/pages/surveys';

interface Props {
    deparments: Array<Area>
    // onDragStart: (event: DragEvent<HTMLDivElement>, area: Area | Departments) => void;
    onDragEnd: () => void;
}

export const Deparment = memo(({ deparments, onDragEnd }: Props) => {
    return (
        <Fragment>
            {
                deparments.map((deparment) => (
                    <AreaItem
                        key={deparment.id}
                        area={deparment as AreaSubareasDepartments}
                        onDragEnd={onDragEnd}

                        canMultiSelect={false}
                    />
                ))
            }
        </Fragment>
    )
})
