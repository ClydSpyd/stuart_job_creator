import { initialState } from "./initialState";

export function reducer(state, action) {
    switch (action.type) {
      case 'reset_state':
        return {...initialState, map:state.map};
      case 'set_map':
        return { ...state, map: action.payload };
      case 'set_input':
        return { ...state, locationData: action.payload };
      case 'set_markers':
        return { ...state, markers: action.payload };
      case 'set_toast_text':
        return { ...state, toastText: action.payload };
      default:
        throw new Error();
    }
  }