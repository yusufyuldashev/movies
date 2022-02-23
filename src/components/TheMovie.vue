<template>
  <section>
    <div class="container2" v-if="!all2">
      <ul
        class="main__list"
        @mouseover="intervalStop3"
        @mouseleave="intervalStart3"
        v-if="datas.length > 0"
      >
        <h2 class="searchTitle2">Searched Movies</h2>

        <Flicking
          ref="flicking3"
          class="carousel"
          :options="{
            align: 'prev',
            circular: true,
            duration: 400,
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
            @click="dataChange(film.id)"
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
    </div>
    <div
      class="wrapper__data"
      :style="{ backgroundImage: `url('${image2 + movies.backdrop_path}')` }"
    >
      <div class="big__wrapper">
        <div class="container">
          <div class="left__data">
            <img
              :src="image + movies.poster_path"
              alt="left"
              class="left__data__img"
            />
          </div>
          <div class="right__data">
            <h2 class="right__data__title">
              {{ movies.title || movies.name }}
              <span>({{ sliceTitle }})</span>
            </h2>
            <div class="right__data__wrapper">
              <p class="right__first">
                {{ changeAge }}
              </p>
              <p class="right__second">{{ genres }}</p>
              <p class="right__third"></p>
              <p class="right__four">{{ movies.original_language }}</p>
            </div>
            <div class="right__main__wrapper">
              <p class="right__main__first">
                {{ averageVote }}
                <span>%</span>
              </p>
              <p class="right__main__second">
                Пользовательский
                <br />
                счёт
              </p>
              <div class="right__main__fourth" @click="addToMarket">
                <svg
                  id="glyphicons-basic"
                  width="16px"
                  height="16px"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                >
                  <path
                    :class="{ green: market }"
                    fill="#ffffff"
                    id="thumbnails-list"
                    d="M11,14v4a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1V14a1,1,0,0,1,1-1h4A1,1,0,0,1,11,14Zm-1,7H6a1,1,0,0,0-1,1v4a1,1,0,0,0,1,1h4a1,1,0,0,0,1-1V22A1,1,0,0,0,10,21ZM10,5H6A1,1,0,0,0,5,6v4a1,1,0,0,0,1,1h4a1,1,0,0,0,1-1V6A1,1,0,0,0,10,5Zm17,6H14a1,1,0,0,0-1,1v1a1,1,0,0,0,1,1H27a1,1,0,0,0,1-1V12A1,1,0,0,0,27,11Zm0-6H14a1,1,0,0,0-1,1V7a1,1,0,0,0,1,1H27a1,1,0,0,0,1-1V6A1,1,0,0,0,27,5Zm0,18H14a1,1,0,0,0-1,1v1a1,1,0,0,0,1,1H27a1,1,0,0,0,1-1V24A1,1,0,0,0,27,23Zm0-6H14a1,1,0,0,0-1,1v1a1,1,0,0,0,1,1H27a1,1,0,0,0,1-1V18A1,1,0,0,0,27,17Z"
                  />
                </svg>
              </div>
              <div class="right__main__five" @click="addToCart(movies.id)">
                <svg
                  id="glyphicons-basic"
                  width="16px"
                  height="16px"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                >
                  <path
                    :class="{ red: id === movies.id }"
                    fill="#ffffff"
                    id="heart"
                    d="M27.78131,11.92578c0,4.82666-6.13562,8.68128-11.0376,14.0686a.99978.99978,0,0,1-1.48742,0c-4.902-5.38732-11.03748-9.24194-11.03748-14.0686,0-5.52954,7.53626-9.48682,11.57507-3.82544a.25855.25855,0,0,0,.42029.00562C20.47992,2.43628,27.78131,6.39453,27.78131,11.92578Z"
                  />
                </svg>
              </div>
              <div class="right__main__six" @click="addToChosen">
                <svg
                  id="glyphicons-basic"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  width="16px"
                  height="16px"
                >
                  <path
                    :class="{ black: chosen }"
                    fill="#ffffff"
                    id="bookmark"
                    d="M25,6V26.58582a1,1,0,0,1-1.70709.70715L16.5,20.5,9.70709,27.293A1,1,0,0,1,8,26.58582V6a2.00006,2.00006,0,0,1,2-2H23A2.00006,2.00006,0,0,1,25,6Z"
                  />
                </svg>
              </div>
              <div class="right__main__seven" @click="addToStar">
                <svg
                  id="glyphicons-basic"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                >
                  <path
                    :class="{ yellow: star }"
                    fill="#ffffff"
                    id="star"
                    d="M27.34766,14.17944l-6.39209,4.64307,2.43744,7.506a.65414.65414,0,0,1-.62238.85632.643.643,0,0,1-.38086-.12744l-6.38568-4.6383-6.38574,4.6383a.643.643,0,0,1-.38086.12744.65419.65419,0,0,1-.62238-.85632l2.43744-7.506L4.66046,14.17944A.65194.65194,0,0,1,5.04358,13h7.89978L15.384,5.48438a.652.652,0,0,1,1.24018,0L19.06476,13h7.89978A.652.652,0,0,1,27.34766,14.17944Z"
                  />
                </svg>
              </div>
              <div class="right__main__eight" @click="vidyoClicked">
                <img
                  src="../assets/playT.svg"
                  alt="play"
                  class="right__main__eight__image"
                />
                <p class="right__main__seven">Watch Now</p>
              </div>
            </div>
            <p class="right__data__second__title">In the beginning...</p>
            <p class="right__data__obzor">Overview</p>
            <p class="right__data__description">
              {{ movies.overview }}
            </p>
            <!-- <p class="right__data__name">Steven Knight</p>
        <p class="right__data__creater"></p> -->
          </div>
        </div>
      </div>
    </div>
    <div v-if="movies.title">
      <base-dialog
        :id="movies.id"
        v-if="open"
        @close="handleError"
      ></base-dialog>
    </div>
    <div v-if="!movies.title">
      <base-series
        :id="movies.id"
        v-if="open"
        @close="handleError"
      ></base-series>
    </div>
  </section>
