<template>
  <teleport to="body">
    <div v-if="id" @click="tryClose" class="backdrop"></div>
    <h4>you have to press the play button 1 or 2 times to watch the movie</h4>
    <dialog open v-if="id">
      <iframe
        :src="`https://autoembed.xyz/tv/tmdb/${id}-1-1`"
        width="100%"
        height="100%"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </dialog>
    <h3 class="cancel" @click="tryClose">X</h3>
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

<style scoped lang="scss">
@import '../../sass/_colors.scss';
h4 {
  color: red;
  position: fixed;
  font-weight: bold !important;
  top: -10px;
  left: 30%;
  z-index: 121;
  font-size: 25px;
}
.cancel {
  color: $blue !important;
  position: fixed;
  z-index: 111;
  font-size: 35px;
  top: 0;
  right: 30px;
  display: inline-block;
  cursor: pointer;
}
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  color: white;
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
}
</style>
