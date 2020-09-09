<template>
  <div class="swing"  :style="getStyle">
    <TetterTotterElement 
      v-for="elem in leftSideElements"
      :elem="elem"
      :key="elem.id"
    />
    <TetterTotterElement 
      v-for="elem in rightSideElements"
      :elem="elem"
      :key="elem.id"
      :side="true"
    />
  </div>
</template>

<script>
import TetterTotterElement from "./TetterTotterElement.component.vue";
import {mapState, mapGetters} from 'vuex'

export default {
  components: {
    TetterTotterElement
  },
  computed: {
    ...mapState([
      'leftSideElements',
      'rightSideElements'
    ]),
    ...mapGetters([
      'swingBending'
    ]),
    getStyle() {
      return {
        transform: `rotate(${this.swingBending / 4}deg)`
      }
    }
  }
}
</script>

<style scoped>
    .swing{
        width: 100%;
        height: 10px;
        background: red;
        position: relative;
        transform: rotate(0);
        transform-origin: center;
        transition: transform .3s;
    }
</style>