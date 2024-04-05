import { DragEvent, useCallback, useContext, useState } from 'react';

import { Guide } from '../../domain/models';
import { GuideContext } from '../../infraestructure/context/guide';

export const useSurvey = () => {
    const { dispatch } = useContext(GuideContext);
    const [isDrag, setIsDrag] = useState<boolean>(false);

    const onDragStart = useCallback((event: DragEvent<HTMLDivElement>, guide: Guide) => {
        event.stopPropagation();
        event.dataTransfer.setData('guide', JSON.stringify(guide));
        setIsDrag(true);
    }, []);

    const onDragEnd = useCallback(() => setIsDrag(false), []);

    const allowDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    const onDropGuide = (event: DragEvent<HTMLDivElement>) => {
        if (!event.dataTransfer.getData('guide')) return;
        const guide = JSON.parse(event.dataTransfer.getData('guide')) as Guide;
        dispatch({ type: 'GUIDE - Add guide to survey', payload: guide });
        onDragEnd()
    }

    const handleRemoveGuideSelected = (guide: Guide) => dispatch({ type: 'GUIDE - Delete guide to survey', payload: guide });

    return {
        isDrag,

        onDragStart,
        onDragEnd,
        allowDrop,
        onDropGuide,
        handleRemoveGuideSelected,
    }
}
