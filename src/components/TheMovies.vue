<template>
  <section>
    <base-thedialog
      :show="!!error"
      title="An error ocured!!"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-thedialog>
    <base-thedialog :show="isLoading" title="Loading..." fixed>
      <p>Please wait</p>
      <base-spinner></base-spinner>
    </base-thedialog>
    <div v-if="clicked2 && !isLoading">
      <router-view
        :datas="datasMovie"
        :click="clicked2"
        :all2="all2"
      ></router-view>
    </div>
    <div class="container1" v-if="!isLoading">
      <h1 class="main__title" v-if="'en' == this.$store.getters.lang">
        Movies
      </h1>
      <h1 class="main__title" v-if="'ru' == this.$store.getters.lang">
        Фильмы
      </h1>
      <ul class="movies__genres" v-if="checkSreen > 693">
        <li
          class="movie__genre"
          v-for="genre in genres"
          :key="genre.id"
          :class="{ highlighted: genrex == genre.id }"
          @click="genreClick(genre.id)"
        >
          {{ genre.name }}
        </li>
      </ul>
      <ul
        class="movies__genres"
        v-if="checkSreen < 692"
        @mouseover="intervalStop"
        @mouseleave="intervalStart"
      >
        <Flicking
          ref="flicking"
          class="carousel"
          :options="{
            align: 'prev',
            circular: true,
            duration: 200,
            easing: function (x) {
              return x
            },
          }"
        >
          <li
            class="movie__genre"
            v-for="genre in genres"
            :key="genre.id"
            :class="{ highlighted: genrex == genre.id }"
            @click="genreClick(genre.id)"
          >
            {{ genre.name }}
          </li>
        </Flicking>
      </ul>
      <ul class="main__list">
        <li
          class="main__item"
          v-for="film in datasMovie"
          :key="film.id"
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
          <p class="main__title2">{{ film.release_date }}</p>
          <p class="main__text">{{ film.title }}</p>
        </li>
      </ul>
      <div class="page_wrapper">
        <button
          type="button"
          class="prev"
          :class="{ active3: isCompolete }"
          @click="changePage(addPage--)"
          :disabled="isCompolete"
          v-if="'en' === this.$store.getters.lang"
        >
          Prev
        </button>
        <button
          type="button"
          class="prev"
          :class="{ active3: isCompolete }"
          @click="changePage(addPage--)"
          :disabled="isCompolete"
          v-if="'ru' === this.$store.getters.lang"
        >
          предыдущий
        </button>
        <div
          class="page__num2"
          v-for="pageNum in totalPage2"
          :key="pageNum.id"
          @click="changePage(pageNum)"
        >
          {{ addPage }}
        </div>
        <!-- <div
          class="page__num"
          :class="{ page__btn: page === pageNum }"
          v-for="pageNum in totalPage"
          :key="pageNum.id"
          @click="changePage(pageNum)"
        >
          {{ pageNum }}
        </div> -->
        <button
          class="next"
          @click="changePage(addPage++)"
          v-if="'en' === this.$store.getters.lang"
        >
          Next
        </button>
        <button
          class="next"
          @click="changePage(addPage++)"
          v-if="'ru' === this.$store.getters.lang"
        >
          следующий
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import Flicking from '@egjs/vue3-flicking'

