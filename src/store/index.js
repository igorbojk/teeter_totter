import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);

import {
    TOGGLE_PAUSE,
    INITIALIZE_FALLING_ELEMENTS,
    TOGGLE_GAME_START,
    FINISH_FALLING,
    ADD_FALLING_ELEMENT,
    ADD_LEFT_ELEMENTS,
    START_NEW_GAME,
    ADD_RIGHT_SIDE_ELEMENTS,
    MOVE_RIGHT,
    MOVE_LEFT,
    MAX_SIDES_DIFFERENCE,
    MIN_BENDING,
    MAX_BENDING,
    RESET_STATE
} from "../consts/constants";
import {
    generateRandomElem,
    getBlockPower
} from "../shared/helpers";
export default new Vuex.Store({
    state: {
        isPause: false,
        fallingElements: [],
        leftSideElements: [],
        rightSideElements: [],
        isGameStarted: false
    },
    actions: {
        [FINISH_FALLING]({commit, getters}, payload) {
            commit(ADD_LEFT_ELEMENTS, payload);
            if (getters.gameOverStatus) {
                setTimeout(() => {
                    alert('game over');
                    commit(RESET_STATE);
                }, 0)
            } else {
                setTimeout(() => {
                    commit(ADD_FALLING_ELEMENT);
                }, 500)
            }
            
        },
        [START_NEW_GAME]({commit}){
            commit(RESET_STATE);
            commit(ADD_RIGHT_SIDE_ELEMENTS);
            commit(INITIALIZE_FALLING_ELEMENTS);
            commit(TOGGLE_GAME_START);
        }
    },
    mutations: {
        [TOGGLE_GAME_START](state) {
            state.isGameStarted = !state.isGameStarted
        },
        [TOGGLE_PAUSE](state) {
            state.isPause = !state.isPause
        },
        [INITIALIZE_FALLING_ELEMENTS](state){
            state.fallingElements = [];
            const randomElem = generateRandomElem();
            state.fallingElements.push(randomElem)
        },
        [ADD_FALLING_ELEMENT](state){
            const randomElem = generateRandomElem();
            state.fallingElements.push(randomElem)
        },
        [ADD_LEFT_ELEMENTS](state, payload) {
            const block = state.fallingElements.shift();
            block.top = payload.topOffset;
            state.leftSideElements.push(block);
        },
        [ADD_RIGHT_SIDE_ELEMENTS](state) {
            const randomElem = generateRandomElem();
            state.rightSideElements.push(randomElem)
        },
        [MOVE_RIGHT](state){
            if (state.isPause || state.fallingElements[0].offset - 1 <= 0) return;
            state.fallingElements[0].offset -= 1;
        },
        [MOVE_LEFT](state){
            if (state.isPause || state.fallingElements[0].offset + 1 > 5) return;
            state.fallingElements[0].offset += 1;
        },
        [RESET_STATE](state) {
            state.isPause = false;
            state.isGameStarted = false;
            state.leftSideElements = [];
            state.rightSideElements = [];
            state.fallingElements = [];
        }
    },
    getters: {
        swingBending(state, getters) {
            const {leftSum, rightSum} = getters;
            if (!leftSum && state.isGameStarted) return MAX_BENDING;
            if (leftSum === rightSum) return 0;
            return leftSum > rightSum ? -(leftSum - rightSum) : rightSum - leftSum
        },
        leftSum(state) {
            return getBlockPower(state.leftSideElements, true)
        },
        rightSum(state) {
            return getBlockPower(state.rightSideElements)
        },
        gameOverStatus(state, getters) {
            const {leftSum, rightSum, swingBending} = getters;
            return swingBending > MAX_BENDING || swingBending < MIN_BENDING || Math.abs(leftSum - rightSum) > MAX_SIDES_DIFFERENCE
        }
    }
});