<template lang="html">

  <section class="notas">
  
    <div class="box">
      <form>
        <input type="text" v-on:keyup.enter="anadirElemento" v-on:keyup="teclaPulsada" v-model="input">
        <input type="button" v-bind:disabled="isButtonDisabled" v-on:click="anadirElemento" value="Añadir a lista">
      </form>
    </div>
    <div class="cuerpo">
      <p>Filtrar tareas: <input v-on:keyup.enter="anadirElemento" v-on:keyup="teclaPulsada" v-model="empiezaPor"></p>

      <p>{{tareasPendientes}} tareas pendientes de un total de {{totalTareas}}</p>
      <button v-on:click="borrarTareasCompletadas">Borrar tareas completadas</button>

      <ol>
      <!-- Hacer que el campo que se muestra aquí ssea el filtrado, que es calculado -->
        <li v-on:click="cambiarEstadoTarea(index)" v-for="(todo, index) in listaFiltrada" v-bind:key="todo+index" v-bind:class="{ completado: todo.completado}">
          {{ todo.titulo }} La tarea tiene prioridad {{todo.prioridad}}
          <!-- <span v-if="todo.completado">&nbsp;Tarea terminada</span> -->
        </li>
      </ol>
    </div>
    <div class="buttons">
    
    <input type="button" value="Login" v-on:click="login">
    <input type="button" value="Logout" v-on:click="logout">
    </div>
    
  </section>

</template>

<script lang="js">

// import {db} from "../db.js"
import firebase from "../db.js"

  export default  {
    name: 'notas',
    props: [],
    mounted () {
      if (localStorage.listaTareas) {
        this.todos = JSON.parse(localStorage.listaTareas);
      }
    },
    data () {
      return {
        input: "",
        todos: [],
        isButtonDisabled: true,
        empiezaPor: ""
      }
    },
    methods: {
      anadirElemento: function () {
        if (this.input.length > 0) {
          this.todos.push({
            titulo: this.input,
            prioridad: 0,
            fechaCreacion: new Date(),
            completado: false
          });
        this.input = "";
        this.actualizarLocalStorage();
        }
      },
      cambiarEstadoTarea: function (posicion) {
        this.todos[posicion].completado = !this.todos[posicion].completado;
        this.actualizarLocalStorage();
      },
      borrarTareasCompletadas: function () {
        this.todos = this.todos.filter(todo => !todo.completado);
        this.actualizarLocalStorage();
      },
      teclaPulsada: function () {
        if (this.input.length > 0) {
          this.isButtonDisabled = false;
        } else {
          this.isButtonDisabled = true;
        }
      },
      actualizarLocalStorage: function () {
        localStorage.listaTareas = JSON.stringify(this.todos);
      },
      login(){
        firebase.login();
      },
      logout(){
        firebase.logout();
      }
    },
    computed: {
      totalTareas: function (){
        return this.todos.lenght;
      },
      tareasCompletadas: function () {
        return this.todos.filter(todo => todo.completado).length;
      },
      tareasPendientes: function () {
        return this.todos.filter(todo => !todo.completado).length;
      },
      listaFiltrada: function () {
        /* return todo.titulo.startsWith(this.empiezaPor); */
        if (this.empiezaPor == "") {
          return this.todos;
        }
        let listaFiltrada = this.todos.filter(todo => {
          if (todo.titulo.indexOf(this.empiezaPor) >= 0) {
            return true;
          } else {
            return false;
          }
        });

        // Ordenar
        //Ordenar por Titulo
        listaFiltrada = listaFiltrada.sort( (todo1, todo2) => {
          if (todo1.titulo < todo2.titulo) {
            return -1;
          } else if (todo1.titulo > todo2.titulo) {
            return 1;
          } else {
            return 0;
          }
        });

        return listaFiltrada;
      }
    }
  }


</script>

<style scoped>
  /*.notas{
    text-align: center;
  }*/

  .cuerpo{
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%,-50%);
    margin: 10px;
  }

  .box {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%,-50%);
    margin: 10px;
  }
  .box input{
    position: relative;
    display: inline-block;
    font-size: 20px;
    box-sizing: border-box;
    transition: .5s;
  }

  .box input[type="text"]{
    background: #fff;
    width: 30vw;
    height: 50px;
    border: 1px solid black;
    border-radius: 10px;    
    outline: none;
    padding: 0 25px;
  }
  .box input[type="button"]{
    left: -5px;
    position: relative;
    width: 150px;
    height: 50px;
    border-radius: 10px;   
    border: none;
    outline: none;
    cursor: pointer;
    background: red;
    color: white;
    margin-left: 10px;
  }

  .buttons {
    position: absolute;
    left: 45%;
    top:  42%;
  }

  .buttons input {
    background-color: red;
    border-radius: 10px;   
    border: none;
    outline: none;
    color: white;
    cursor: pointer;
    padding: 10px;
    margin: 10px;
  }
</style>
