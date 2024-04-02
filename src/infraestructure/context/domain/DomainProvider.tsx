import { ReactNode, useReducer } from 'react';
import { Domain, DomainQualifications } from '../../../domain/models';

import { DomainContext, domainReducer } from './';

export interface DomainState {
    domain                  : DomainQualifications | null;
    domains                 : Array<Domain>
    domainsQualifications   : Array<DomainQualifications>
}

interface Props {
    children: ReactNode;
}

const DOMAIN_INITIAL_STATE: DomainState = {
    domain                  : null,
    domains                 : [],
    domainsQualifications   : []
}

export const DomainProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer(domainReducer, DOMAIN_INITIAL_STATE);
    return (
        <DomainContext.Provider value={{ ...state, dispatch }}>
            {children}
        </DomainContext.Provider>   
    )
}
