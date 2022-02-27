<template>
  <main>
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
    <div v-if="clicked2">
      <router-view :datas="datas" :click="clicked2" :all2="all2"></router-view>
    </div>

    <div class="container1" v-if="!isLoading">
      <header>
        <ul
          class="main__list"
          @mouseover="intervalStop3"
          @mouseleave="intervalStart3"
          v-if="datas.length > 0"
        >
          <h2 class="searchTitle" v-if="'en' === this.$store.getters.lang">
            Searched Movies
          </h2>
          <h2 class="searchTitle" v-if="'ru' === this.$store.getters.lang">
            Искомые фильмы
          </h2>

          <Flicking
            ref="flicking3"
            class="carousel"
            :options="{
              align: 'prev',
              circular: true,
              easing: function (x) {
                return x
              },
            }"
          >
            <li
              class="main__item"
              v-for="film in datas"
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
          </Flicking>
          <!-- <li class="main__item">
            <img src="../assets/second.png" alt="second" class="main__img" />
            <p class="main__title">Shazam</p>
          </li>
          <li class="main__item">
            <img src="../assets/third.png" alt="third" class="main__img" />
            <p class="main__title">Shazam</p>
          </li>
          <li class="main__item">
            <img src="../assets/four.png" alt="four" class="main__img" />
            <p class="main__title">Shazam</p>
          </li>
          <li class="main__item">
            <img src="../assets/five.png" alt="five" class="main__img" />
            <p class="main__title">Shazam</p>
          </li> -->
        </ul>
        <h3>Premiere</h3>
        <div class="header__wrapper">
          <div class="header__data">
            <img class="header__img" :src="image + posterMain" alt="back" />
            <div class="header__over">
              <div class="header__over__list">
                <h2 class="header__over__title">{{ titleMain }}</h2>
                <div class="wrapper__over">
                  <p class="header1">{{ typeMain }}</p>
                  <p class="header2">{{ yearMain }}</p>
                  <!-- <p class="header3">1h 55m</p> -->
                  <div class="header__over__rate">
                    <p class="header__dots">...</p>
                    <div class="header__over__wrapper">
                      <p>{{ rateMain }}</p>
                      <img src="../assets/star.png" alt="star" />
                    </div>
                  </div>
                </div>
                <!-- <p class="header4">Director:</p>
                <p class="header5">miguel sapochnik</p> -->
              </div>
              <hr class="header__line" />
              <h5 class="header__desc">Description</h5>
              <p class="header__parg">
                {{ descriptionMain }}
              </p>
            </div>
          </div>
          <div
            class="header__carousel"
            @mouseover="intervalStop2"
            @mouseleave="intervalStart2"
          >
            <Flicking
              ref="flicking2"
              class="carousel"
              :options="{
                align: 'prev',
                circular: true,
                panelsPerView: 1,
                duration: 300,
                easing: function (x) {
                  return x
                },
              }"
            >
              <div v-for="film in data2" :key="film.id" class="wrapper__data">
                <img
                  class="header__carousel__img"
                  :src="image + film.poster_path"
                  alt="rectangle"
                />
                <div class="wrapper__overview">
                  <ul class="wrapper__center">
                    <li class="wrapper__center__name">Name:</li>
                    <li>{{ film.title }}</li>
                  </ul>
                  <ul class="wrapper__center">
                    <li class="wrapper__left__title">Year:</li>
                    <li>{{ film.release_date }}</li>
                  </ul>
                  <ul class="wrapper__center">
                    <li class="wrapper__left__title">Language:</li>
                    <li>{{ film.original_language }}</li>
                  </ul>
                  <ul class="wrapper__center">
                    <li class="wrapper__left__title">Rate:</li>
                    <li>{{ film.vote_average }}</li>
                  </ul>
                  <ul class="wrapper__center2">
                    <li class="wrapper__center__title2">Description:</li>
                    <li class="wrapper__center__text">{{ film.overview }}</li>
                  </ul>
                </div>
              </div>
            </Flicking>
          </div>
        </div>
      </header>

      <main>
        <div class="main__wrapper__title">
          <h3 class="recomend">Recommended movies</h3>
          <div class="main__icons">
            <button type="button" class="main__icon1__button">
              <img
                class="main__icon1"
                src="../assets/left.png"
                alt="left"
                @click="gotoPrev"
              />
            </button>
            <button type="button" class="main__icon2__button" @click="gotoNext">
              <img class="main__icon2" src="../assets/right.png" alt="right" />
            </button>
          </div>
        </div>
        <ul
          class="main__list"
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
              class="main__item"
              v-for="film in data"
              :key="film.id"
              :id="film.id"
              :class="{ activate: top }"
              @click="dataChange(film.id)"
            >
              <div class="wrapper__img">
                <img :src="image + film.poster_path" />
              </div>
              <p class="main__title">{{ film.release_date }}</p>
              <p class="main__text">{{ film.title }}</p>
            </li>
          </Flicking>
          <!-- <li class="main__item">
            <img src="../assets/second.png" alt="second" class="main__img" />
            <p class="main__title">Shazam</p>
          </li>
          <li class="main__item">
            <img src="../assets/third.png" alt="third" class="main__img" />
            <p class="main__title">Shazam</p>
          </li>
          <li class="main__item">
            <img src="../assets/four.png" alt="four" class="main__img" />
            <p class="main__title">Shazam</p>
          </li>
          <li class="main__item">
            <img src="../assets/five.png" alt="five" class="main__img" />
            <p class="main__title">Shazam</p>
          </li> -->
        </ul>
        <button @click="allMovies" class="all__movies" type="button">
          {{ showHide }}
        </button>
        <ul class="main__list" v-if="all">
          <li
            class="main__item"
            v-for="film in data"
            :key="film.id"
            :id="film.id"
            @click="dataChange(film.id)"
          >
            <div class="wrapper__img">
              <img :src="image + film.poster_path" />
            </div>
            <p class="main__title">{{ film.release_date }}</p>
            <p class="main__text">{{ film.title }}</p>
          </li>
          <!-- <li class="main__item">
            <img src="../assets/second.png" alt="second" class="main__img" />
            <p class="main__title">Shazam</p>
          </li>
          <li class="main__item">
            <img src="../assets/third.png" alt="third" class="main__img" />
            <p class="main__title">Shazam</p>
          </li>
          <li class="main__item">
            <img src="../assets/four.png" alt="four" class="main__img" />
            <p class="main__title">Shazam</p>
          </li>
          <li class="main__item">
            <img src="../assets/five.png" alt="five" class="main__img" />
            <p class="main__title">Shazam</p>
          </li> -->
        </ul>
      </main>
      <div class="page_wrapper" v-if="addPage <= 10">
        <button
          type="button"
          :disabled="isCompolete"
          class="prev"
          :class="{ active3: isCompolete }"
          @click="changePage(addPage--)"
        >
          Prev
        </button>
        <div
          class="page__num"
          :class="{ page__btn: page === pageNum }"
          v-for="pageNum in totalPage"
          :key="pageNum.id"
          @click="changePage(pageNum)"
        >
          {{ pageNum }}
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
        <div class="next" @click="changePage(addPage++)">Next</div>
      </div>

      <div class="page_wrapper" v-if="addPage > 10">
        <div class="prev" @click="changePage(addPage--)">Prev</div>
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
        <div class="next" @click="changePage(addPage++)">Next</div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import Flicking from '@egjs/vue3-flicking'

