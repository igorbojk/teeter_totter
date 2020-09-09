<template>
  <div class="teeter-totter">
      <Swing />
      <Stand />
  </div>
</template>

<script>
import Stand from "./Stand.component";
import Swing from "./Swing.component";

export default {
    components: {
        Stand,
        Swing
    }
}
</script>

<style scoped>
.teeter-totter{
    width: 100%;
}
</style>