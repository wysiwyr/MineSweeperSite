import {createAction, handleActions} from "redux-actions";
import produce from "immer";

const INITIALIZE = 'game/INITIALIZE';
const SET_LEVEL = 'game/SET_LEVEL';
const START_GAME = 'game/START_GAME';
const OPEN_BLOCK = 'game/OPEN_BLOCK';
const SET_FLAG = 'game/SET_FLAG';
const FINISH_GAME = 'game/FINISH_GAME';

export const initializeGame = createAction(INITIALIZE);
export const setLevel = createAction(SET_LEVEL, level => level);
export const startGame = createAction(START_GAME,
    ({ground, size, width, mineNum}) => ({
        ground,
        size,
        width,
        mineNum,
    }));
export const openBlock = createAction(OPEN_BLOCK, id => id);
export const setFlag = createAction(SET_FLAG, id => id);
export const finishGame = createAction(FINISH_GAME, clear => clear);

const initialState = {
    level: '쉬움',
    isStart: false,
    isFinish: false,
    isClear: '',
    ground: [],
    size: 0,
    width: 0,
    mineNum: 0,
    openBlockNum: 0,
};

export default handleActions(
    {
        [INITIALIZE]: state => initialState,
        [SET_LEVEL]: (state, {payload: level}) => ({
            ...state,
            level: level
        }),
        [START_GAME]: (state, {payload: {ground, size, width, mineNum}}) => ({
            ...state,
            isStart: true,
            ground: ground,
            size: size,
            width: width,
            mineNum: mineNum,
        }),
        [OPEN_BLOCK]: (state, {payload: id}) =>
            produce(state, draft => {
                draft.ground[id].flagSet = false;
                draft.ground[id].isOpen = true;
                draft.openBlockNum++;
            }),
        [SET_FLAG]: (state, {payload: id}) =>
            produce(state, draft => {
                draft.ground[id].flagSet = !draft.ground[id].flagSet;
            }),
        [FINISH_GAME]: (state, {payload: clear}) =>
            produce(state, draft => {
                draft.ground.map(space => space.val === 'X' ? space.isOpen = true : space);
                draft.isFinish = true;
                draft.isClear = clear;
            }),
    }, initialState
);