export default {
  props: ['search', 'datas', 'all2'],

  components: {
    Flicking,
  },
  data() {
    return {
      page: 1,
      limit: 3500,
      limit2: 33000,
      data: [],
      data2: [],
      // data3: [],
      intreval: {},
      intreval2: {},
      intreval3: {},
      clicked: false,
      clicked2: false,
      movies: '',
      title: '',
      title2: '',
      year: '',
      year2: '',
      type: '',
      type2: '',
      rate: '',
      rate2: '',
      poster: null,
      poster2: null,
      description: '',
      description2: '',
      isLoading: false,
      all: false,
      totalPage: 0,
      hideNumber: false,
      addPage: 10,
      add: false,
      top: false,
      error: null,
      // movies: this.$store.getters.searchValue2,

      // searchValue: this.Movies,
    }
  },
  async mounted() {
    this.isLoading = true
    await this.data3
    await this.fetchHomePage()
    await this.fetchHomePage2()
    if (this.clicked2) {
      this.intervalStart()

      this.intervalStart2()
    }

    if (this.datas.length > 0) {
      this.intervalStart3()
    }

    this.isLoading = false
  },
  computed: {
    searchValue() {
      return this.$store.getters.searchValue2
    },
    isCompolete() {
      return this.addPage <= 10
    },
    showHide() {
      if (!this.all) {
        return 'All Movies'
      } else {
        return 'Hide Movies'
      }
    },
    image() {
      return 'https://image.tmdb.org/t/p/w500'
    },

    posterMain() {
      if (!this.clicked) {
        return this.poster2
      } else {
        return this.poster
      }
    },
    titleMain() {
      if (!this.clicked) {
        return this.title2
      } else {
        return this.title
      }
    },
    yearMain() {
      if (!this.clicked) {
        return this.year2
      } else {
        return this.year
      }
    },
    typeMain() {
      if (!this.clicked) {
        return this.type2
      } else {
        return this.type
      }
    },
    descriptionMain() {
      if (!this.clicked) {
        return this.description2
      } else {
        return this.description
      }
    },
    rateMain() {
      if (!this.clicked) {
        return this.rate2
      } else {
        return this.rate
      }
    },
  },

  methods: {
    handleError() {
      this.error = null
    },
    changePage(pageNumber) {
      this.page = pageNumber
      this.fetchHomePage()
    },
    allMovies() {
      this.all = !this.all
      this.$emit('change', this.all)
    },
    dataChange2(id) {
      if (this.datas.length > 0) {
        this.clicked2 = true
        this.datas.forEach((item) => {
          if (item.id === id) {
            // this.movies = id
            this.$router.push({
              path: `/home/${id}`,
            })
          }
        })
      }
    },

    dataChange(id) {
      // this.data.forEach((item) => {
      //   if (item === id) {
      //     console.log('ok')
      //   }
      // })
      // console.log(this.data2[0])
      this.top = true
      this.data.forEach((item) => {
        this.clicked = true
        if (item.id === id) {
          this.title = item.title
          this.year = item.release_date
          this.type = item.original_language
          this.poster = item.poster_path
          this.description = item.overview
          this.rate = item.vote_average
        }
      })
      this.scrollToTop()

      // console.log(this.poster)
    },
    async gotoNext() {
      await this.$refs.flicking.next().catch(() => void 0)
      await this.$refs.flicking.next().catch(() => void 0)
      await this.$refs.flicking.next().catch(() => void 0)
    },
    async gotoPrev() {
      await this.$refs.flicking.prev().catch(() => void 0)
      await this.$refs.flicking.prev().catch(() => void 0)
      await this.$refs.flicking.prev().catch(() => void 0)
    },
    intervalStart() {
      this.intreval = setInterval(() => {
        this.$refs.flicking.next().catch(() => void 0)
      }, 3000)
    },
    intervalStop() {
      clearInterval(this.intreval)
    },
    intervalStart3() {
      this.intreval3 = setInterval(() => {
        this.$refs.flicking3.next().catch(() => void 0)
      }, 3000)
    },
    intervalStop3() {
      clearInterval(this.intreval3)
    },

    async fetchHomePage() {
      // let moviePage = 1
      // let searchValue = 'marvel'
      // const KEY = 'ec6105fc'
      // const res = await axios
      //   .post(
      //     `https://www.omdbapi.com/?apikey=${KEY}&s=${searchValue}&page=${moviePage}`,
      //   )
      //   .then((res) => {
      //     this.data = res.data.Search
      //     console.log(res.data.Search)
      //     return res.data.Search
      //   })
      //   .catch((err) => console.error(err))
      // return res
      try {
        const api_key = 'api_key=e10a98df5c335fc5102ecda2cf9b7dbf'
        const base_url = 'https://api.themoviedb.org/3'
        const pagination = this.page
        const api_url =
          base_url +
          `/discover/movie?sort_by=popularity.desc&${api_key}&page=${pagination}&language=${this.$store.getters.lang}`
        const response = await axios
          .get(api_url, {
            params: {
              _limit: this.limit,
              _page: this.page,
            },
          })
          .then((res) => {
            this.totalPage = Math.ceil(res.data.total_pages / this.limit)
            this.totalPage2 = Math.ceil(res.data.total_pages / this.limit2)
            this.data = res.data.results
            // console.log(res.data.results[0].genre_ids[0].name)
            return res.data.results
          })

        return response
      } catch (err) {
        this.error =
          err.message ||
          'failed to authendicate , try  later check  your login data'
      }
    },
    scrollToTop() {
      window.scrollTo(0, 0)
    },
    scrollToBottom() {
      window.scrollTo(0, document.body.scrollHeight)
    },
    async fetchHomePage2() {
      const api_key = `e10a98df5c335fc5102ecda2cf9b7dbf`
      const base_url = 'https://api.themoviedb.org/3'
      const api_url =
        base_url +
        `/discover/movie?api_key=${api_key}&page=3&language=${this.$store.getters.lang}`
      const response = await axios
        .get(api_url)
        .then((res) => {
          this.data2 = res.data.results
          this.poster2 = res.data.results[5].poster_path
          this.title2 = res.data.results[5].title
          this.type2 = res.data.results[5].original_language
          this.year2 = res.data.results[5].release_date
          this.rate2 = res.data.results[5].vote_average
          this.description2 = res.data.results[5].overview
          return res.data.results
        })
        .catch((err) => console.error(err))
      return response
    },
    intervalStart2() {
      this.intreval2 = setInterval(() => {
        this.$refs.flicking2.prev().catch(() => void 0)
      }, 3000)
    },
    intervalStop2() {
      clearInterval(this.intreval2)
    },
  },
  // mounted() {
  // console.log(this.films)
  // this.$store.dispatch('getMovies')
  // fetch(
  //   'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1',
  //   {
  //     headers: {
  //       'Content-Type': 'aplication/json',
  //       'X-API-KEY': '2fac3c72-723b-4b06-a4c7-2ffd54d21243',
  //     },
  //   },
  // )
  //   .then((response) => response.json())
  //   .then((data) => console.log(data))
  // },
}
</script>

