<template>
  <section>
    <div v-if="clicked">
      <router-view :datas="discover"></router-view>
    </div>
    <ul
      class="main__list main__list2"
      @mouseover="intervalStop3"
      @mouseleave="intervalStart3"
      v-if="!all && !clicked"
    >
      <h2 class="searchTitle">{{ title }}</h2>

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
          v-for="film in discover"
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
    </ul>
    <h2 v-if="all" class="searchTitle3">{{ title }}</h2>

    <ul
      v-if="all"
      class="main__list3"
      @mouseover="intervalStop3"
      @mouseleave="intervalStart3"
    >
      <li
        class="main__item3"
        v-for="film in discover"
        :key="film.id"
        :id="film.id"
        @click="dataChange2(film.id)"
      >
        <div class="wrapper__img3">
          <img :src="image + film.poster_path" />
        </div>
        <p
          class="wrapper__rate3"
          :class="{
            vote2: film.vote_average * 10 > 75,
            vote: film.vote_average * 10 < 60,
          }"
        >
          {{ film.vote_average * 10 }}
        </p>
        <p class="main__title3">{{ film.release_date }}</p>
        <p class="main__text3">{{ film.title }}</p>
      </li>
    </ul>
    <button
      @click="allMovies"
      v-if="!clicked"
      class="all__movies"
      type="button"
    >
      {{ showHide }}
    </button>
  </section>
</template>

<script>
import Flicking from '@egjs/vue3-flicking'
export default {
  components: {
    Flicking,
  },
  data() {
    return {
      all: false,
      clicked: false,
    }
  },
  props: ['discover', 'title'],
  computed: {
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
  },
  mounted() {
    this.intervalStart3()
  },
  methods: {
    dataChange2(id) {
      if (this.discover.length > 0) {
        this.discover.forEach((item) => {
          if (item.id === id) {
            // this.movies = id
            this.clicked = true
            console.log(id)
            this.$router.push({
              path: `/discaver/${id}`,
              params: { savePosition: true },
            })
          }
        })
      }
    },
    allMovies() {
      this.all = !this.all
      this.$emit('change', this.all)
    },
    intervalStart3() {
      this.intreval3 = setInterval(() => {
        this.$refs.flicking3.next().catch(() => void 0)
      }, 3000)
    },
    intervalStop3() {
      clearInterval(this.intreval3)
    },
  },
}
</script>

<style lang="scss" scoped>
@import url('../../../node_modules/@egjs/vue-flicking/dist/flicking.css');
// Or, if you have to support IE9
@import url('../../../node_modules/@egjs/vue-flicking/dist/flicking-inline.css');
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
.vote {
  background: red !important;
}
.vote2 {
  background: green !important;
}
.searchTitle {
  color: white;
  font-weight: normal;
  font-size: 24px;
}
.searchTitle3 {
  color: white;
  font-weight: normal;
  font-size: 24px;
  font-family: 'Roboto';
}
.main__list {
  display: flex;
  position: relative !important;
  font-family: 'Roboto';

  list-style: none;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  //   justify-content: space-between;
  margin-bottom: 40px;
  .wrapper__rate {
    position: absolute !important;
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
.main__list3 {
  display: flex;
  font-family: 'Roboto';

  list-style: none;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 0;

  //   justify-content: space-between;
  margin-bottom: 40px;
  .wrapper__rate3 {
    color: white;
    background: black;
    right: 30px;
    position: absolute;
    padding: 10px;
    top: 0;
    display: inline-block;
    border-radius: 20px;
  }
  .main__item3 {
    padding: 0;
    width: 20%;
    height: auto !important;
    position: relative;

    cursor: pointer;
    .wrapper__img3 {
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
    .main__title3 {
      color: white;
      font-weight: normal;
      font-weight: bold;
      color: green;
      display: inline-block;
      margin-left: 50px;
      margin-bottom: 0;
    }
    .main__text3 {
      width: 150px;
      text-align: center;
      margin-left: 20px;
      margin-top: 0;
      font-size: 15px;

      color: white;
    }
  }
}
</style>