export default {
  props: ['datas', 'all2', 'saved'],
  components: {
    Flicking,
  },
  data() {
    return {
      datasMovie: [],
      genres: [],

      selectedGenres: null,
      clicked2: false,
      page: 1,
      limit2: 33000,
      totalPage2: 0,
      addPage: 2,
      genrex: null,
      isLoading: false,
      error: null,
      checkSreen: window.innerWidth,
    }
  },

  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthendicated
    },
    image() {
      return 'https://image.tmdb.org/t/p/w500'
    },
    isCompolete() {
      return this.addPage <= 1
    },
  },

  mounted() {
    this.isLoading = true
    this.fetchHomePage5()
    this.allGenres()
    this.fetchSearched()
    this.intervalStart()
    this.isLoading = false
  },
  watch: {
    datas(newData) {
      this.fetchSearched(newData)
    },
  },

  methods: {
    intervalStart() {
      this.intreval = setInterval(() => {
        this.$refs.flicking.next().catch(() => void 0)
      }, 3000)
    },
    intervalStop() {
      clearInterval(this.intreval)
    },
    handleError() {
      this.error = null
    },
    changePage(pageNumber) {
      this.page = pageNumber
      console.log(this.addPage)

      this.fetchHomePage5()
    },
    dataChange2(id) {
      if (this.datasMovie.length > 0) {
        this.clicked2 = true
        this.datasMovie.forEach((item) => {
          if (item.id === id) {
            // this.movies = id
            this.$router.push({
              path: `/movies/${id}`,
            })
          }
        })
      }
    },
    genreClick(genre) {
      this.isLoading = true
      this.selectedGenres = genre
      this.addPage = 1
      this.fetchHomePage5()
      this.genres.forEach((genrei) => {
        if (genrei.id == genre) {
          this.genrex = genre
        }
      })
      this.isLoading = false
      console.log(this.genre)
    },

    async fetchSearched(datas) {
      this.datasMovie = await datas
    },
    async allGenres() {
      try {
        const api_key = 'api_key=e10a98df5c335fc5102ecda2cf9b7dbf'
        const base_url = 'https://api.themoviedb.org/3'
        const api_url =
          base_url +
          `/genre/movie/list?&${api_key}&language=${this.$store.getters.lang}`
        const api = api_url + '&with_genres=' + this.selectedGenres
        const response = await axios.get(api).then((res) => {
          // this.genres = res.data.results
          this.genres = res.data.genres
          return res.data.genres
        })

        return response
      } catch (err) {
        this.error =
          err.message ||
          'failed to authendicate , try  later check  your login data'
      }
    },
    async fetchHomePage5() {
      try {
        const api_key = 'api_key=e10a98df5c335fc5102ecda2cf9b7dbf'
        const base_url = 'https://api.themoviedb.org/3'
        const pagination = this.page
        const api_url =
          base_url +
          `/discover/movie?sort_by=popularity.desc&${api_key}&page=${pagination}&language=${this.$store.getters.lang}`
        const api = api_url + '&with_genres=' + this.selectedGenres
        const response = await axios
          .get(api, {
            params: {
              _limit: this.limit,
              _page: this.page,
            },
          })
          .then((res) => {
            const data = res.data.results
            this.datasMovie = data
            this.totalPage2 = Math.ceil(res.data.total_pages / this.limit2)
            // console.log(api)
            return res.data.results
          })

        return response
      } catch (err) {
        this.error =
          err.message ||
          'failed to authendicate , try  later check  your login data'
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import '../sass/_colors.scss';
@import url('../../node_modules/@egjs/vue-flicking/dist/flicking.css');
// Or, if you have to support IE9
@import url('../../node_modules/@egjs/vue-flicking/dist/flicking-inline.css');
.wrapper__brands {
  visibility: hidden;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-family: 'Roboto';
  a {
    color: $grey;
    position: relative;
    text-decoration: none;
    &:hover,
    &.active2 {
      color: $blue;
      &::after {
        position: absolute;
        content: '';
        width: 35px;
        height: 4px;
        border-radius: 20px;
        background: $blue;
        top: 23px;
        right: 19px;
      }
    }
  }

  span {
    color: $grey;
    font-size: 24px;
    margin: 0 13px;
  }
}
.highlighted {
  color: $black2 !important;
  font-weight: bold !important;
}
.active3 {
  color: rgb(146, 146, 146) !important;
}
.page_wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.prev {
  color: green;
  border: none;
  background: transparent;
  font-size: 16px;
  margin-right: 10px;
  cursor: pointer;
  user-select: none;
  &:hover {
    color: $blue;
  }
}
.next {
  cursor: pointer;
  font-size: 16px;
  border: none;
  background: transparent;
  margin-left: 10px;
  user-select: none;
  color: green;
  &:hover {
    color: $blue;
  }
}
.page__num {
  background: red;
  margin: 0 5px;
  padding: 10px;
  border-radius: 30%;
  color: white;
  cursor: pointer;
  border: 1px solid white;
  background: $black;
  &:hover {
    background: black;
    border-radius: 20px;
    color: $blue;
    border: 1px solid $blue;
  }
}

.page__num2 {
  padding: 20px;
  background: black;
  color: white;
  cursor: pointer;
  font-size: 20px;
  margin: 0 5px;
  border: 1px solid $blue;
  color: $blue;
  border-radius: 20px;
}
.page__btn {
  padding: 10px;
  background: black;
  color: white;
  cursor: pointer;
  margin: 0 5px;
  border: 1px solid $blue;
  color: $blue;
  border-radius: 20px;
}
.movies__genres {
  display: flex;
  flex-wrap: wrap;
  list-style: none;

  margin-top: 20px;
  justify-content: center;
  li {
    color: white;
    font-weight: bold;
    cursor: pointer;
    padding: 10px;
    font-family: 'Roboto';
    font-weight: normal;
    background: $blue;
    margin: 5px 5px;
    border-radius: 10px;
    &:hover {
      color: $black2;
      font-weight: bold;
    }
  }
}
.vote {
  background: red !important;
}
.vote2 {
  background: green !important;
}
.container1 {
  width: 1050px;

  margin: 0 auto;
  .main__title {
    color: white;
    font-weight: normal;
    text-align: center;
    font-family: 'Roboto';
    font-size: 30px;
    margin-top: 30px;
  }
  .main__list {
    display: flex;
    list-style: none;
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 0;
    margin-top: 50px;
    //   justify-content: space-between;
    .wrapper__rate {
      position: absolute;
      color: white;
      background: black;
      margin-left: 165px;
      top: -18px;
      padding: 10px;
      border-radius: 20px;
    }
    .main__item {
      padding: 0;
      width: 20%;
      margin: 10px 0;
      height: auto !important;
      position: relative;

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
      .main__title2 {
        color: white;
        font-weight: normal;
        font-weight: bold;
        color: green;
        display: inline-block;
        font-family: 'Roboto';
        margin-left: 50px;
        margin-bottom: 0;
      }
      .main__text {
        width: 150px;
        text-align: center;
        margin-left: 20px;
        margin-top: 0;
        font-size: 15px;
        font-family: 'Roboto';
        font-weight: normal;
        color: white;
      }
    }
  }
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

@media only screen and (max-width: 1150px) {
  .container1 {
    width: 100% !important;
  }
  .main__item {
    width: 25% !important;
  }
}
@media only screen and (max-width: 992px) {
  .main__item {
    width: 33% !important;
  }
  .wrapper__rate {
    right: 0 !important;
  }
}
@media only screen and (max-width: 892px) {
  .wrapper__brands {
    visibility: visible !important;
  }
}
@media only screen and (max-width: 550px) {
  .main__item {
    width: 50% !important;
  }
}
</style>
