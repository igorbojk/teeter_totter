<template>
  <div class="navigation">
      <button @click="startNewGame" v-if="!isGameStarted">
        start
      </button>
      <button @click="togglePause" v-if="isGameStarted">
        {{isPause ? "continue": "pause"}}
      </button>
  </div>
</template>

<script>
import {mapMutations, mapState, mapActions} from 'vuex'
import {
  TOGGLE_PAUSE,
  START_NEW_GAME
} from "../consts/constants";
export default {
  computed: {
    ...mapState({
      isPause: state => state.isPause,
      isGameStarted: state => state.isGameStarted
    }),
  },
  methods: {
    ...mapMutations({
      togglePause: TOGGLE_PAUSE
    }),
    ...mapActions({
      startNewGame: START_NEW_GAME
    })
  }
 
}
</script>

<style scoped>
.navigation{
    width: 100%;
}
</style>