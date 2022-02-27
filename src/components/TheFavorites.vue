<template>
  <section>
    <div class="container1">
      <h1 class="favorites">Favorites</h1>
      <ul class="main__list">
        <li
          class="main__item"
          v-for="film in movies"
          :key="film.id"
          :id="film.id"
          @click="dataChange2(film.id)"
        >
          <div class="wrapper__img">
            <img :src="image + film.poster_path" />
          </div>
          <p
            class="wrapper__rate"
            :class="{
              vote2: film.vote_average * 10 > 75,
              vote: film.vote_average * 10 < 60,
            }"
          >
            {{ film.vote_average * 10 }}
          </p>
          <p class="main__title">{{ film.release_date }}</p>
          <p class="main__text">{{ film.title }}</p>
        </li>
      </ul>
    </div>
    <div class="card" v-if="movies == ''">
      <h1><VueWriter :array="arr" /></h1>
      <router-link to="/movies">Movies</router-link>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      mo: false,
      arr: ['Please go to the movies section and click like'],
    }
  },
  watch: {},
  computed: {
    movies() {
      return this.$store.getters.moviesGetter
    },
    image() {
      return 'https://image.tmdb.org/t/p/w500'
    },
    isCompolete() {
      return this.addPage <= 10
    },
  },
  created() {
    return this.$store.getters.moviesGetter
  },

  methods: {},
}
</script>

<style scoped lang="scss">
section {
  height: 90vh !important;
}
.card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 10rem auto;
  max-width: 40rem;
  background: transparent;

  a {
    text-decoration: none;
    text-align: right;
    display: block;
    color: #2d2d42;
    font-family: 'Roboto';
    font-size: 20px;
  }
}
h1 {
  text-align: center;
  color: #2496ff;
  font-size: 30px;
}
.favorites {
  text-align: center;
  color: rgb(14, 180, 231);
  font-family: 'Roboto';
  font-size: 30px;
}
.container1 {
  width: 1050px;
  margin: 0 auto;
}
.vote {
  background: red !important;
}
.vote2 {
  background: green !important;
}
.main__list {
  display: flex;
  list-style: none;
  font-family: 'Roboto';
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 0;
  margin: 50px 0 0 0;
  //   justify-content: space-between;
  margin-bottom: 40px;
  .wrapper__rate {
    position: absolute;
    color: white;
    background: black;
    margin-left: 165px;
    top: -25px;
    padding: 10px;
    border-radius: 20px;
  }
  .main__item {
    padding: 0;
    position: relative;

    width: 20%;
    height: auto !important;
    cursor: pointer;
    .wrapper__img {
      width: 90%;
      height: 250px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 20px;
        // aspect-ratio: 5/5 !important;
        object-fit: cover;
      }
    }
    .main__title {
      color: white;
      font-weight: normal;
      font-weight: bold;
      color: green;
      display: inline-block;
      margin-left: 50px;
      margin-bottom: 0;
    }
    .main__text {
      width: 150px;
      text-align: center;
      margin-left: 20px;
      margin-top: 0;
      font-size: 15px;

      color: white;
    }
  }
}
@media only screen and (max-width: 1200px) {
  .container1 {
    width: 95% !important;
  }
}
@media only screen and (max-width: 1150px) {
  .main__item {
    width: 25% !important;
  }
}
@media only screen and (max-width: 992px) {
  .main__item {
    width: 33% !important;
    margin: 0 0 40px 0;
  }
  .wrapper__rate {
    top: 0 !important;
    margin-left: 0 !important;
  }
  .main__title {
    margin-left: 0 !important;
    display: flex !important;
    justify-content: center !important;
  }
  .main__text {
    margin: 0 auto !important;
  }
}
@media only screen and (max-width: 792px) {
  .main__item {
    width: 50% !important;
  }
}
</style>
