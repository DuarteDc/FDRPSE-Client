import { Domain, DomainQualifications } from '../../../domain/models';
import { DomainState } from './';

export type DomainActionType =
  | { type: 'DOMAIN - Load Domains', payload: Array<Domain> }
  | { type: 'DOMAIN - Start load domains with qualifications', payload: Array<DomainQualifications> }

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
    default:
      return state;
  }

}
