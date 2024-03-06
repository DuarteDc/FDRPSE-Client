import { DragEvent, Fragment, memo } from 'react';
import { Area, Departments } from '../../../domain/models';
import { SubdirectionItem } from './';

interface Props {
    subdirections: Array<Departments>
    onDragStart: (event: DragEvent<HTMLDivElement>, area: Area) => void;
    onDragEnd: () => void;
}

export const Subdirection = memo(({ subdirections, onDragStart, onDragEnd }: Props) => {

    return (
        <Fragment>
            {
                subdirections.map((subdirection) => (
                    <SubdirectionItem
                        key={subdirection.id}
                        subdirection={subdirection}
                        onDragEnd={onDragEnd}
                        onDragStart={onDragStart}
                    />
                ))
            }
        </Fragment>
    )
})
