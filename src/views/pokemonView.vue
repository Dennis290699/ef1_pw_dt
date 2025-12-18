<template>
  <div class="container">
    <GameMessage
      v-if="mensajeFinal"
      :mensajes="mensajeFinal"
      :tipo="mensajeTipo"
      @nuevo-juego="nuevoJuego"
    />

    <div v-else class="juego-container">
      <div class="img-container">
        <Slot
          v-for="(slot, i) in slots"
          :key="i"
          :imagen="slot.imagen"
          :nombre="slot.nombre"
        />
      </div>

      <div class="container-info">
        <p class="data-text">Puntaje: {{ puntaje }}</p>
        <p class="data-text">Intentos: {{ intentos }}</p>
      </div>

      <button
        class="btn-inicio"
        @click="jugar"
        :disabled="intentos === 5"
      >
        JUGAR
      </button>

    </div>
  </div>
</template>

<script>
import Slot from "@/components/SlotsGame.vue";
import GameMessage from "@/components/GameMessage.vue";
import { getRandomPokemon } from "@/clients/pokemonFacade";

export default {
  name: "PokemonView",
  components: { Slot, GameMessage },

  data() {
    return {
      slots: this.crearSlots(3),
      puntaje: 0,
      intentos: 0,
      mensajeFinal: null,
      mensajeTipo: ""
    };
  },

  methods: {
    vacio() {
      return {
        imagen: "https://dummyimage.com/250x250",
        nombre: "XXXXXXXXXX"
      };
    },

    async jugar() {
    if (this.intentos >= 5) return;

    const resultados = await Promise.all([
        getRandomPokemon(),
        getRandomPokemon(),
        getRandomPokemon()
    ]);

    this.slots = resultados;
    this.intentos++;

    this.calcularPuntaje(resultados);
    this.validarFin();
    },
    calcularPuntaje(slots) {
      const nombres = slots.map(s => s.nombre);
      const conteo = {};

      nombres.forEach(n => conteo[n] = (conteo[n] || 0) + 1);
      const max = Math.max(...Object.values(conteo));

      if (max === 3) this.puntaje += 5;
      else if (max === 2) this.puntaje += 2;
    },

    validarFin() {
      if (this.puntaje >= 10) {
        this.mensajeFinal = [
          `Puntaje: ${this.puntaje}`,
          "Felicitaciones has ganado un premio de $10.000,00"
        ];
        this.mensajeTipo = "azul";
      } else if (this.intentos === 5) {
        this.mensajeFinal = [
          "Has utilizado tus 5 intentos",
          "El juego ha terminado, inténtalo nuevamente"
        ];
        this.mensajeTipo = "rojo";
      }
    },
    crearSlots(numero) {
      const slots = [];
      for (let i = 0; i < numero; i++) {
        slots.push(this.vacio());
      }
      return slots;
    },

    nuevoJuego() {
      this.puntaje = 0;
      this.intentos = 0;
      this.mensajeFinal = null;
      this.mensajeTipo = "";
      this.slots = this.crearSlots(3);
    }
  }
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.juego-container {
  text-align: center;
}

.img-container {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 24px;
}

.container-info {
  margin-bottom: 12px;
}

.data-text {
  font-size: 25px;
  font-weight: bold;
  margin: 4px 0;
}

.btn-inicio {
  margin-top: 16px;
  padding: 12px 28px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 10px;
  border: 2px solid #000;
  cursor: pointer;
  background-color: #fff;
  color: #000;
}

.btn-inicio:hover {
  background-color: #9e9e9eb9;
}

.btn-inicio:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}
</style>
