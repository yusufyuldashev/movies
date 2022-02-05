<template>
  <teleport to="body">
    <div v-if="id" @click="tryClose" class="backdrop"></div>
    <dialog open v-if="id">
      <iframe
        :src="`https://autoembed.xyz/movie/tmdb/${id}`"
        width="100%"
        height="100%"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </dialog>
  </teleport>
</template>

<script>
export default {
  props: ['id'],
  emits: ['close'],
  data() {
    return {
      open: false,
    }
  },
  methods: {
    tryClose() {
      this.$emit('close')
    },
  },
}
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}
dialog {
  position: fixed;
  top: 10vh;
  left: 15.5%;
  width: 78%;
  height: 80%;

  z-index: 100;
  border-radius: 12px;
  border: none;
  padding: 0;
  margin: 0;
  overflow: hidden;
}
</style>
