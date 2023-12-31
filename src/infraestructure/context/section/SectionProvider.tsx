import { ReactNode, useReducer } from 'react';

import { Section } from '../../../domain/models';
import { SectionContext, sectionReducer } from './';

export interface SectionState {
  section: Section | null;
  sections: Array<Section>
}

interface Props {
  children: ReactNode
}

const SECTION_INITIAL_STATE: SectionState = {
  section: null,
  sections: []
}

export const SectionProvider = ({ children }: Props) => {

  const [state, dispatch] = useReducer(sectionReducer, SECTION_INITIAL_STATE);

  return (
    <SectionContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SectionContext.Provider>
  )
}

