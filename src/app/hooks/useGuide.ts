import { DragEvent, useCallback, useContext, useState } from 'react';
import { Section } from '../../domain/models';
import { SectionContext } from '../../infraestructure/context/section';

interface Props {
    onOpenAuxiliarModel?: () => void;
}

export const useGuide = ({ onOpenAuxiliarModel }: Props) => {

    const [isDrag, setIsDrag] = useState<boolean>(false);
    const { dispatch, sectionsSelected } = useContext(SectionContext);

    const onDragStart = useCallback((event: DragEvent<HTMLDivElement>, section: Section) => {
        event.stopPropagation();
        event.dataTransfer.setData('section', JSON.stringify(section));
        setIsDrag(true);
    }, []);

    const onDragEnd = useCallback(() => setIsDrag(false), []);

    const allowDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    const onDropArea = (event: DragEvent<HTMLDivElement>) => {
        const section = JSON.parse(event.dataTransfer.getData('section')) as Section;
        dispatch({ type: 'SECTION - Add section to guide', payload: section });
        onDragEnd()
    }

    const handleRemoveSectionSelected = (section: Section) => dispatch({ type: 'SECTION - Delete section to guide', payload: section });

    return {
        isDrag,



        onDragStart,
        onDragEnd,
        allowDrop,
        onDropArea,
        handleRemoveSectionSelected
    }
}
