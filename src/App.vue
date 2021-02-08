<template>
  <div id="app">
    <header/>
    <Notas/>
  </div>
</template>

<script>

import header from './components/header.vue'
import Notas from './components/notas.vue'

export default {
  name: 'App',
  components: {
    header,
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
