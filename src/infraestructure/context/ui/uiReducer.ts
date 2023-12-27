import { UIState } from './UIProvider';

type UIActionType =
    | { type: 'UI - Start - Loading'}
    | { type: 'UI - Stop - Loading'}

const uiReducer = (state: UIState, action: UIActionType) => {

    switch(action.type){
        
        default:
            return state;
    }

}

export default uiReducer