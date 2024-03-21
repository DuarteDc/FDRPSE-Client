import { ReactNode, useReducer } from 'react';

import { Section, SectionQuesions, type SectionDetail } from '../../../domain/models';
import { SectionContext, sectionReducer, } from './';

export interface SectionState {
  section           : null | SectionQuesions;
  sectionDetail     : SectionDetail | null;
  sections          : Array<Section> | [];
  sectionsSelected  : Array<SectionQuesions> | [];
}

interface Props {
  children: ReactNode
}

const SECTION_INITIAL_STATE: SectionState = {
  section           : null,
  sectionDetail     : null,
  sections          : [],
  sectionsSelected  : [],
}

export const SectionProvider = ({ children }: Props) => {

  const [state, dispatch] = useReducer(sectionReducer, SECTION_INITIAL_STATE);

  return (
    <SectionContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SectionContext.Provider>
  )
}

