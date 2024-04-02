import { Domain, DomainQualifications } from '../../../domain/models';
import { DomainState } from './';

export type DomainActionType =
  | { type: 'DOMAIN - Load Domains', payload: Array<Domain> }
  | { type: 'DOMAIN - Start load domains with qualifications', payload: Array<DomainQualifications> }
  | { type: 'DOMAIN - Start load domain with qualifications', payload: DomainQualifications }

export const domainReducer = (state: DomainState, action: DomainActionType) => {

  switch (action.type) {
    case 'DOMAIN - Load Domains':
      return {
        ...state,
        domains: action.payload,
      }

    case 'DOMAIN - Start load domains with qualifications':
      return {
        ...state,
        domainsQualifications: action.payload
      }

      case 'DOMAIN - Start load domain with qualifications':
        return {
            ...state,
            domain: action.payload
        }
    default:
      return state;
  }

}
