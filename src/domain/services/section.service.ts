import { useContext, useState } from 'react';
import { sectionRespository } from '../../infraestructure/repositories/section.repository';
import { SectionContext } from '../../infraestructure/context/section';

export const sectionService = () => {

    const [loading, setLoading] = useState(false);
    const { dispatch, section, sections } = useContext(SectionContext);

    const startGetSections = async (): Promise<void> => {
        setLoading(prev => !prev);
        const sections = await sectionRespository.getSections();
        typeof sections !== 'string' && dispatch({ type: 'SECTION - Start load sections', payload: sections });
        setLoading(prev => !prev);
    }

    return {
        loading,
        startGetSections,
        section,
        sections,
    }
}
