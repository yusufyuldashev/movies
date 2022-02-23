<template>
  <ul class="aside__list">
    <li class="aside__top__item">
      <div class="aside__home">
        <router-link to="/home">
          <p>...</p>
          <div class="aside__top__wrapper">
            <img src="../assets/home.png" alt="home" class="aside__top__img" />
            <h4 class="aside__top__title">
              <router-link to="/home" v-if="isLoggedIn">Home</router-link>
              <router-link to="/login" v-if="!isLoggedIn">Home</router-link>
            </h4>
          </div>
        </router-link>
      </div>
      <p class="aside__top__link">
        <router-link to="/popular" v-if="isLoggedIn">Popular</router-link>
        <router-link to="/login" v-if="!isLoggedIn">Popular</router-link>
      </p>
      <p class="aside__top__link">
        <router-link to="/discaver" v-if="isLoggedIn">Discover</router-link>
        <router-link to="/login" v-if="!isLoggedIn">Discover</router-link>
      </p>
      <p class="aside__top__link">
        <router-link to="/categories" v-if="isLoggedIn">Categories</router-link>
        <router-link to="/login" v-if="!isLoggedIn">Categories</router-link>
      </p>
    </li>
    <li class="aside__center__item">
      <router-link v-if="isLoggedIn" to="/favorites">
        Favorites
      </router-link>
      <router-link v-if="!isLoggedIn" to="/login">
        Favorites
      </router-link>

      <router-link to="/later" v-if="isLoggedIn">Watch later</router-link>
      <router-link to="/login" v-if="!isLoggedIn">Watch later</router-link>
    </li>
    <li class="aside__bottom__item">
      <p class="aside__top__link">
        <router-link v-if="isLoggedIn" to="/settings">
          Settings
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
    return {}
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthendicated
    },
  },
}
</script>

<style scoped lang="scss">
@import '../sass/_colors.scss';
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
    .aside__home {
      padding-bottom: 20px;
      font-weight: normal;
      position: relative;

      p {
        color: white;
        margin: 0;
        position: absolute;
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
