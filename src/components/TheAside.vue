<template>
  <ul class="aside__list">
    <li class="aside__top__item">
      <div class="aside__home">
        <p>...</p>
        <div class="aside__top__wrapper">
          <img src="../assets/home.png" alt="home" class="aside__top__img" />
          <h4 class="aside__top__title">Home</h4>
        </div>
      </div>
      <a href="#" class="aside__top__link">Popular</a>
      <a href="#" class="aside__top__link">Discover</a>
      <a href="#" class="aside__top__link">Categories</a>
    </li>
    <li class="aside__center__item">
      <a href="#" class="aside__top__link">Favorites</a>
      <a href="#" class="aside__top__link">Watch later</a>
    </li>
    <li class="aside__bottom__item">
      <a href="#" class="aside__top__link">
        Settings
      </a>
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
          color: $blue;
          font-size: 18px;
          margin-left: 4px;
        }
      }
    }
    .aside__top__link {
      color: white;
      font-size: 18px;
      margin-bottom: 29px;
      &:hover {
        color: $blue;
      }
    }
  }
  .aside__center__item {
    margin: 50px 0 100px 0;
  }
}
</style>
