import { useCallback, useContext, useState } from 'react';
import { sectionRespository } from '../../infraestructure/repositories/section.repository';
import { SectionContext } from '../../infraestructure/context/section';
import { CreateSectionDto, PostSectionsIdDto } from '../../infraestructure/http/dto/sections';
import { Section } from '../models';

interface Props {
    onOpenAuxiliarModel?: () => void;
}

export const sectionService = (props: Props) => {

    const [loading, setLoading] = useState(false);
    const { dispatch, section, sections, sectionsSelected } = useContext(SectionContext);

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

    const startGetSectionsBy = useCallback(async (type: string): Promise<void> => {
        setLoading(prev => !prev);
        const sections = await sectionRespository.getSectionsByType(type);
        typeof sections !== 'string' && dispatch({ type: 'SECTION - Start load sections', payload: sections });
        setLoading(prev => !prev);
    }, []);


    const getSectionDetail = async (newSection: Section) => {
        if (section && newSection.id === section?.id) {
            props.onOpenAuxiliarModel && props.onOpenAuxiliarModel();
            return;
        }
        setLoading(prev => !prev);
        props.onOpenAuxiliarModel && props.onOpenAuxiliarModel();
        const data = await sectionRespository.getSectionDetail(newSection.id);
        typeof data !== 'string' && dispatch({ type: 'SECTION - Start load section', payload: data });
        setLoading(prev => !prev);
    }


    const getSectionsDetailWithQuestions = async (sectionsId: PostSectionsIdDto) => {
        setLoading(prev => !prev);
        const sections = await sectionRespository.getMultipleSectionsWithQuestions(sectionsId);
        typeof sections !== 'string' && dispatch({ type: 'SECTION - Start load sections with questions', payload: sections });
        setLoading(prev => !prev);
    }

    return {
        loading,
        section,
        sections,
        sectionsSelected,

        getSectionDetail,
        startGetSections,
        startCreateSection,
        startGetSectionsBy,
        startGetSectionsWithQuestions,
        getSectionsDetailWithQuestions,
    }
}
