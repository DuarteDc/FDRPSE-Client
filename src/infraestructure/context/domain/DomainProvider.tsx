import { ReactNode, useReducer } from 'react';
import { Domain } from '../../../domain/models';

import { DomainContext, domainReducer } from './';

export interface DomainState {
    domain   : Domain | null;
    domains  : Array<Domain>
}

interface Props {
    children: ReactNode;
}

const DOMAIN_INITIAL_STATE: DomainState = {
    domain   : null,
    domains  : []
}

export const DomainProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer(domainReducer, DOMAIN_INITIAL_STATE);
    return (
        <DomainContext.Provider value={{ ...state, dispatch }}>
            {children}
        </DomainContext.Provider>   
    )
}
