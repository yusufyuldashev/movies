<template>
  <teleport to="body">
    <div v-if="id" @click="tryClose" class="backdrop"></div>
    <dialog open v-if="id">
      <iframe
        width="100%"
        height="100%"
        :src="`https://www.youtube.com/embed/${youtube}`"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </dialog>
    <h3 class="cancel" @click="tryClose">X</h3>
  </teleport>
</template>

<script>
import axios from 'axios'

export default {
  props: ['id'],
  emits: ['close'],
  data() {
    return {
      open: false,
      error: null,
      youtube: '',
    }
  },
  mounted() {
    this.trailer()
  },
  computed: {
    iframe() {
      return 'https://www.youtube.com/watch?v=nRwLyKIBNU8'
    },
  },
  methods: {
    async trailer() {
      try {
        const api_key = 'e10a98df5c335fc5102ecda2cf9b7dbf'
        const base_url = 'https://api.themoviedb.org/3'
        const api_url = base_url + `/movie/${this.id}/videos?api_key=${api_key}`
        const response = await axios.get(api_url).then((res) => {
          this.youtube = res.data.results[0].key
          return res.data.results
        })

        return response
      } catch (err) {
        this.error =
          err.message ||
          'failed to authendicate , try  later check  your login data'
      }
    },
    tryClose() {
      this.$emit('close')
    },
  },
}
</script>

<style scoped lang="scss">
@import '../../sass/_colors.scss';

.cancel {
  color: $blue !important;
  position: fixed;
  z-index: 111;
  font-size: 35px;
  top: 10px;
  right: 30px;
  display: inline-block;
  cursor: pointer;
}
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
@media only screen and (max-width: 892px) {
  dialog {
    left: 11% !important;
  }
}
</style>
