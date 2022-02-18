<template>
  <section>
    <div class="container">
      <base-movies
        :discover="discover"
        title="highest rated movies "
      ></base-movies>
      <base-movies
        :discover="discover2"
        title="highest grossing comedies"
      ></base-movies>
      <base-movies
        :discover="discover3"
        title="the most popular kids movies"
      ></base-movies>
      <base-movies :discover="discover4" title="Tom Cruise"></base-movies>
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

  computed: {
    discover() {
      return this.$store.getters.discoverGetters
    },
    discover2() {
      return this.$store.getters.discoverGetters2
    },
    discover3() {
      return this.$store.getters.discoverGetters3
    },
    discover4() {
      return this.$store.getters.discoverGetters4
    },
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
