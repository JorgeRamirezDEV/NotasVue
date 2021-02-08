<template>
  <div id="app">
    <top/>
    <Notas/>
  </div>
</template>

<script>

import top from './components/top.vue'
import Notas from './components/notas.vue'

export default {
  name: 'App',
  components: {
    top,
    Notas
  }
}
</script>

<style>
  body{
    margin: 0;
    padding: 0;
    background: white;
    font-family: sans-serif;
    text-align: center;
  }
</style>
