<template>
  <div class="slot">
    <img class="slot-image" :src="imagen" alt="No se puede cargar la imagen"/>
    <p class="slot-name">{{ nombre }}</p>
  </div>
</template>

<script>
export default {
  name: "SlotsGame",
  props: {
    imagen: String,
    nombre: String
  }
};
</script>

<style scoped>
.slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.slot-image {
  width: 250px;
  height: 250px;
  border: 1px solid #000;
  border-radius: 12px;
  background-color: #eee;
}

.slot-name {
  font-weight: bold;
  text-transform: capitalize;
  text-align: center;
  font-size: 25px;
}
</style>