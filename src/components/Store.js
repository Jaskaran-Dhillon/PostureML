import React, { useReducer } from 'react';

const Reducer = (state, action) => {
    switch (action.type) {
        case "Head Tilt":
            return {
                ...state,
                HeadTilt: state.HeadTilt + 1
            }
        case "Hunching":
            return {
                ...state,
                Hunching: state.Hunching + 1
            }
        case "Reclining Back":
            return {
                ...state,
                RecliningBack: state.RecliningBack + 1
            }
        case "Resting Head on Hand":
            return {
                ...state,
                HeadOH: state.HeadOH + 1
            }
        default: return state;
    }
}
const initialState = {
    HeadTilt: 0,
    Hunching: 0,
    RecliningBack: 0,
    HeadOH: 0
}
const Store = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState)
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
}
export const Context = React.createContext(initialState);

export default Store;