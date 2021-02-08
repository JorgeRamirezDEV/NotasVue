<template>
  <div id="app">
    <Cabecera/>
    <Notas/>
    <Pie/>
  </div>
</template>

<script>

import Cabecera from './components/cabecera.vue'
import Notas from './components/notas.vue'
import Pie from './components/pie.vue'

export default {
  name: 'App',
  components: {
    Cabecera,
    Notas,
    Pie
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
