import {createAction, handleActions} from "redux-actions";
import produce from "immer";
import calcDate from "../lib/calcDate";
import calcWillOpenBlock from "../lib/calcWillOpenBlock";
import calcChord from "../lib/calcChord";
import calcHighlightOff from "../lib/calcHighlightOff";

const INITIALIZE_GAME = 'game/INITIALIZE'; // 게임 초기화
const SET_LEVEL = 'game/SET_LEVEL'; // 게임 난이도 설정
const START_GAME = 'game/START_GAME'; // 게임 시작
const OPEN_BLOCK = 'game/OPEN_BLOCK'; // 블록을 열때 사용
const OPEN_NEAR_BLOCK = 'game/OPEN_NEAR_BLOCK';
const INCREASE_OPEN_BLOCK_NUM = 'game/INCREASE_OPEN_BLOCK_NUM'; // 열린 블록의 수를 더할 때 사용
const SET_FLAG = 'game/SET_FLAG'; // 지뢰 위치 설정할 때 사용
const DO_CHORD = 'game/DO_CHORD'; // 마우스 휠버튼을 눌렀을 때 사용
const HIGHLIGHT_OFF = 'game/HIGHLIGHT_OFF'; // 주변에 닫혀있는 블록 위치 하이라이트끌 때 사용
const FINISH_GAME = 'game/FINISH_GAME'; // 게임 종료

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
export const openNearBlock = createAction(OPEN_NEAR_BLOCK, id => id);
export const increaseOpenBlockNum = createAction(INCREASE_OPEN_BLOCK_NUM, num => num);
export const setFlag = createAction(SET_FLAG, id => id);
export const doChord = createAction(DO_CHORD, id => id);
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
                draft.ground[id].isHighlight = false;
                draft.ground[id].isOpen = true;
            }),
        [OPEN_NEAR_BLOCK]: (state, {payload: id}) =>
            produce(state, draft => {
                const ids = calcWillOpenBlock(id, draft.ground, draft.size, draft.width, draft.nearBlock);
                draft.ground.map(function (space) {
                    ids.forEach(function (id) {
                        if (space.id === id) {
                            space.isOpen = true;
                            space.flagSet = false;
                            space.isHighlight = false;
                        }
                    });
                    return space;
                });
            }),
        [INCREASE_OPEN_BLOCK_NUM]: (state, {payload: num}) =>
            produce(state, draft => {
                draft.openBlockNum = num;
            }),
        [SET_FLAG]: (state, {payload: id}) =>
            produce(state, draft => {
                draft.ground[id].flagSet = !draft.ground[id].flagSet;
                draft.ground[id].isHighlight = false;
            }),
        [DO_CHORD]: (state, {payload: id}) =>
            produce(state, draft => {
                const val = calcChord(id, draft.ground, draft.size, draft.width, draft.nearBlock);
                let ids = [];
                let finish = false;
                val.type === 'OpenBlock'
                    ? draft.ground.map(function (space) {
                        val.ids.every(function (id) {
                            if (space.id === id) {
                                if (space.val === 'X') {
                                    finish = true;
                                    return false;
                                } else if (space.val === 0) {
                                    space.isOpen = true;
                                    space.flagset = false;
                                    space.isHighlight = false;
                                    ids = ids.concat(calcWillOpenBlock(id, draft.ground, draft.size, draft.width, draft.nearBlock)).sort();
                                } else {
                                    space.isOpen = true;
                                    space.flagset = false;
                                    space.isHighlight = false;
                                }
                            }
                            return true;
                        });

                        return space;
                    }).map(function (space) {
                        ids.forEach(function (id) {
                            if (space.id === id) {
                                space.isOpen = true;
                                space.flagset = false;
                                space.isHighlight = false;
                            }
                        });
                        return space;
                    })
                    : draft.ground.map(function (space) {
                        val.ids.forEach(function (id) {
                            if (space.id === id) {
                                space.isHighlight = true;
                            }
                        });
                        return space;
                    });
                if (finish) {
                    draft.ground.map(space => space.val === 'X' ? space.isOpen = true : space);
                    draft.isFinish = true;
                    draft.isClear = 'Game Over...';
                    draft.time = calcDate(draft.startTime, new Date());
                }
            }),
        [HIGHLIGHT_OFF]: (state, {payload: id}) =>
            produce(state, draft => {
                const ids = calcHighlightOff(id, draft.ground, draft.size, draft.width, draft.nearBlock);
                draft.ground.map(function (space) {
                    ids.forEach(function (id) {
                        if (space.id === id) {
                            space.isHighlight = false;
                        }
                    });
                    return space;
                });
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