</template>

<script>
import Flicking from '@egjs/vue3-flicking'

export default {
  props: ['datu', 'datas', 'click', 'all2'],
  components: {
    Flicking,
  },
  data() {
    return {
      movies: [],
      teen: false,
      basicClick: false,
      searched: false,
      open: false,
      heart: false,
      chosen: false,
      star: false,
      market: false,
      items: [],
      idx: false,
      id: 0,
      // idx: 0,
    }
  },
  created() {
    this.h(this.datu)
  },
  watch: {
    datu(newId) {
      this.h(newId)
    },

    // adult(){
    //  if(this.movies){
    //  return  this.teen = true
    //  }else{
    //    return  this.teen = false
    //  }
    // },
  },
  mounted() {
    this.intervalStart3()
  },

  computed: {
    genres() {
      if (this.movies.genre_ids) {
        return 'action , fantasy'
      } else {
        return 'nothing'
      }
    },
    sliceTitle() {
      return this.movies.release_date || this.movies.first_air_date
    },
    changeAge() {
      if (this.datas) {
        return '18+'
      } else {
        return '16+'
      }
    },
    averageVote() {
      return this.movies.vote_average * 10
    },
    moviesId() {
      return Number(this.datu)
    },
    image() {
      return 'https://image.tmdb.org/t/p/w500'
    },
    image2() {
      return 'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces'
    },
  },

  methods: {
    addToMarket() {
      this.market = !this.market
    },
    addToStar() {
      this.star = !this.star
    },
    addToCart(id) {
      //movies.indexOf(movies) === -1
      this.id = id
      this.$store.dispatch('storeMovies', this.movies)
      // if (this.idx === false) {
      //   this.$store.dispatch('removeMovies', this.movies)
      // }

      // console.log(this.datas.forEach((data) => data))
    },
    addToChosen() {
      this.chosen = !this.chosen
    },
    handleError() {
      this.open = false
    },
    hideModal() {
      this.open = false
    },
    vidyoClicked() {
      this.open = true
    },
    dataChange(id) {
      // this.data.forEach((item) => {
      //   if (item === id) {
      //     console.log('ok')
      //   }
      // })
      // console.log(this.data2[0])
      this.datas.forEach((item) => {
        this.clicked = true
        if (item.id === id) {
          this.movies = item
        }
      })
      // console.log(this.poster)
    },

    intervalStart3() {
      this.intreval3 = setInterval(() => {
        this.$refs.flicking3.next().catch(() => void 0)
      }, 3000)
    },
    intervalStop3() {
      clearInterval(this.intreval3)
    },

    async h(datu) {
      if (this.datas.length > 0) {
        await this.datas.forEach((data) => {
          if (data.id == datu) {
            this.movies = data
          }
        })
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
.red {
  fill: red;
}
.white {
  fill: white;
}
.green {
  fill: green;
}
.yellow {
  fill: yellow;
}
.black {
  fill: black;
}
.vidyoIframe {
  margin-top: 30px;
}
.main__list {
  display: flex;
  position: relative;
  list-style: none;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  //   justify-content: space-between;
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
.searchTitle2 {
  color: white;
  font-weight: normal;
  font-size: 24px;
  color: red;
}
.container2 {
  width: 1050px;
  margin: 0 auto;
}
.wrapper__data {
  margin-top: 30px;
  background-repeat: no-repeat;
  background-size: cover;
  align-items: center;
  height: 80vh;
  .big__wrapper {
    background-image: linear-gradient(
      to right,
      rgba(7.06%, 5.49%, 5.1%, 1) 150px,
      rgba(7.06%, 5.49%, 6.1%, 0.3) 100%
    );
    height: 80vh;
  }

  .container {
    width: 1050px;

    margin: 0 auto;
    padding-top: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  .left__data {
    width: 30%;
    img {
      width: 100%;
      height: 450px;
      border-radius: 20px;
      object-fit: cover;
    }
  }
  .right__data {
    width: 65%;
    display: flex;
    flex-direction: column;

    .right__data__title {
      color: white;
      font-size: 33px;
      margin-bottom: 0;

      span {
        color: rgb(185, 177, 177);
      }
    }
    .right__data__wrapper {
      display: flex;
      align-items: center;
      .right__first {
        border: 1px solid rgb(185, 177, 177);
        background-color: transparent;
        padding: 2px;
        color: rgb(185, 177, 177);
      }
      .right__second {
        color: white;
        margin-top: 10px;
        margin-left: 6px;
      }
      .right__third {
        width: 6px;
        height: 6px;
        border-radius: 10px;
        background: white;
        margin: 0 8px;
      }
      .right__four {
        color: white;
        margin-top: 12px;
      }
    }
    .right__main__wrapper {
      display: flex;
      margin-top: 0 !important;
      align-items: center;
      .right__main__fourth,
      .right__main__five,
      .right__main__six,
      .right__main__seven,
      .right__main__eight {
        svg {
          // border-radius: 50%;
          width: 30px !important;
          height: 50px;
          margin-left: 15px;
          cursor: pointer;
        }
        user-select: none;
      }
      .right__main__first {
        padding: 10px 5px 10px 10px;
        background-color: #081c22;
        border-radius: 50%;
        color: white;
        font-size: 22px;
        border: 1px solid #21d07a;
        span {
          font-size: 9px;
          position: relative;
          top: -12px;
          right: 6px;
        }
      }
      .right__main__second {
        color: white;
        font-weight: bold;
        margin-left: 6px;
      }

      .right__main__eight {
        display: flex;
        margin-left: 13px;
        cursor: pointer;
        align-items: center !important;

        img {
          background-color: transparent;
          padding: 0;
        }

        p {
          color: white;
          margin-left: 6px;
          margin-top: 15px;
          font-weight: bold;
          &:hover {
            color: $blue;
          }
        }
      }
    }
    .right__data__second__title {
      color: #a3a4a4;
      font-size: 19px;
      font-weight: bold;
      margin-top: 0;
    }
    .right__data__obzor {
      color: white;
      font-weight: bold;
      font-size: 19px;
      margin-top: 0;
    }
    .right__data__description {
      color: white;
      font-size: 17px;
      margin-top: 0;
      height: 70px;
      overflow: hidden;
      opacity: 0.9;
    }
    .right__data__name {
      color: white;
      font-weight: bold;
      margin-bottom: 0;
      margin-top: 0;
    }
    .right__data__creater {
      color: white;
      margin-top: 0;
    }
  }
}
</style>
