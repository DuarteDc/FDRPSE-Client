import { useCallback, useContext, useState } from 'react';
import { sectionRespository } from '../../infraestructure/repositories/section.repository';
import { SectionContext } from '../../infraestructure/context/section';
import { CreateSectionDto } from '../../infraestructure/http/dto/sections';

export const sectionService = () => {

    const [loading, setLoading] = useState(false);
    const { dispatch, section, sections } = useContext(SectionContext);

    const startGetSections = async (): Promise<void> => {
        setLoading(prev => !prev);
        const sections = await sectionRespository.getSections();
        typeof sections !== 'string' && dispatch({ type: 'SECTION - Start load sections', payload: sections });
        setLoading(prev => !prev);
    }

    const startCreateSection = async (createSectionDto: CreateSectionDto): Promise<void> => {
        setLoading(prev => !prev);
        const section = await sectionRespository.createSection(createSectionDto);
        typeof section !== 'string' && dispatch({ type: 'SECTION - Create new section', payload: section });
        setLoading(prev => !prev);
    }

    const startGetSectionsWithQuestions = useCallback(async (): Promise<void> => {
        setLoading(prev => !prev);
        const sections = await sectionRespository.getSectionWithQuestions();
        typeof sections !== 'string' && dispatch({ type: 'SECTION - Start load sections', payload: sections });
        setLoading(prev => !prev);
    }, []);


    return {
        loading,
        section,
        sections,
        startGetSections,
        startCreateSection,
        startGetSectionsWithQuestions,
    }
}
