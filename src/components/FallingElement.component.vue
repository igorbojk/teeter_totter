<template>
  <div>
      <TetterTotterElement 
        :elem="elem"
        :top="blockTopCoords"
        :ref="'fallingELement'"
      />
  </div>
</template>

<script>
import TetterTotterElement from "./TetterTotterElement.component.vue";
import {mapState} from 'vuex';
import {
    FINISH_FALLING,
    TEETER_TOTTER_WIDTH
} from "../consts/constants";
export default {
    props: {
        elem: {
            type: Object,
            required: true
        },
        index: {
            type: Number
        },
        timeOut: {
            type: Number
        }
    },
    components: {
        TetterTotterElement
    },
    data() {
        return {
            timeout: null,
            blockWindowBottomCoords: 0,
            blockTopCoords: this.block ? this.block.height : 0
        }
    },
    computed: {
        ...mapState({
            isPause: state => state.isPause,
            isGameStarted: state => state.isGameStarted,
            leftSideElements: state => state.leftSideElements
        }),
        swingBending() {
            return this.$store.getters.swingBending
        },
        getBlockStyles() {
            return {
                top: `${this.blockTopCoords}px`,
            }
        },
        finishCoords() {
            const {top, bottom} = this.getSwingCoords();
            return this.swingBending >= 0 ? top + ((bottom - top) / 2) * (1 - this.elem.offset / (TEETER_TOTTER_WIDTH / 2))
                    : bottom - ((bottom - top) / 2) * (1 - this.elem.offset / (TEETER_TOTTER_WIDTH / 2));
        },
    },
    methods: {
        incrementBlockTopCoords() {
            this.blockTopCoords += 20;
        },
        getSwingCoords() {
            const {top, bottom} = document.querySelector('.swing').getBoundingClientRect();
            return {
                top, bottom
            }
        },
        moveElem() {
            if (this.isPause || !this.isGameStarted) return clearTimeout(this.timer);
            if (this.index !== 0) return;
            // at the moment only two elements can be stacked on top of each other
            // We need more calculations for height and indents in order to put otalny elements
            let touchElemTopCoord = 0;
            let touchElemId = null;
            this.leftSideElements.forEach(elem => {
                const {y, x} = this.$refs.fallingELement.getElemCoord();
                const {y: elY, x: elX, elWidth} = document.querySelector(`.${elem.id}-elem`).getBoundingClientRect();
                if(y < elY && (x > elX || x < elX + elWidth)) {
                    touchElemTopCoord = elY;
                    touchElemId = elem.id;
                }
            })
            this.blockWindowBottomCoords = this.$refs.fallingELement.getElemCoord().bottom;
            this.timer = setTimeout(() => {
                if (this.blockWindowBottomCoords >= this.finishCoords - 40 || touchElemTopCoord ? this.blockWindowBottomCoords >= touchElemTopCoord - this.elem.height : false) {
                    clearTimeout(this.timer);
                    let top = 0;
                    if (touchElemId) {
                        top = document.querySelector(`.${touchElemId}-elem`).getBoundingClientRect().height - 20;
                    }
                    this.$store.dispatch({type: FINISH_FALLING, topOffset: top});
                    this.$emit('finished-falling');
                    return;
                }
                this.incrementBlockTopCoords();
                this.moveElem();
            }, this.timeOut);
        }
    },
    mounted() {
        this.moveElem();
    },
    watch: {
        isGameStarted: function (value) {
            if (value) {
                this.moveElem();
            }
        },
        isPause: function (value) {
            if (!value) {
                this.moveElem();
            }
        }
    }
}
</script>

<style scoped>
</style>