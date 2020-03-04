/*
↓ 부분은 사용안하는 action
const HIGHLIGHT_ON = 'game/HIGHLIGHT_ON'; // 주변에 닫혀있는 블록 위치 하이라이트할 때 사용

export const highlightOn = createAction(HIGHLIGHT_ON, id => id);

        [HIGHLIGHT_ON]: (state, {payload: id}) =>
            produce(state, draft => {
                draft.ground[id].isHighlight = true;
            }),
 */

/*
       ↓ 부분은 이전의 HIGHLIGHT_OFF action
       [HIGHLIGHT_OFF]: (state, {payload: id}) =>
            produce(state, draft => {
                draft.ground[id].isHighlight = false;
            }),*/