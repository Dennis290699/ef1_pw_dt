<template>
  <PokemonView />
</template>

<script>
import PokemonView from '@/views/pokemonView.vue';

export default {
  name: 'App',
  components: {
    PokemonView
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: #f5f5f5;
}
</style>
