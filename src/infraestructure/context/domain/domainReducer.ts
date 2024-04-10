import { Domain, DomainQualifications } from '../../../domain/models';
import { DomainState } from './';

export type DomainActionType =
  | { type: 'DOMAIN - Load Domains', payload: Array<Domain> }
  | { type: 'DOMAIN - Start load domains with qualifications', payload: Array<DomainQualifications> }
  | { type: 'DOMAIN - Start load domain with qualifications', payload: DomainQualifications }
  | { type: 'DOMAIN - Start add qualification', payload: DomainQualifications }
  | { type: 'DOMAIN - Start clear cache domain', }

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

    case 'DOMAIN - Start add qualification':
      return {
        ...state,
        domain: action.payload
      }

    case 'DOMAIN - Start clear cache domain':
      return {
        ...state,
        domain: null
      }
    default:
      return state;
  }

}
