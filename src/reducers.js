
import {NEW_MOVE, REWIND} from "./actionTypes"

const initialState = {
    history: [{squares: Array(9).fill(null)}],
    xIsNext: true,
    stepNumber: 0,
};

const rootReducer = (state = initialState, action) =>{
    if (action.type === NEW_MOVE){
        const history = state.history.slice(0, state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        
        squares[action.value] = state.xIsNext ? 'X' : 'O';
        return Object.assign({}, state, {
          history: history.concat([{
            squares: squares
          }]),
          stepNumber: history.length,
          xIsNext: !state.xIsNext,
        });
    }

    if (action.type === REWIND){
        return Object.assign({}, state, {
            history: state.history,
            stepNumber: action.value,
            xIsNext: (action.value % 2) === 0,
        });
    }

    return state;
}

export default rootReducer;