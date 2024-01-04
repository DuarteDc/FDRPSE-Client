import { Domain } from '../../../domain/models';
import { DomainState } from './';

export type DomainActionType =
  | { type: 'DOMAIN - Load Domains', payload: Array<Domain> }

export const domainReducer = (state: DomainState, action: DomainActionType) => {

  switch (action.type) {
    case 'DOMAIN - Load Domains':
      return {
        ...state,
        domains: action.payload,
      }

    default:
      return state;
  }

}