<style scoped lang="scss">
@import '../sass/_colors.scss';

@import url('../../node_modules/@egjs/vue-flicking/dist/flicking.css');
// Or, if you have to support IE9
@import url('../../node_modules/@egjs/vue-flicking/dist/flicking-inline.css');
.vote {
  background: red !important;
}
.vote2 {
  background: green !important;
}
.activate {
  top: 0;
}
.bottom__arrow {
  position: fixed;
  background: $grey;
  border: none;

  cursor: pointer;
  right: 25px;
  bottom: 20px;
  padding: 4px;
  border-radius: 10px;
}
.searchTitle {
  color: white;
  font-weight: normal;
  font-size: 24px;
}
.main__wrapper__title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  h3 {
    font-size: 24px;
    font-weight: normal;
    color: white;
  }
  .main__icons {
    display: flex;
    align-items: center;
    button {
      border: none;
      cursor: pointer;

      background-color: transparent;
    }
  }
}

.main__list {
  display: flex;
  position: relative;
  font-family: 'Roboto';

  list-style: none;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  //   justify-content: space-between;
  margin-bottom: 40px;
  .wrapper__rate {
    position: absolute;
    color: white;
    background: black;
    margin-left: 145px;
    top: -10px;
    padding: 10px;
    border-radius: 20px;
  }
  .main__item {
    padding: 0;
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
.page_wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.active3 {
  color: white !important;
}
.prev {
  color: black;
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
  margin-left: 10px;
  user-select: none;
  color: black;
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
  padding: 10px;
  background: black;
  color: white;
  cursor: pointer;
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
main {
  margin-top: 10px;
  font-family: 'Roboto';
  font-weight: normal;
}
.container1 {
  width: 1050px;
  margin: 0 auto;
}
.header__wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .header__data {
    width: 65%;
    position: relative;
    .header__img {
      width: 95%;
      border-radius: 25px;
      object-fit: cover;
      aspect-ratio: 4/3;
    }
    .header__over {
      position: absolute;
      width: 95%;
      //   border: 1px solid green;
      top: 340px;
      background: rgba(45, 45, 66, 0.5);
      backdrop-filter: blur(9px);
      border-radius: 25px;
      .header__over__list {
        display: flex;
        padding-left: 15px;
        align-items: center !important;
        justify-content: space-between;
        .wrapper__over {
          display: flex;
          align-items: center;
        }
        .header1 {
          margin-top: 10px;
        }
        .header2 {
          margin: 0 30px 5px 30px;
        }
        .header__over__rate {
          .header__dots {
            margin: -4px 0 0 32px;
            position: absolute;
          }
          .header__over__wrapper {
            display: flex;
            align-items: center;
            position: relative;
            margin-right: 10px;
            p {
              margin-right: 10px;
              margin-top: 10px;
            }
          }
        }
        .header__over__title {
          font-size: 24px;
          color: white;
          font-weight: normal;
          overflow: hidden;
          height: 30px;
        }
        p {
          color: white;
          font-size: 13px;
          font-weight: normal;
        }
      }
      .header__line {
        border: 1px solid black;
        margin-top: -12px;
        z-index: 11;
        margin-bottom: -20px;
      }
      .header__desc {
        padding-left: 15px;
        font-style: normal;
        font-weight: normal;
        font-size: 13px;
        font-size: 13px;
        margin-top: 30px;
        color: white;
      }
      .header__parg {
        font-style: normal;
        padding-left: 15px;
        margin: 0;
        font-weight: normal;
        color: #ffffff;
        opacity: 0.7;
        padding-right: 15px;
        font-size: 13px;
        height: 60px;
        overflow: hidden;
      }
    }
  }
  .header__carousel {
    width: 35%;
    height: auto;
    .wrapper__data {
      position: relative;
      overflow: hidden;

      .wrapper__overview {
        position: absolute;
        left: 0;
        right: 0;
        cursor: pointer;
        bottom: 0;
        visibility: hidden;
        width: 100%;
        border-radius: 25px;
        display: flex;
        flex-direction: column;
        .wrapper__center {
          display: flex;
          list-style: none;
          align-items: center;
          li {
            color: rgb(11, 214, 214);
          }
          .wrapper__center__name {
            color: white;
            font-size: 20px;
            width: 95px;
          }
          .wrapper__left__title {
            color: white;
            width: 95px;
          }
        }
        .wrapper__center2 {
          display: flex;
          list-style: none;
          align-items: flex-start;
          .wrapper__center__title2 {
            margin-right: 7px;
            color: white;
          }
          .wrapper__center__text {
            color: rgb(11, 214, 214);
            overflow: hidden;
            height: 250px;
          }
        }
      }
      .header__carousel__img {
        width: 100%;
        border-radius: 25px;
        object-fit: cover;
        height: 100%;
        z-index: 1111;
        aspect-ratio: 4/5.29;
      }
      &:hover .wrapper__overview {
        visibility: visible;
        background: rgba(45, 45, 66, 0.5);
        backdrop-filter: blur(4px);
        height: 100%;
      }
    }
  }
}
header > h3 {
  font-size: 24px;
  color: white;
  font-weight: normal;
}
@media only screen and (max-width: 1150px) {
  .container1 {
    width: 95% !important;
  }
  .header__over {
    top: 0 !important;
  }
  .main__item {
    width: 25% !important;
  }
}
@media only screen and (max-width: 692px) {
  .main__item {
    width: 35% !important;
  }
}
@media only screen and (max-width: 592px) {
  .main__item {
    width: 50% !important;
  }
  .main__title {
    display: flex !important;
    margin-left: 0 !important;
    justify-content: center !important;
  }
  .main__text {
    display: flex !important;
    margin: 0 auto !important;
    justify-content: center !important;
  }
  .page__num {
    padding: 3px;
  }
}
@media only screen and (max-width: 492px) {
  .header__wrapper {
    display: flex;
    flex-direction: column;
    width: 100% !important;
    .header__data {
      width: 97% !important;
      margin-left: 15px;
    }
  }
  .header__carousel {
    width: 90% !important;
    margin: 20px 0;
  }
  .main__item {
    width: 90% !important;
  }
  .page__num {
    margin: 0 1px;
  }
}
</style>
