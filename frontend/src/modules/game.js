import {createAction, handleActions} from "redux-actions";
import produce from "immer";
import calcDate from "../lib/calcDate";

const INITIALIZE_GAME = 'game/INITIALIZE';
const SET_LEVEL = 'game/SET_LEVEL';
const START_GAME = 'game/START_GAME';
const OPEN_BLOCK = 'game/OPEN_BLOCK';
const INCREASE_OPEN_BLOCK_NUM = 'game/INCREASE_OPEN_BLOCK_NUM';
const SET_FLAG = 'game/SET_FLAG';
const HIGHLIGHT_ON = 'game/HIGHLIGHT_ON';
const HIGHLIGHT_OFF = 'game/HIGHLIGHT_OFF';
const FINISH_GAME = 'game/FINISH_GAME';

export const initializeGame = createAction(INITIALIZE_GAME);
export const setLevel = createAction(SET_LEVEL, level => level);
export const startGame = createAction(START_GAME,
    ({ground, size, width, mineNum}) => ({
        ground,
        size,
        width,
        mineNum,
    }));
export const openBlock = createAction(OPEN_BLOCK, id => id);
export const increaseOpenBlockNum = createAction(INCREASE_OPEN_BLOCK_NUM, num => num);
export const setFlag = createAction(SET_FLAG, id => id);
export const highlightOn = createAction(HIGHLIGHT_ON, id => id);
export const highlightOff = createAction(HIGHLIGHT_OFF, id => id);
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
    nearBlock: [],
    startTime: null,
    time: null,
};

export default handleActions(
    {
        [INITIALIZE_GAME]: state => initialState,
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
            nearBlock: [-width, -1, 1, width, -width - 1, -width + 1, width - 1, width + 1],
            startTime: new Date(),
        }),
        [OPEN_BLOCK]: (state, {payload: id}) =>
            produce(state, draft => {
                draft.ground[id].flagSet = false;
                draft.ground[id].isOpen = true;
            }),
        [INCREASE_OPEN_BLOCK_NUM]: (state, {payload: num}) =>
            produce(state, draft => {
                draft.openBlockNum = num;
            }),
        [SET_FLAG]: (state, {payload: id}) =>
            produce(state, draft => {
                draft.ground[id].flagSet = !draft.ground[id].flagSet;
            }),
        [HIGHLIGHT_ON]: (state, {payload: id}) =>
            produce(state, draft => {
                draft.ground[id].isHighlight = !draft.ground[id].isHighlight;
            }),
        [HIGHLIGHT_OFF]: (state, {payload: id}) =>
            produce(state, draft => {
                draft.ground[id].isHighlight = !draft.ground[id].isHighlight;
            }),
        [FINISH_GAME]: (state, {payload: clear}) =>
            produce(state, draft => {
                draft.ground.map(space => space.val === 'X' ? space.isOpen = true : space);
                draft.isFinish = true;
                draft.isClear = clear;
                draft.time = calcDate(draft.startTime, new Date());
            }),
    }, initialState
);
