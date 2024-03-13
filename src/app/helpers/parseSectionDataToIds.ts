import { Section } from '../../domain/models';


export const parseSectionDataToIds = (sections: Array<Section>) => {
    const sectionsId = [
        ...new Set(
            sections.map(({ id }) =>  id )
        )
    ];
    return { 'sections': sectionsId, }
}
