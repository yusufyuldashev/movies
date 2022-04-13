<template>
  <div :class="{ black: nightMode, light: !nightMode }">
    <router-view @theme="allTheme"></router-view>
  </div>
</template>

<script>
export default {
  // components: { TheHeader },
  data() {
    return {
      nightMode: false,
    }
  },
  watch: {
    nightMode() {
      localStorage.setItem('nightMode', JSON.stringify(this.nightMode))
    },
  },

  created() {
    this.nightMode = JSON.parse(localStorage.getItem('nightMode'))

    this.$store.dispatch('tryLogin')
    return this.$store.getters.moviesGetter2
  },
  methods: {
    allTheme(value) {
      this.nightMode = value
    },
  },
}
</script>

<style scoped>
.light {
  background: #20202b;
}
.black {
  background: black;
}
div {
  background-color: #20202b;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
