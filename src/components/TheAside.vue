<template>
  <ul class="aside__list">
    <li class="aside__top__item">
      <div class="aside__home">
        <router-link to="/home">
          <p>...</p>
          <div class="aside__top__wrapper">
            <img src="../assets/home.png" alt="home" class="aside__top__img" />
            <h4 class="aside__top__title">
              <router-link to="/home">Home</router-link>
            </h4>
          </div>
        </router-link>
      </div>
      <p class="aside__top__link">
        <router-link to="/popular">Popular</router-link>
      </p>
      <p class="aside__top__link">
        <router-link to="/discaver">Discover</router-link>
      </p>
      <p class="aside__top__link">
        <router-link to="/categories">Categories</router-link>
      </p>
    </li>
    <li class="aside__center__item">
      <router-link to="/favorites">
        Favorites
      </router-link>

      <router-link to="later">Watch later</router-link>
    </li>
    <li class="aside__bottom__item">
      <p class="aside__top__link">
        <router-link to="settings">
          Settings
        </router-link>
      </p>
    </li>
  </ul>
</template>

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

      p {
        color: white;
        margin: 0;
        position: absolute;
      }
      .aside__top__wrapper {
        cursor: pointer;
        display: flex;

        align-items: center;
        .aside__top__title {
          margin-left: 4px;
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
  &:hover {
    color: $blue;
  }
}
</style>
