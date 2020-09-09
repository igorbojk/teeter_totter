<template>
  <div class="falling-area">
      <FallingElement 
        v-for="(elem, index) in fallingElements"
        :key="index"
        :elem="elem"
        :index="index"
        @finished-falling="onFinishFalling"
        :timeOut="timeOut"
      >
      </FallingElement>
  </div>
</template>

<script>
import FallingElement from "./FallingElement.component";
import {mapState, mapMutations} from 'vuex';
import {
    MOVE_RIGHT,
    MOVE_LEFT,
    ITERATION_COUNT_INCREASING,
    INITIAL_TIMEOUT,
    TIMEOUT_STEP_DECREASING
} from "../consts/constants";
export default {
    data() {
        return {
            timeOut: INITIAL_TIMEOUT,
            iterationCounter: 0
        }
    },
    components: {
        FallingElement
    },
    computed: {
        ...mapState({
            fallingElements: state => state.fallingElements
        })
    },
    methods: {
        ...mapMutations({
            moveElementRight: MOVE_RIGHT,
            moveElementLeft: MOVE_LEFT,
        }),
        onKeyDown(ev) {
            if (ev.keyCode === 39) this.moveElementRight();
            if (ev.keyCode === 37) this.moveElementLeft();
        },
        onFinishFalling() {
            this.iterationCounter++;
            if (this.iterationCounter < ITERATION_COUNT_INCREASING) {
                this.timeOut -= TIMEOUT_STEP_DECREASING;
            } else {
                this.iterationCounter = 0;
                this.timeOut = 300;
            }
        }
    },
    beforeMount() {
        window.addEventListener('keydown', this.onKeyDown)
    },
    beforeDestroy() {
        window.removeEventListener('keydown', this.onKeyDown)
    }
}
</script>

<style scoped>
    .falling-area{
        flex: 1 1 auto;
        width: 100%;
        position: relative;
    }
</style>