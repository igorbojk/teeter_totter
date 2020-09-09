<template>
  <div id="app">
    <Navigation/>  
    <Board/>
  </div>
</template>

<script>
import Navigation from './components/Navigation.component';
import Board from "./components/Board.component";
export default {
  name: 'App',
  components: {
    Navigation,
    Board
  }
}
</script>

<style>
body {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}
</style>
