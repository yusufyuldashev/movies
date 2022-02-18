<template>
  <section>
    <button @click="allMovies" class="all__movies" type="button">
      {{ showHide }}
    </button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      all: false,
    }
  },
  computed: {
    showHide() {
      if (!this.all) {
        return 'All Movies'
      } else {
        return 'Hide Movies'
      }
    },
  },
  methods: {
    allMovies() {
      this.all = !this.all
      this.$emit('change', this.all)
    },
  },
}
</script>

<style scoped lang="scss">
@import '../../sass/_colors.scss';

.all__movies {
  font-weight: 600;
  border: 1px solid white;
  padding: 20px 70px;
  color: $blue;
  display: block;
  font-size: 17px;
  border-radius: 30px;
  background-color: #20202b;

  box-shadow: 0px 2px 96px -18px rgba(36, 150, 255, 1);
  -webkit-box-shadow: 0px 2px 96px -18px rgba(36, 150, 255, 1);
  -moz-box-shadow: 0px 2px 96px -18px rgba(36, 150, 255, 1);
  cursor: pointer;
  margin: 0 auto 30px auto;
  transition: all 0.4s;
  &:hover {
    border: 1px solid #2496ff;
    background-color: rgb(19, 19, 19);
  }
}
</style>
