<template>
  <ul class="aside__list">
    <li class="aside__top__item">
      <div class="toggle__theme">
        <div v-if="nightMode" @click="toggleTheme">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="yellow"
            class="bi bi-sun"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"
            />
          </svg>
        </div>
        <div v-if="!nightMode" @click="toggleTheme">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="grey"
            class="bi bi-moon"
            viewBox="0 0 16 16"
          >
            <path
              d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"
            />
          </svg>
        </div>
      </div>
      <div class="aside__home">
        <router-link to="/home">
          <p>...</p>
          <div class="aside__top__wrapper">
            <img src="../assets/home.png" alt="home" class="aside__top__img" />
            <h4 class="aside__top__title">
              <router-link to="/home" v-if="isLoggedIn">{{ home }}</router-link>
              <router-link to="/login" v-if="!isLoggedIn">Home</router-link>
            </h4>
          </div>
        </router-link>
      </div>
      <p class="aside__top__link">
        <router-link to="/popular" v-if="isLoggedIn">{{ popular }}</router-link>
        <router-link to="/login" v-if="!isLoggedIn">Popular</router-link>
      </p>
      <p class="aside__top__link">
        <router-link to="/discaver" v-if="isLoggedIn">
          {{ discaver }}
        </router-link>
        <router-link to="/login" v-if="!isLoggedIn">Discover</router-link>
      </p>
      <p class="aside__top__link">
        <router-link to="/categories" v-if="isLoggedIn">
          {{ categories }}
        </router-link>
        <router-link to="/login" v-if="!isLoggedIn">Categories</router-link>
      </p>
    </li>
    <li class="aside__center__item">
      <router-link v-if="isLoggedIn" to="/favorites">
        {{ favorites }}
      </router-link>
      <router-link v-if="!isLoggedIn" to="/login">
        Favorites
      </router-link>

      <router-link to="/later" v-if="isLoggedIn">{{ watchlater }}</router-link>
      <router-link to="/login" v-if="!isLoggedIn">Watch later</router-link>
    </li>
    <li class="aside__bottom__item">
      <p class="aside__top__link">
        <router-link v-if="isLoggedIn" to="/settings">
          {{ settings }}
        </router-link>
        <router-link v-if="!isLoggedIn" to="/login">
          Settings
        </router-link>
      </p>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
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
    home() {
      if ('en' == this.$store.getters.lang) {
        return 'Home'
      } else {
        return 'Дома'
      }
    },
    popular() {
      if ('en' == this.$store.getters.lang) {
        return 'Popular'
      } else {
        return 'Популярный'
      }
    },
    discaver() {
      if ('en' == this.$store.getters.lang) {
        return 'Discaver'
      } else {
        return 'Обнаружить'
      }
    },
    categories() {
      if ('en' == this.$store.getters.lang) {
        return 'Categories'
      } else {
        return 'Категории'
      }
    },
    favorites() {
      if ('en' == this.$store.getters.lang) {
        return 'Favorites'
      } else {
        return 'Избранное'
      }
    },
    watchlater() {
      if ('en' == this.$store.getters.lang) {
        return 'Watch later'
      } else {
        return 'Посмотреть позже'
      }
    },
    settings() {
      if ('en' == this.$store.getters.lang) {
        return 'Settings'
      } else {
        return 'Настройки'
      }
    },
    isLoggedIn() {
      return this.$store.getters.isAuthendicated
    },
  },
  methods: {
    toggleTheme() {
      this.nightMode = !this.nightMode
      this.$emit('theme', this.nightMode)
    },
  },
}
</script>

<style scoped lang="scss">
@import '../sass/_colors.scss';
/* we will explain what these classes do next! */

.bi {
  cursor: pointer;
}
.black {
  background: black;
}
.toggle__theme {
  position: absolute;
  top: 20px;
}
a {
  text-decoration: none;
  font-family: 'Roboto';
  font-size: 18px;
  font-style: normal;
}
a:hover,
a.active2 {
  color: $blue;
}

ul {
  justify-content: center;
  display: inline-block;
  .aside__top__item {
    margin-top: 80px;
  }
  li {
    display: flex;
    flex-direction: column;
    user-select: none;
    .aside__home {
      padding-bottom: 20px;
      font-weight: normal;
      position: relative;
      user-select: none;
      p {
        color: white;
        margin: 0;
        position: absolute;
        user-select: none;
        top: -18px;
      }
      .aside__top__wrapper {
        cursor: pointer;
        display: flex;

        align-items: center;
        .aside__top__title {
          margin-left: 4px;
          position: relative;
          top: 5px;
          a {
            color: white;
            font-weight: 400;
            font-size: 18px;

            &:hover,
            &.active2 {
              color: $blue;
            }
          }
        }
      }
    }
  }
  .aside__top__link {
    a {
      color: white;
      font-size: 18px;
      margin-bottom: 29px;
      &:hover,
      &.active2 {
        color: $blue;
      }
    }
  }
}
.aside__center__item {
  margin: 50px 0 100px 0;
}
.aside__center__item > a {
  color: white;
  font-size: 18px;
  margin-bottom: 29px;
  &:hover,
  &.active2 {
    color: $blue;
  }
}
</style>
