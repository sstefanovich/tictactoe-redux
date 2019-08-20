import { NEW_MOVE, REWIND } from "./actionTypes"

export const Move = (value) => ({
    type: NEW_MOVE,
    value: value,
});

export const rewind = (value) => ({
    type: REWIND,
    value: value,
});