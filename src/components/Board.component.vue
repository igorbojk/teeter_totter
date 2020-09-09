<template>
  <div class="board">
      <FallingArea />
      <TetterTotter/>
  </div>
</template>

<script>
import TetterTotter from "./TeeterTotter.component";
import FallingArea from "./FallingArea.component";
export default {
    components: {
        TetterTotter,
        FallingArea
    }
}
</script>

<style scoped>
    .board{
        width: 70%;
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
    }
</style>