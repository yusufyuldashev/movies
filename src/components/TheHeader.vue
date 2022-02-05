<template>
  <div class="wrapper__container">
    <aside>
      <the-aside></the-aside>
    </aside>

    <div class="line" :class="{ active: all }">
      <img class="line__img" src="../assets/Line1.png" alt="line" />
    </div>
    <nav>
      <div class="container">
        <div class="wrapper__brands">
          <router-link to="/movies">movies &nbsp;</router-link>
          <span>|</span>
          <router-link to="/tvseries">TV series</router-link>
        </div>
        <form class="wrapper__form" @submit.prevent="searchData(newMovies)">
          <label for="input" class="wrapper__center">
            <button type="submit" class="img__center__button">
              <img
                class="img__center"
                src="../assets/search.png"
                alt="search"
              />
            </button>
            <input
              type="search"
              id="input"
              placeholder="Search"
              class="input__center"
              autocomplete="off"
              v-model.trim="newMovies"
            />
          </label>
        </form>
        <div class="wrapper__icons">
          <div class="wrapper__icon">
            <p class="wrapper__dots">...</p>
            <button type="button" class="icon__button">
              <img class="icon" src="../assets/mail.png" alt="mail" />
            </button>
          </div>
          <div class="wrapper__icon wrapper__icon__center">
            <p class="wrapper__dots">...</p>
            <button type="button" class="icon__button">
              <img class="icon" src="../assets/bell-plus.png" alt="mail" />
            </button>
          </div>
          <button type="button" class="man__button">
            <img src="../assets/man.png" alt="man" class="img__man" />
          </button>
        </div>
      </div>
      <!-- <the-main></the-main> -->
      <router-view
        @change="takeValue"
        :datas="data3"
        :all2="all2"
      ></router-view>
    </nav>
  </div>
</template>

<script>
import TheAside from '../components/TheAside.vue'
// import TheMain from './TheMain.vue'
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  components: { TheAside },

  data() {
    return {
      all: false,
      all2: false,
      all3: false,
      newMovies: '',
      movies: '',
      data3: [],
    }
  },

  computed: {
    ...mapGetters(['searchValue']),
  },

  methods: {
    takeValue(value) {
      this.all = value
    },
    async searchData(value) {
      const api_key = `e10a98df5c335fc5102ecda2cf9b7dbf`
      const base_url = 'https://api.themoviedb.org/3'
      // const movies = this.movies
      const api_url =
        base_url + `/search/movie?api_key=${api_key}&query=${value}`
      const response = await axios
        .get(api_url)
        .then((res) => {
          this.data3 = res.data.results
          return res.data.results
        })
        .catch((err) => console.error(err))
      this.all2 = false
      this.all3 = true
      // this.$router.go('/main')
      return response
    },
  },
}
</script>

<style scoped lang="scss">
@import '../sass/_colors.scss';
.line {
  height: 220vh;
  margin-left: 130px;
  .line__img {
    height: 100%;
  }
}
.active {
  margin-left: 130px;
  .line__img {
    height: 100%;
  }
}
aside {
  width: 11.7%;
  top: 0;
  border-right: 1px solid $blue;
  position: fixed;
  left: 0;
  bottom: 0;
  height: 100%;
  padding-left: 30px;
}
nav {
  width: 90%;
  padding-top: 30px;
}
nav .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .wrapper__brands {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-family: 'Roboto';
    a {
      color: $grey;
      position: relative;
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

  .wrapper__form {
    width: 50%;

    .wrapper__center {
      display: flex;
      width: 100%;
      align-items: center;
      background-color: $black2;
      box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
      border-radius: 13px;
      padding: 12px 11px;
      cursor: pointer;
      margin-left: 50px;
      .img__center__button {
        border: none;
        background-color: $black2;
        margin-top: 1px;
        cursor: pointer;
      }

      .input__center {
        background-color: $black2;
        color: #d3d3da;
        font-size: 13px;
        margin-left: 8px;
        width: 100%;
        border: none;
        outline: none;
      }
    }
  }

  .wrapper__icons {
    display: flex;
    align-items: center;
    .wrapper__icon__center {
      margin: 0 25px;
    }
    button {
      border: none;
      background-color: $black;
      cursor: pointer;
    }
    .man__button {
      margin-top: 20px;
    }
    .wrapper__icon {
      p {
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

ul,
ol {
  list-style: none;
}
a {
  display: block;
  text-decoration: none;
}
img {
  max-width: 100%;
}
.wrapper__container {
  width: 96%;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  align-items: flex-start;
}
.container {
  width: 1050px;
  margin: 0 auto;
  //   border: 1px solid red;
}
</style>
