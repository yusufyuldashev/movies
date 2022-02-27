<template>
  <div class="wrapper__container" :class="{ black: nightMode }">
    <aside>
      <the-aside @theme="changeTheme"></the-aside>
    </aside>

    <div class="line" :class="{ active: all }">
      <img class="line__img" src="../assets/Line1.png" alt="line" />
    </div>
    <nav>
      <div v-if="isLoggedIn">
        <select class="languages" v-model="languages" @click="lan">
          <option value="en">En</option>
          <option value="ru">Ru</option>
        </select>
        <button @click="MovieLanguages" class="langMovies" v-if="lang">
          Save
        </button>
      </div>
      <div
        class="container fixing__part"
        :class="{ 'scrolled-nav': scrolledNav }"
      >
        <div class="wrapper__brands" v-if="isLoggedIn">
          <router-link to="/movies" v-if="'en' === this.$store.getters.lang">
            movies &nbsp;
          </router-link>
          <router-link to="/movies" v-if="'ru' === this.$store.getters.lang">
            фильмы &nbsp;
          </router-link>
          <span>|</span>
          <router-link to="/series" v-if="'en' === this.$store.getters.lang">
            TV series
          </router-link>
          <router-link to="/series" v-if="'ru' === this.$store.getters.lang">
            ТВ сериалы
          </router-link>
        </div>
        <div class="wrapper__brands" v-if="!isLoggedIn">
          <router-link to="/login">movies &nbsp;</router-link>
          <span>|</span>
          <router-link to="/login">TV series</router-link>
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

          <button type="button" class="man__button" @click="auth">
            <img src="../assets/man.png" alt="man" class="img__man" />
          </button>
        </div>
        <transition name="nav__transition">
          <ul v-show="login" class="nav__toggle">
            <button class="nav__cancel" type="button" @click="auth">X</button>
            <li class="nav__getter">
              It is your User Id:{{ this.$store.getters.name }}
            </li>
            <li class="nav__item" v-if="!isLoggedIn">
              <router-link to="/signup">Sign Up</router-link>
            </li>

            <li class="nav__item" v-if="!isLoggedIn">
              <router-link to="/login">Sign In</router-link>
            </li>
            <li class="nav__item" v-if="isLoggedIn" @click="logOut">
              <router-link to="/logout">Log Out</router-link>
            </li>
          </ul>
        </transition>
      </div>
      <!-- <the-main></the-main> -->
      <router-view
        @change="takeValue"
        :datas="data3"
        :all2="all2"
      ></router-view>
    </nav>
    <button type="button" class="bottom__arrow" @click="scrollToBottom">
      <img src="../assets/bottom.png" alt="bottom" />
    </button>
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
      scrollPosition: null,
      scrolledNav: null,
      login: false,
      languages: 'en',
      lang: false,
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
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthendicated
    },
    ...mapGetters(['searchValue']),
    Fullname() {
      return this.$store.getters.name
    },
  },

  mounted() {
    window.addEventListener('scroll', this.updateScroll)
    if (localStorage.languages) {
      this.languages = localStorage.languages
    }
    this.$store.dispatch('tryLanguage', this.languages)
  },

  methods: {
    changeTheme(value) {
      this.nightMode = value
      this.$emit('theme', this.nightMode)
    },
    lan() {
      this.lang = true
    },
    logOut() {
      if (this.$store.dispatch('logout')) {
        this.$router.replace('/login')
      }
    },
    MovieLanguages() {
      localStorage.languages = this.languages
      this.lang = false
      this.$router.go()
    },

    updateScroll() {
      const scrollPosition = window.scrollY
      if (scrollPosition > 70) {
        this.scrolledNav = true
        return
      }
      this.scrolledNav = false
    },
    auth() {
      this.login = !this.login
    },
    takeValue(value) {
      this.all = value
    },
    scrollToBottom() {
      window.scrollTo(0, document.body.scrollHeight)
    },
    async searchData(value) {
      const api_key = `e10a98df5c335fc5102ecda2cf9b7dbf`
      const base_url = 'https://api.themoviedb.org/3'
      // const movies = this.movies
      const api_url =
        base_url +
        `/search/movie?api_key=${api_key}&query=${value}&language=${this.languages}`
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
.black {
  background: black;
}
.langMovies {
  border: none;
  position: absolute;
  right: 80px;
  top: 10px;
  color: white;

  background: red;
  padding: 3px 5px 3px 5px;
  border-radius: 20px;
}
.languages {
  background: transparent;
  margin-right: 10px;
  margin-top: 20px;
  margin-left: 0;
  position: absolute;
  right: 15px;

  top: 0;
  color: white;
  outline: none;
  option {
    background: black;
  }
}
.nav__cancel {
  position: absolute;
  background: #2496ff;
  border: none;
  color: white;
  padding: 15px;
  font-size: 20px;
  right: 0;
  top: 0;
  border-bottom-left-radius: 20px;
  &:hover {
    background-color: black;
  }
}
.nav__getter {
  text-align: center;
  width: 105px !important;
  overflow: hidden;
  font-weight: bold;
  color: black !important;
}
.nav__toggle {
  display: flex;
  flex-direction: column;
  position: fixed;
  align-items: center;
  justify-content: center;
  width: 158px;
  height: 100%;
  background-color: grey;
  top: 0;
  left: 0;
  li {
    font-family: 'Roboto';
    color: white;
    font-size: 24px;
    margin: 45px 0;
    cursor: pointer;
    a {
      color: white;
      text-decoration: none;
      &:hover {
        color: #2496ff;
        font-weight: bold;
      }
    }
  }
}
.nav__transition-enter-active,
.nav__transition-leave-active {
  transition: all 0.6s linear;
}
.nav__transition-enter-from,
.nav__transition-leave-to {
  transform: translateX(-250px);
}
.nav__transition-enter-to {
  transform: translateX(0);
}
@keyframes onTop {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
}

.fixing__part {
  background-color: $black;
  padding-bottom: 10px;
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
  background: transparent;
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
      background: transparent;
    }
    button {
      border: none;
      background-color: $black;
      cursor: pointer;
    }
    .icon__button {
      background: transparent;
    }
    .man__button {
      margin-top: 20px;
      background: transparent;
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
