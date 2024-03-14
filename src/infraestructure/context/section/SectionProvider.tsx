import { ReactNode, useReducer } from 'react';

import { Section, SectionQuesions } from '../../../domain/models';
import { SectionContext, sectionReducer } from './';

export interface SectionState {
  section           : null | SectionQuesions;
  sections          : Array<Section> | [];
  sectionsSelected  : Array<SectionQuesions> | [];
}

interface Props {
  children: ReactNode
}

const SECTION_INITIAL_STATE: SectionState = {
  section           : null,
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

