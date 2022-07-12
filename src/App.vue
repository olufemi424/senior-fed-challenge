<template>
  <!-- <div>
    <nav class="">
      <router-link to="/"> Home </router-link> |
      <router-link to="/rayu"> Pokenmon: name </router-link>
      <router-view />
    </nav>
  </div> -->
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({ name: "App" });
</script>

<style>
#app {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  box-sizing: border-box;
}
</style>
