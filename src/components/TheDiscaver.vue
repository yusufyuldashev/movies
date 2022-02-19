<template>
  <section>
    <div class="container">
      <base-movies
        :discover="this.$store.getters.discoverGetters"
        title="highest rated movies "
      ></base-movies>
      <base-movies
        :discover="this.$store.getters.discoverGetters2"
        title="highest grossing comedies"
      ></base-movies>
      <base-movies
        :discover="this.$store.getters.discoverGetters3"
        title="the most popular kids movies"
      ></base-movies>
      <base-movies
        :discover="this.$store.getters.discoverGetters4"
        title="Tom Cruise"
      ></base-movies>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      error: null,
    }
  },

  created() {
    this.discoveries()
  },
  methods: {
    async discoveries() {
      try {
        await this.$store.dispatch('discoverMovies')
        await this.$store.dispatch('discoverMovies2')
        await this.$store.dispatch('discoverMovies3')
        await this.$store.dispatch('discoverMovies4')
      } catch (error) {
        this.error = error.message || 'Something failed!'
      }
    },
  },
}
</script>
<style scoped lang="scss">
.container {
  width: 1050px;
  margin: 0 auto;
}
.main__list2 {
  margin-top: 50px;
}
</style>
