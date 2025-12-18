<template>
  <div class="mensaje-container" :class="gameMessageClass">
    <p class="txt-nombrePokemon" v-for="(m, i) in mensajes" :key="i">
      {{ m }}
    </p>

    <button class="btn-reset" @click="$emit('nuevo-juego')">
      Nuevo Juego
    </button>
  </div>
</template>

<script>
export default {
  name: "GameMessage",
  props: {
    mensajes: Array,
    tipo: String
  },
  emits: ["nuevo-juego"],
  computed: {
    gameMessageClass() {
      return this.tipo === "rojo"
        ? "mensaje--lose"
        : "mensaje--win";
    }
  }
};
</script>

<style scoped>
.mensaje-container {
  max-width: 420px;
  margin: 40px auto;
  padding: 24px;
  border-radius: 12px;
  text-align: center;
}

.mensaje--lose {
  background-color: #ffd6d6;
  color: #9c0000;
}

.mensaje--win {
  background-color: #d6ecff;
  color: #004a99;
}

.txt-nombrePokemon {
  font-weight: bold;
  margin: 8px 0;
}

.btn-reset {
  margin-top: 16px;
  padding: 10px 18px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.mensaje--lose .btn-reset {
  background-color: #9c0000;
  color: #fff;
}

.mensaje--win .btn-reset {
  background-color: #004a99;
  color: #fff;
}
</style>